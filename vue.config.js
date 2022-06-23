module.exports = {
    pluginOptions: {
        i18n: {
            locale: 'cn',
            fallbackLocale: 'en',
            localeDir: 'locales',
            enableInSFC: true,
            includeLocales: false,
            enableBridge: true
        }
    },

    productionSourceMap: false,
    publicPath: process.env.NODE_ENV === "production" ? './' : '/',
    transpileDependencies: [
        'vuetify'
    ]
}