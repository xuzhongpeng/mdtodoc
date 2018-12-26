const cheerio = require('cheerio');
const HtmlTemplate = require('./html-template.js');
//获取并返回

function getMenu(allHtml) {
    let arrayLi = [];
    let lastIndex = 0;
    var reg = new RegExp(/\<h2.*\>(.*)\<\/h2>/, "g");
    while (true) {
        reg.test(allHtml);
        let title = RegExp.$1;
        if (title == '' || reg.lastIndex == 0) {
            break;
        }
        let o = {};
        o['title'] = title;
        o['index'] = reg.lastIndex; //匹配结束位置
        arrayLi.push(o);
    }
    var reg1 = new RegExp(/\<h3.*\>(.*)\<\/h3>\n*(?!\<h1)/, "g");

    let arr = []; //孩子节点
    for (let n = 0; n < arrayLi.length; n++) {
        reg1.lastIndex = arrayLi[n].index;
        while (true) {
            reg1.test(allHtml);
            let child = RegExp.$1;
            let oo = {};
            if (child == '' || reg1.lastIndex == 0) {
                break;
            }
            if (n<arrayLi.length-1 && reg1.lastIndex > arrayLi[n + 1].index) {
                break;
            }
            oo['title'] = child;
            arr.push(oo)
        }
        arrayLi[n]['child'] = arr;
        arr = [];
    }
    return arrayLi;
}

function getTitleFromComment(html) {
    if(new RegExp(/<!--\s*sub-title:(.*)\s*-->/, 'g').test(html)) {
        return RegExp.$1;
    }
    return null;
}
function getMultiFilesMenu(allHtml) {
    let title, reg = new RegExp(/\<p\>title:(.*)\<\/p\>/, 'g');
    if(reg.test(allHtml)) {
        title = RegExp.$1;
        allHtml = allHtml.replace(reg, '');
    } else if(new RegExp(/<!--\s*sub-title:(.*)\s*-->/, 'g').test(allHtml)) {
        title = RegExp.$1;
    }
    title = title || '目录';
    let addHtml = HtmlTemplate.staticResource() + HtmlTemplate.tree(getMenu(allHtml), title);
    const $ = cheerio.load(addHtml);
    $('.content').append(allHtml);
    return $.html();
}
function getSingleFileMenu(allHtml) {
    let title;
    if(new RegExp(/<!--\s*sub-title:(.*)\s*-->/, 'g').test(allHtml)) {
        title = RegExp.$1;
    }
    title = title || '目录';
    let addHtml = HtmlTemplate.tree(getMenu(allHtml), title);
    const $ = cheerio.load(addHtml);
    $('.content').append(allHtml);
    return $.html();
}
module.exports = {
    getMultiFilesMenu,
    getSingleFileMenu,
    makeIdForHElement(html) {
        let reg = new RegExp(/\<h.*\>(.*)\<\/h(.*)>/, "g");
        return html.replace(reg, `<h$2 id="$1">$1</h$2>`);
    },
    addHighlightJsClass(html) {
        let reg = new RegExp(/\<code[^>]*\>/, "g");
        return html.replace(reg, '<code class="hljs">');
    }
};
