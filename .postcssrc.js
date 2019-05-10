// // https://github.com/michael-ciniawsky/postcss-load-config
//
// module.exports = {
//   "plugins": {
//     "postcss-import": {},
//     "postcss-url": {},
//     // to edit target browsers: use "browserslist" field in package.json
//     "autoprefixer": {}
//   }
// }




// module.exports = {
//   "plugins": {
//     "postcss-import": {},
//     "postcss-url": {},
//     // to edit target browsers: use "browserslist" field in package.json
//     "autoprefixer": {},
//     "postcss-pxtorem": {
//       "rootValue": 32,
//       "propList": ["*"]
//     }
//   }
// }

const presetEnv = require('postcss-preset-env')
const autoSize = require('postcss-autosize')
const pxToViewport = require('postcss-px-to-viewport')

module.exports = {
  plugins: [
    presetEnv({
      stage: 0
    }),
    autoSize(),
    pxToViewport({
      viewportWidth: 750,
      viewportUnit: 'vmin',
      fontViewportUnit: 'vmin'
    })
  ]
}

