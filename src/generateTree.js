 const cheerio = require('cheerio')

 //添加1级菜单
 module.exports = function addli(liHtml, title) {
     var ParentUl = `
    <link href='./style/style.css' rel="stylesheet" type="text/css">
    <script src='./js/scroll.js'></script>
    <div id='main' class='fix-sidebar'>
      <div class="sidebar">
        <div class='sidebar-inner'>
          <div class='list'>
            <h2>${title}</h2>
            <ul class='menu-root'>
            </ul>
          </div>
        </div>
      </div>
      <div class="content guide with-sidebar index-guide">
      </div>
    </div>`;
     const $ul = cheerio.load(ParentUl)
     let html = '';
     liHtml.forEach((item, index) => {
         html += `<li><a href="#${item.title}" class="sidebar-link section-link">${item.title}</a>`
         if (item.child && item.child.length != 0) {
             html += '<ul class="menu-sub">';
             item.child.forEach((childItem) => {
                 html += `<li><a class="section-link" data-scroll="" href="#${childItem.title}">${childItem.title}</a></li>`;
             })
             html += '</ul>'
         }
         html += '</li>';
     })
     $ul('.menu-root').append(html);
     $ul.html();
     //console.log($ul.html())
     return $ul.html();
 }
