// 公共的方法文件

// 处理html标签的页面显示方法
export function removeHTMLTag(htmlStr) {
    let html = htmlStr
        .replace(/<img.*?>/g, '[图片]')
        .replace(/<[^>]+>/g, "")
        .replace(/$nbsp;/gi, "");
    return html;
}

// 定义菜单匹配规则
// arrFront 前端的菜单导航 arrBack 后端的菜单导航
// 匹配规则： 前端的meta.title = 后端的name ，则将前端的存到myArr里面
// 深拷贝：JSON.parse(JSON.stringify())   保证前端的菜单数据不被修改
import { cloneDeep } from "lodash";
export function matchMenu(arrFront, arrBack) {
    let myArr = [];  //匹配好的菜单导航
    let arr = cloneDeep(arrFront);
    arr.forEach(ele => {
        arrBack.forEach(item => {
            if (ele.meta.title == item.name) {
                if (item.children && item.children.length > 0) {  //判断是否有子级，进行递归判断
                    let matchedChildren = matchMenu(ele.children, item.children);
                    if (matchedChildren.length > 0) {
                        ele.children = matchedChildren;  // 替换子级为匹配后的子级
                    }
                }
                myArr.push(ele);
            }
        });
    })
    return myArr;
}