const { readFileSync, writeFileSync } = require('fs');
const targetFile = require.resolve('next/dist/build/webpack-config')

const content = readFileSync(targetFile, 'utf-8');

if(content.includes('webpackFinal')) {
  console.log('Already patched webpackFinal - skipping.')
  return;
}

const patch = `
if(typeof config.webpackFinal==='function'){
  webpackConfig=config.webpackFinal(webpackConfig,{dir,dev,isServer,buildId,config,defaultLoaders,totalPages,webpack:_webpack.webpack});
}
return webpackConfig;
`

const patched = content.replace('return webpackConfig;', patch);

writeFileSync(targetFile, patched);
console.log('Applied webpackFinal patch.')
