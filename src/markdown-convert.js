const marked = require("marked");
const hljs = require('highlight.js');

marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function(code, lang) {
        let rs = hljs.highlightAuto(code, [lang]).value;
        return rs;
    },
    pedantic: false,
    gfm: true,
    tables: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false
});

module.exports = marked;
