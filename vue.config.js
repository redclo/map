const modifyVars = require("./src/queenjs/ui/styles/theme-light");
const path = require('path');
const fs = require('fs');

const getDirectories = (source) =>
  fs
  .readdirSync(source, {
    withFileTypes: true
  })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name);

const getAlias = (alias, path) => {
  const aliases = {};
  const dirs = getDirectories(path);
  dirs.forEach((dir) => (aliases[`${alias}/${dir}`] = `${path}/${dir}`));
  return aliases;
};
const aliases = getAlias('@', path.resolve(__dirname, './src'));

module.exports = {
  publicPath: "./",
  // publicPath: process.env.NODE_ENV === 'production' ? '//funeralhk.oss-cn-hongkong.aliyuncs.com/map/' : './',

  pages: {
    index: {
      entry: 'src/pages/map/main.ts',
      template: 'public/index.html',
      filename: 'index.html',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  css: {
    extract: {
      ignoreOrder: true
    },
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars,
          javascriptEnabled: true,
        },
      },
    },
  },
  chainWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.plugin('extract-css').tap((args) => {
        args[0].ignoreOrder = true;
        return args;
      });
      config.optimization.minimizer('terser').tap(args => {
        Object.assign(args[0].terserOptions.compress, {
          pure_funcs: ['console.log']
        })
        return args
      })
    }
  },
  configureWebpack: {
    module: {
      rules: [{
          test: /\.(tsx)$/,
          use: [{
            loader: '@linaria/webpack-loader',
            options: {
              sourceMap: process.env.NODE_ENV !== 'production',
              babelOptions: {
                plugins: [
                  [
                    'babel-plugin-module-resolver',
                    {
                      root: ['.'], //the value mentioned in the path section of the `tsconfig.json based on your CWD`
                      extensions: ['.tsx', '.ts'],
                      alias: aliases, //The important part!!
                    },
                  ],
                ],
              },
            },
          }, ],
        }, {
          test: /\.svga$/,
          use: [{
            loader: 'file-loader'
          }],
        },
        {
          test: /\.(frag|vert|glsl)$/,
          use: [{
            loader: 'raw-loader'
          }],
        }, {
          test: /\.(glb)$/,
          use: [{
            loader: 'url-loader'
          }],
        },
      ],
    },
  },
};