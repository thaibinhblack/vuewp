const isDevelopment = process.env.NODE_ENV === 'development';
const breakpoints = require('./src/breakpoints.json');

module.exports = {
  publicPath: isDevelopment ? '/' : '/app/dist/',
  filenameHashing: false,
  productionSourceMap: false,
  css: {
    extract: false,
    sourceMap: false,
    loaderOptions: {
      scss: {
        additionalData: `
          @use "@/assets/scss/variables/colors";
          @use "@/assets/scss/variables/fonts";
          @use "@/assets/scss/variables/zindex";
          @use "@/assets/scss/variables/icons";
          @use "@/assets/scss/mixins" as mx;
          @use "@/assets/scss/functions" as fn;
          $BREAKPOINT-XS: ${breakpoints.XS};
          $BREAKPOINT-SM: ${breakpoints.SM};
          $BREAKPOINT-MD: ${breakpoints.MD};
          $BREAKPOINT-LG: ${breakpoints.LG};
          $BREAKPOINT-XL: ${breakpoints.XL};
          $BREAKPOINT-XXL: ${breakpoints.XXL};
        `,
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
