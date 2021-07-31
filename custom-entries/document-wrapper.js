import React from 'react';
import path from 'path';
import { Head } from 'next/document';
import { promises } from 'fs';

async function readBuildManifest(distDir) {
  const content = await promises.readFile(path.join(distDir, 'build-manifest.json'), { encoding: 'utf-8' })
  return JSON.parse(content);
}

function stripHash(fileName) {
  const idx = fileName.lastIndexOf('-');
  return fileName.slice(0, idx);
}

const pathParts = ['static', 'chunks', 'entries'];
async function getCustomEntries(distDir) {
  const files = await promises.readdir(path.join(distDir, ...pathParts));
  return files.reduce((acc,cur) => ({
        ...acc,
        [stripHash(cur)]: [...pathParts, cur].join('/')
      }
  ), {});
}

/**
 *
 *
 * @param {object} [options] - Configuration for wrapper
 * @param {object} [options.pageConfigs] - Force script injection at particular index
 * @returns {function(Document)} wrapper
 */
export default function withCustomEntries({ pageConfigs }) {

  const defaultChunks = /(webpack-|framework-)/;

  async function getCustomScripts(pathname, distDir) {
    const config = pageConfigs[pathname];

    let chunks = [];
    if (config) {
      if (config.entry) {
        // The buildManifest is available in props, but not in getInitialProps context unfortunately
        const buildManifest = await readBuildManifest(distDir);

        const check = config.chunks || defaultChunks;
        chunks.push(...buildManifest.pages[pathname].filter(f => check.test(f)));

        const customEntries = await getCustomEntries(distDir);
        chunks.push(customEntries[config.entry]);
        chunks = chunks.map(url => `_next/${url}`);
      }
      if (config.script) {
        chunks.push(config.script);
      }
    }

    // TODO: support for assetPrefix
    return chunks;
  }

  /**
   * Extend the Document
   *
   * @param {Document} Document - Next Document class to wrap
   * @returns {Document} extended Document
   */
  return Document => {
    return class CustomDocument extends Document {

      static async getInitialProps(ctx) {
        const { pathname } = ctx;

        // TODO: Is there a more reliable way to determine the distDir here?
        const distDir = path.join(process.cwd(), '.next');

        // TODO: Is there a better way to know if this is dev mode?
        const isDev = process.env.NODE_ENV === 'development';

        const customScripts = isDev ? [] : (await getCustomScripts(pathname, distDir));

        const initialProps = await Document.getInitialProps(ctx);
        return {
          ...initialProps,
          ...(customScripts.length ? {
            customScripts,
            // disable default runtime JS if using custom chunks
            unstable_runtimeJS: false
          } : {})
        };
      }

      renderCustomPreloads(partialChunks) {
        // eslint-disable-next-line react/jsx-key
        return partialChunks.map(url => <link rel="preload" href={ url } as="script"/>);
      }

      renderCustomLoads(partialChunks) {
        // eslint-disable-next-line react/jsx-key
        return partialChunks.map(url => <script src={ url } async/>);
      }

      render() {
        const html = super.render();

        const { customScripts } = this.props;

        if (customScripts) {
          const htmlChildren = React.Children.toArray(html.props.children);

          const headIdx = htmlChildren.findIndex(el => el.type === Head);
          const head = htmlChildren[headIdx];
          const headChildren = React.Children.toArray(head.props.children);
          headChildren.push(...this.renderCustomPreloads(customScripts));
          htmlChildren[headIdx] = React.cloneElement(head, {}, ...headChildren);

          const bodyIdx = htmlChildren.findIndex(el => el.type === 'body');
          const body = htmlChildren[bodyIdx];
          const bodyChildren = React.Children.toArray(body.props.children);
          bodyChildren.push(...this.renderCustomLoads(customScripts));
          htmlChildren[bodyIdx] = React.cloneElement(body, {}, ...bodyChildren);

          return React.cloneElement(html, {}, ...htmlChildren);
        }

        return html;
      }
    };
  };
}
