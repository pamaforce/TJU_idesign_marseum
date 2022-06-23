import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './utils/rem'
import './global.css'
import i18n from './i18n'
import vuetify from './plugins/vuetify'
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'
import "video.js/dist/video-js.css";
import VueScrollReveal from 'vue-scroll-reveal'
import VideoPlayer from "vue-video-player";
import VueLazyload from 'vue-lazyload'
Vue.use(VideoPlayer)
Vue.use(VueLazyload)
Vue.use(VueScrollReveal, {
    class: 'v-scroll-reveal',
    duration: 1000,
    scale: 1,
    distance: '50px',
    reset: true,
    mobile: true,
    useDelay: 'always',
    origin: 'top',
    delay: 200
});
Vue.use(preview)

Vue.config.productionTip = false

new Vue({
    router,
    i18n,
    vuetify,
    render: h => h(App)
}).$mount('#app')