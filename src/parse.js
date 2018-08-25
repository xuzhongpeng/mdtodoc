const cheerio = require('cheerio')
const addli = require('./generateTree.js')
//获取并返回
module.exports = function htmlEdit(allHtml) {
    let arrayLi = [];
    let beignIndex = 0,
        lastIndex = 0;
    var reg = new RegExp(/\<h1.*\>(.*)\<\/h1>/, "g");
    i = 0;
    while (true) {
        reg.test(allHtml)
        let title = RegExp.$1;
        i++
        if (title == '' || reg.lastIndex == 0) {
            break;
        }
        //console.log("**:"+title)
        let o = {}
        o['title'] = title;
        o['index'] = reg.lastIndex; //匹配结束位置
        //console.log(JSON.stringify(o))
        beignIndex = reg.lastIndex
        arrayLi.push(o);
    }
    var reg1 = new RegExp(/\<h2.*\>(.*)\<\/h2>\n*(?!\<h1)/, "g");

    let arr = [] //孩子节点
    let xx = []; //最后一个孩子节点
    for (let n = 0; n < arrayLi.length - 1; n++) {
        reg1.lastIndex = arrayLi[n].index;
        while (true) {
            reg1.test(allHtml)
            let child = RegExp.$1
            let oo = {}
            if (child == '' || reg1.lastIndex == 0) {
                break;
            }
            if (n < arrayLi.length - 2) { //处理最后一个子节点
                if (reg1.lastIndex > arrayLi[n + 1].index) {
                    break;
                }
                //     console.log(n+":  "+child)
                oo['title'] = child;
                arr.push(oo)
            } else {
                if (reg1.lastIndex > arrayLi[n + 1].index) {
                    oo['title'] = child;
                    xx.push(oo)
                }
                arrayLi[n + 1]['child'] = xx;
            }

        }
        arrayLi[n]['child'] = arr;
        arr = [];
    }
    reg = new RegExp(/\<p\>title:(.*)\<\/p\>/, 'g');
    allHtml = allHtml.replace(reg, '');
    const $ = cheerio.load(addli(arrayLi, RegExp.$1))
    $('.content').append(allHtml);
    return $.html();
}