// 路由守卫

// 问题：1.好像陷入循环了，有两个路由同时处理
// 2.组件加载不成功

// 配置路由全局前置守卫导航
import router, { baseRoutes } from "./index.js";
import store from "@/store"
// 导入深拷贝方法
import { cloneDeep } from 'lodash'
router.beforeEach((to, from, next) => {
    console.log('导航触发：', 'from', from.path, 'to', to.path); // 打印每次导航

    // 当来去路径相同时，直接返回
    if (from.path == to.path) {
        next();
    }

    // 判断进入的路由界面是否为登录界面，是的话直接跳登录页
    if (to.path !== '/login') {
        // 需要登录 判断是否已经登录 ==> token值是否存在
        let token = store.state.login.userInfo.token;
        if (token) { //已登录
            // 判断vuex中是否已经含有动态导航，若没有则要获取
            // console.log('store.state.menu.divMenuList', store.state.menu.divMenuList)
            if (store.state.menu.divMenuList.length == 0) {      //无导航
                store.dispatch('menu/getMenuList')      //返回值为一个promise
                    .then(res => {
                        console.log('路由前置守卫中获取vuex动态导航的返回值--', res);
                        // 把菜单导航追加在路由实例上面
                        res.forEach(ele => {
                            router.addRoute(ele);
                        })
                        console.log('添加后路由：', router.getRoutes());
                    })
                    // replace: true 让跳转后的界面无法退后一步回到登录界面
                    .then(next({ replace: true }))
            } else {   //有导航则直接跳转
                // store.commit("menu/removeMenuList");
                // store.dispatch("menu/removeRouteByName", "layout");
                console.log('有动态导航则直接跳转', router.getRoutes());
                next(); //跳转至to路由
            }
        } else {
            console.log('未登录，先跳转登录页');
            next('/login'); //跳转至登录页
        }
    } else {
        // 直接进入登录页
        console.log('直接进入登录页');
        next();
    }
})


// 页面刷新时，重新添加动态路由（因为路由实例会重置）
// 已登录且已经有动态路由
if (store.state.login.userInfo.token && store.state.menu.divMenuList.length > 0) {
    console.log('store.state.menu.divMenuList', store.state.menu.divMenuList)
    let returnArr = cloneDeep(baseRoutes);
    returnArr[0].children.push(...store.state.menu.divMenuList);
    returnArr.forEach(ele => {
        router.addRoute(ele);
    });
    console.log('刷新后', router.getRoutes())
}