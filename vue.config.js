const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
  publicPath: '/',
  filenameHashing: false,
  productionSourceMap: false,
  css: {
    extract: false,
    sourceMap: false,
    loaderOptions: {
      scss: {
      },
    },
  },
  configureWebpack: {
    resolve: {
      extensions: ['.vue', '.js', '.json', '.gql'],
    },
  },
  chainWebpack(config) {
    if (!isDevelopment) {
      config.optimization.delete('splitChunks');
    }

    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((loaderOptions) => {
        loaderOptions.transformAssetUrls = {
          video: ['src', 'poster'],
          source: 'src',
          img: ['src', 'v-img'],
          image: ['xlink:href', 'href'],
          use: ['xlink:href', 'href'],
          hero: ['src-md', 'src-xs', 'src=sm', 'src-lg', 'src-xl'],
          reward: 'src',
          'article-listing': 'src',
        };

        return loaderOptions;
      });
  },
};
