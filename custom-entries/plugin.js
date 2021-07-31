const path = require('path');
const { readdirSync } = require('fs');
const { readdir } = require('fs').promises;

function listEntries(root) {
  const entriesDir = path.join(root, 'entries');
  return readdirSync(entriesDir);
}

module.exports = function withEntries(nextConfig) {
  return {
    ...nextConfig,

    // This does not work so disabling with __ to leave in-place for documentation
    __webpack: function (webpackConfig, options) {
      const { isServer, dir } = options;

      if (!isServer) {
        const entriesDir = path.join(dir, 'entries');

        async function getCustomEntries() {
          const files = await readdir(entriesDir);

          return {
            ...(await entry()),
            ...files.reduce((acc, cur) => {
              const key = `entries/${ cur.split('.')[0] }`;
              return { ...acc, [key]: path.join(entriesDir, cur) };
            }, {})
          };
        }

        // Our custom entries get messed up by the updatedEntry
        // We have no way to actually adjust entries as we need
        // @see: https://github.com/vercel/next.js/blob/5abeb1731f672ef6866f7add3510259315657a33/packages/next/build/webpack-config.ts#L1664
        webpackConfig.entry = getCustomEntries;
      }

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(webpackConfig, options);
      }

      return webpackConfig;
    },

    // This requires monkey-patching Next.js for now
    webpackFinal: function (webpackConfig, options) {
      const { isServer, dev, dir } = options;

      if (!isServer && !dev) {
        function getCustomEntries() {
          const entriesDir = path.join(dir, 'entries');
          const files = readdirSync(entriesDir);

          return files.reduce((acc, cur) => {
            const key = `entries/${ cur.split('.')[0] }`;
            return { ...acc, [key]: path.join(entriesDir, cur) };
          }, {})
        }

        webpackConfig.entry = {
          ...webpackConfig.entry,
          ...getCustomEntries()
        }
      }

      return webpackConfig;
    }
  };
};
