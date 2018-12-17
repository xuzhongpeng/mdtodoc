const cheerio = require('cheerio');
const addli = require('./generateTree.js');
//获取并返回
module.exports = function htmlEdit(allHtml) {
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
    let title;
    reg = new RegExp(/\<p\>title:(.*)\<\/p\>/, 'g');
    if(reg.test(allHtml)) {
        title = RegExp.$1;
        allHtml = allHtml.replace(reg, '');
    } else if(new RegExp(/<!--\s*sub-title:(.*)\s*-->/, 'g').test(allHtml)) {
        title = RegExp.$1;
    }
    const $ = cheerio.load(addli(arrayLi, title || '目录'));
    $('.content').append(allHtml);
    return $.html();
};
