import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/views/layout/index.vue";
import Login from "@/views/login/index.vue";
import Home from "@/views/home/home.vue";

// 异步组件加载
const Advert = () => import("@/views/advert/index.vue");
const AdvertList = () => import("@/views/advert/list/index.vue");

Vue.use(VueRouter);


const routes = [
    {
        path: "/login",
        name: "login",
        component: Login
    },
    {
        path: "/",
        name:"layout",
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

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});


export default router;