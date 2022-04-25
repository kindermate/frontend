module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/scss/_variables.scss";@import "@/assets/scss/_mixins.scss";`,
      },
    },
  },
  pluginOptions: {
    i18n: {
      locale: 'ko',
      fallbackLocale: 'ko',
      localeDir: 'locales',
      enableInSFC: false,
      enableBridge: false,
    },
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.output.filename = 'js/[name].[chunkhash:8].min.js';
      config.output.chunkFilename = 'js/[name].[chunkhash:8].min.js';
    } else {
      config.output.filename = 'js/[name].js';
      config.output.chunkFilename = 'js/[name].js';
    }
  },
};
