import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/views/layout/index.vue";
import Login from "@/views/login/index.vue";
import Home from "@/views/home/home.vue";

// 异步组件加载
const Produce = () => import("@/views/produce/index.vue");
const ProduceList = () => import("@/views/produce/list/index.vue");
const ProduceCategory = () => import("@/views/produce/category/index.vue");
const AddProduct = () => import("@/views/produce/list/addProduct.vue");

const Order = () => import("@/views/order/index.vue");
const OrderList = () => import("@/views/order/list/index.vue");
const OrderCollection = () => import("@/views/order/collection/index.vue");
const OrderExamine = () => import("@/views/order/examine/index.vue");

const Advert = () => import("@/views/advert/index.vue");
const AdvertList = () => import("@/views/advert/list/index.vue");

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        component: Layout,
        children: [
            {
                path: "/",      // 首页
                name: "home",
                component: Home
            },
            {
                path: "/produce",       // 产品管理
                name: "produce",
                component: Produce,
                children: [
                    {
                        path: "list",       //产品列表 访问路径：/produce/list
                        name: "produceList",
                        component: ProduceList
                    },
                    {
                        path: "category",    //产品分类 访问路径：/produce/category
                        name: "produceCategory",
                        component: ProduceCategory
                    },
                    {
                        path: "addProduct",    //添加产品 访问路径：/produce/addProduct
                        name: "addProduct",
                        component: AddProduct,
                        meta: {
                            activeMenu: "/produce/list"  // 设置侧边栏激活菜单
                        }
                    }
                ]
            },
            {
                path: "/order",     // 订单管理
                name: "order",
                component: Order,
                children: [
                    {
                        path: "list",       //订单列表 访问路径：/order/list
                        name: "orderList",
                        component: OrderList
                    },
                    {
                        path: "collection",     //订单汇总 访问路径：/order/collection
                        name: "orderCollection",
                        component: OrderCollection
                    },
                    {
                        path: "examine",       //订单审核 访问路径：/order/examine
                        name: "orderExamine",
                        component: OrderExamine
                    }
                ]
            },
            {
                path: "/advert",    // 广告管理
                name: "advert",
                component: Advert,
                children: [
                    {
                        path: "list",     //广告列表 访问路径：/advert/list
                        name: "advertList",
                        component: AdvertList
                    }
                ]
            }
        ]
    },
    {
        path: "/login",
        name: "login",
        component: Login
    }

]

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;