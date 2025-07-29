// 存储产品列表中商品信息的数据

// state：存储全局状态，组件通过 this.$store.state 访问。
// mutations：同步修改 state 的唯一方式，通过 this.$store.commit 调用。
// actions：用于处理异步操作，通过 this.$store.dispatch 调用，最终通过 mutations 修改 state。
export default {
    namespaced: true,
    state: {
        rowData: [], // 存储产品列表数据
        title: '添加产品', // 页面标题
    },
    mutations: {
        changeRowData(state, data) {
            state.rowData = data;
        },
        changeTitle(state, title) {
            state.title = title;
        }
    },
    actions:{

    }
}