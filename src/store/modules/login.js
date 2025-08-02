// 存储登录信息

// state：存储全局状态，组件通过 this.$store.state 访问。
// mutations：同步修改 state 的唯一方式，通过 this.$store.commit 调用。
// actions：用于处理异步操作，通过 this.$store.dispatch 调用，最终通过 mutations 修改 state。
export default {
    namespaced: true,
    state: {
        userInfo: {
            username: '',
            token: ''
        }
    },
    mutations: {
        // 添加用户信息
        setUser(status, payload) {
            status.userInfo = payload;
        },
        // 移除用户信息
        removeUser(status) {
            status.userInfo = {
                username: '',
                token: ''
            }
        }
    },
    actions: {

    }
}