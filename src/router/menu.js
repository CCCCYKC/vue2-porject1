// 动态路由---除了首页、登录和广告管理

// 异步组件加载
const Produce = () => import("@/views/produce/index.vue");
const ProduceList = () => import("@/views/produce/list/index.vue");
const ProduceCategory = () => import("@/views/produce/category/index.vue");
const AddProduct = () => import("@/views/produce/list/addProduct.vue");

const Order = () => import("@/views/order/index.vue");
const OrderList = () => import("@/views/order/list/index.vue");
const OrderCollection = () => import("@/views/order/collection/index.vue");
const OrderExamine = () => import("@/views/order/examine/index.vue");

const Management = () => import("@/views/manage/index.vue");
const StaffManagement = () => import("@/views/manage/staff/index.vue");
const DepartmentManagement = () => import("@/views/manage/department/index.vue");

export const menu = [
    {
        path: "/produce",       // 产品管理
        name: "produce",
        redirect: "/produce/list",   //重定向(由于二级菜单为空，让面包屑导航可以跳转)
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
                path: "addProduct",    //添加商品 访问路径：/produce/addProduct
                name: "addProduct",
                component: AddProduct,
                meta: {
                    activeMenu: "/produce/list",  // 设置侧边栏激活菜单
                    title: '添加商品'
                }
            }
        ]
    },
    {
        path: "/order",     // 订单管理
        name: "order",
        redirect: "/order/list",
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
                    title: '汇总清单'
                },
            },
            {
                path: "examine",       //订单审核 访问路径：/order/examine
                name: "orderExamine",
                component: OrderExamine,
                meta: {
                    title: '订单审核'
                },
            },

        ]
    },
    {
        path: "/manage",    // 系统管理
        name: "manage",
        redirect: "/manage/staff",
        component: Management,
        meta: {
            title: '系统管理'
        },
        children: [
            {
                path: "staff",     //人员管理 访问路径：/manage/staff
                name: "staffManagement",
                component: StaffManagement,
                meta: {
                    title: '角色管理'
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