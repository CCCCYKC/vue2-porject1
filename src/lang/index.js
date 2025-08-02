// 国际化
import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

// 导入element UI的国际化
// import Element from 'element-ui'
// 兼容写法(推荐)
import ElementLocale from 'element-ui/lib/locale'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
// 导入语言文件
import Myzh from "./zh.js"
import Myen from "./en.js"

// 2.准备翻译的语言环境信息
const messages = {
    zh: {
        ...Myzh,
        ...zhLocale     //导入element UI的中文
    },
    en: {
        ...Myen,
        ...enLocale
    },
}

// 3.通过选项创建 VueI18n 实例
const i18n = new VueI18n({
    locale: 'zh', // 设置地区 
    messages, // 设置地区信息
})

// Vue.use(Element, {
//     i18n: (key, value) => i18n.t(key, value)
// })
// 兼容写法(推荐)
ElementLocale.i18n((key, value) => i18n.t(key, value))

// 4.通过 `i18n` 选项创建 Vue 实例
// new Vue({ i18n }).$mount('#app')
export default i18n