// 存储动态路由导航

// 导入请求的接口方法
import { permission } from "@/api/index.js"
// 导入定义好的完整的菜单导航路由
import { menu } from '@/router/menu'
// 导入路由(只含登录和首页)，根据匹配结果往里面填充
import { baseRoutes } from '@/router/index'
import router from '@/router/index'
import VueRouter from "vue-router";
// 导入菜单匹配方法
import { matchMenu } from "@/views/utils/common.js"
// 导入深拷贝方法
import { cloneDeep } from 'lodash'
export default {
    namespaced: true,
    state: {
        // 定义动态导航容器---存储动态导航
        divMenuList: [],
    },
    mutations: {
        // 设置导航菜单
        setMenuList(state, data) {
            state.divMenuList = data;
        },
        // 清空导航菜单
        removeMenuList(state) {
            state.divMenuList = [];
        }
    },
    actions: {
        // 定义请求动态路由接口的方法-----token为login模块的userInfo.token
        async getMenuList({ rootState, commit }) {
            let res = await permission({ token: rootState.login.userInfo.token });
            console.log("后端返回的导航菜单内容:", res.data.data);
            console.log("前端的menu", menu);
            // 处理前后端的菜单数据，进行匹配  后端的name = 前端meta中的title---
            // 定义方法在utils的公共方法common里面
            let myMenu = matchMenu(menu, res.data.data);
            console.log('处理好的要加入routes的菜单导航', myMenu);
            // 存储处理好的动态导航 无首页的
            commit('setMenuList', myMenu);
            // 将匹配好的动态路由加到基础路由的子级里面 防止更改原路由，用解构方法
            let returnArr = cloneDeep(baseRoutes);
            returnArr[0].children.push(...myMenu);

            return returnArr;
        },
        // 删除动态路由(传递名字进来name)
        removeRouteByName(name) {
            const newRoutes = router.options.routes.filter(route => route.name !== name);
            router.matcher = new VueRouter({ routes: newRoutes }).matcher;
        }
    }
}