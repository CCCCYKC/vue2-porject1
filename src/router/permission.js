// 路由守卫

// 配置路由全局前置守卫导航
import router from "./index.js";
import store from "@/store"
router.beforeEach((to, from, next) => {
    console.log('所有路由：', router.getRoutes());
    // console.log('导航触发：', 'from', from.path, 'to', to.path); // 打印每次导航
    // // 打印调用栈，查看是谁触发了这次导航
    // console.trace('导航调用栈：');
    // 判断进入的路由界面是否需要登录 不需要的则直接进入
    if (to.matched.some(item => item.meta.isLogin)) {
        // 需要登录 判断是否已经登录 ==> token值是否存在
        let token = store.state.login.userInfo.token;
        if (token) { //已登录
            // 判断vuex中是否已经含有动态导航，若没有则要获取
            if (store.state.menu.divMenuList.length === 0) {      //无导航
                store.dispatch('menu/getMenuList')      //返回值为一个promise
                    .then(res => {
                        console.log('路由前置守卫中获取vuex动态导航的返回值--', res);
                        // 把菜单导航追加在路由实例上面
                        res.forEach(ele => {        //循环数组将对象都添加到name='layout'的子路由里面
                            router.addRoute("layout", ele);
                        })
                        // console.log('router.getRoutes', router.getRoutes());
                        // console.log('修正后路由：', router);
                        // // 关键：基于新路由表重新跳转，替换当前旧导航任务
                        // // ...to 根据最新的路由表跳转 replace: true 让跳转后的界面无法退后一步回到登录界面
                        return next({ ...to, replace: true });
                    })
                    .catch(err => {
                        console.log('获取动态导航出错：', err);
                        next('/login'); // 异常时跳转登录
                    });
            } else {   //有导航则直接跳转
                next(); //跳转至to路由
            }
        } else {
            next('/login'); //跳转至登录页
        }
    } else {
        // 不需要登录，直接进入
        next();
    }
})


// 页面刷新时，重新添加动态路由（因为路由实例会重置）
// 已登录且已经有动态路由
if (store.state.login.userInfo.token && store.state.menu.divMenuList.length > 0) {
    store.state.menu.divMenuList.forEach(ele => {
        router.addRoute("layout", ele);
    });
}