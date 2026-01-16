const path = require('path');

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
    ],

    // 修复 video.js 和 vue-video-player 的模块解析问题
    configureWebpack: {
        resolve: {
            alias: {
                'video.js$': path.resolve(__dirname, 'node_modules/video.js/dist/video.cjs.js')
            }
        }
    }
}