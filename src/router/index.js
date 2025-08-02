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

const Management = () => import("@/views/manage/index.vue");
const StaffManagement = () => import("@/views/manage/staff/index.vue");
const DepartmentManagement = () => import("@/views/manage/department/index.vue");

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
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
                path: "/produce",       // 产品管理
                name: "produce",
                redirect:"/produce/list",   //重定向(由于二级菜单为空，让面包屑导航可以跳转)
                component: Produce,
                meta: {
                    title: '产品管理'
                },
                children: [
                    {
                        path: "list",       //产品列表 访问路径：/produce/list
                        name: "produceList",
                        component: ProduceList,
                        meta: {
                            title: '产品列表'
                        },
                    },
                    {
                        path: "category",    //产品分类 访问路径：/produce/category
                        name: "produceCategory",
                        component: ProduceCategory,
                        meta: {
                            title: '产品分类'
                        },
                    },
                    {
                        path: "addProduct",    //添加产品 访问路径：/produce/addProduct
                        name: "addProduct",
                        component: AddProduct,
                        meta: {
                            activeMenu: "/produce/list",  // 设置侧边栏激活菜单
                            title: '产品详情'
                        }
                    }
                ]
            },
            {
                path: "/order",     // 订单管理
                name: "order",
                redirect:"/order/list",
                component: Order,
                meta: {
                    title: '订单管理'
                },
                children: [
                    {
                        path: "list",       //订单列表 访问路径：/order/list
                        name: "orderList",
                        component: OrderList,
                        meta: {
                            title: '订单列表'
                        },
                    },
                    {
                        path: "collection",     //订单汇总 访问路径：/order/collection
                        name: "orderCollection",
                        component: OrderCollection,
                        meta: {
                            title: '订单汇总'
                        },
                    },
                    {
                        path: "examine",       //订单审核 访问路径：/order/examine
                        name: "orderExamine",
                        component: OrderExamine,
                        meta: {
                            title: '订单审核'
                        },
                    }
                ]
            },
            {
                path: "/advert",    // 广告管理
                name: "advert",
                redirect:"/advert/list",
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
            },
            {
                path: "/manage",    // 系统管理
                name: "manage",
                redirect:"/manage/staff",
                component: Management,
                meta: {
                    title: '系统管理'
                },
                children:[
                    {
                        path: "staff",     //人员管理 访问路径：/manage/staff
                        name: "staffManagement",
                        component: StaffManagement,
                        meta: {
                            title: '人员管理'
                        },
                    },
                    {
                        path: "department",     //部门管理 访问路径：/manage/department
                        name: "departManagement",
                        component: DepartmentManagement,
                        meta: {
                            title: '部门管理'
                        },
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


// 配置路由全局前置守卫导航
import store from "@/store"
router.beforeEach((to,from,next) => {
    // 判断进入的路由界面是否需要登录 不需要的则直接进入
    if(to.matched.some(item => item.meta.isLogin)) {
        // 需要登录 判断是否已经登录 ==> token值是否存在
        let token = store._modules.root._children.login.state.userInfo.token;
        if(token) {
            next(); //跳转至to路由
        } else {
            next('/login'); //跳转至登录页
        }
    } else {
        // 不需要登录
        next();
    }
})

export default router;