// 公共的方法文件

// 处理html标签的页面显示方法
export function removeHTMLTag(htmlStr){
    let html = htmlStr
        .replace(/<img.*?>/g, '[图片]')
        .replace(/<[^>]+>/g, "")
        .replace(/$nbsp;/gi, "");
    return html;
}

// 日期处理