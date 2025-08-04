import Vue from "vue";
import VueRouter from "vue-router";
// import Router from 'vue-router';
import Layout from "@/views/layout/index.vue";
import Login from "@/views/login/index.vue";
import Home from "@/views/home/home.vue";

// 异步组件加载
const Advert = () => import("@/views/advert/index.vue");
const AdvertList = () => import("@/views/advert/list/index.vue");

Vue.use(VueRouter);

export const baseRoutes = [
    {
        path: "",
        name: "layout",
        component: Layout,
        meta: {
            title: '首页',
            isLogin: true,  //需要登录才能进入
        },
        children: [
            {
                path: "/",      // 首页
                name: "home",
                component: Home,
                meta: {
                    title: '首页'
                }
            },
            {
                path: "/advert",    // 广告管理
                name: "advert",
                redirect: "/advert/list",
                component: Advert,
                meta: {
                    title: '广告管理'
                },
                children: [
                    {
                        path: "list",     //广告列表 访问路径：/advert/list
                        name: "advertList",
                        component: AdvertList,
                        meta: {
                            title: '广告列表'
                        },
                    }
                ]
            }
            // 往里面动态添加路由
        ]
    },
]

export const routes = [
    {
        path: "/login",
        name: "login",
        component: Login
    },
]

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

// // 禁用重复导航检测警告
// // 重写了 this.$router.push() 和 this.$router.replace()
// const originalPush = Router.prototype.push;
// Router.prototype.push = function push(location) {
//     return originalPush.call(this, location).catch(err => {
//         console.log('路由导航失败：', err);
//         return err;
//     });
// };

// const originalReplace = Router.prototype.replace;
// Router.prototype.replace = function replace(location) {
//     return originalReplace.call(this, location).catch(err => {
//         console.log('路由导航失败：', err);
//         return err;
//     });
// };

export default router;