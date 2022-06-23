import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import axios from 'axios'
Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const routes = [{
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/about',
            name: 'About',
            component: () =>
                import ('../views/About.vue')
        },
        {
            path: '/exhibition/:category_id',
            name: 'Exhibition',
            component: () =>
                import ('../views/Exhibition.vue')
        },
        {
            path: '/exhibition/:category_id/:id',
            name: 'Detail',
            component: () =>
                import ('../views/Detail.vue'),
            props: route => ({ list: route.query.list, current: route.query.current })
        },
        {
            path: '/result',
            name: 'Result',
            component: () =>
                import ('../views/Result.vue'),
            props: route => ({ keywords: route.query.keywords })
        },
        {
            path: '/graduate',
            name: 'Graduate',
            component: () =>
                import ('../views/Graduate.vue'),
        },
        {
            path: '/sponsor',
            name: 'Sponsor',
            component: () =>
                import ('../views/Sponsor.vue'),
        }, {
            path: '/lock',
            name: 'Lock',
            component: () =>
                import ('../views/Lock.vue'),
        }
    ]
    // let once = true,
    //     time = 0;
const router = new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    routes
})

// router.beforeEach((to, from, next) => {
//     if (to.query.account === 'pama') {
//         once = false;
//         time = 20220602000001
//         next()
//     }
//     if (to.name !== 'Lock') {
//         if (!once) {
//             if (time < 20220602000000) {
//                 next({
//                     path: '/lock'
//                 })
//             } else {
//                 next();
//             }
//         } else {
//             axios.get('http://quan.suning.com/getSysTime.do').then(({ status: code, data: res }) => {
//                 if (code === 200) {
//                     time = parseInt(res.sysTime1)
//                     once = false
//                     if (time > 20220602000000) {
//                         next();
//                     } else {
//                         next({
//                             path: '/lock'
//                         })
//                     }
//                 } else {
//                     next({
//                         path: '/lock'
//                     })
//                 }
//             }).catch(() => {
//                 next({
//                     path: '/lock'
//                 })
//             })
//         }
//     } else {
//         next()
//     }

// })
export default router