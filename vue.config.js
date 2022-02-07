module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/scss/_variables.scss";`,
      },
    },
  },
  pluginOptions: {
    i18n: {
      locale: "ko",
      fallbackLocale: "ko",
      localeDir: "locales",
      enableInSFC: false,
      enableBridge: false,
    },
  },
};
