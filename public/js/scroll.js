let arr = []  //获取每个位置的高度

window.onload = function () {
    let clickSelector = document.querySelectorAll(".section-link");
    clickSelector.forEach((item) => {
        let jumpId = item.text;
        let jump = document.getElementById(jumpId)
        let total = jump.offsetTop
        let o = {}
        o["offset"] = total;
        o["mark"] = jumpId;
        arr.push(o) //把每个锚点对应的位置信息放进arr数组

        item.addEventListener('click', (e) => {
            jump1(e.target.text)
        })
    })
    let i=0;//定义当前显示的值
    let isFirst=0; //定义是否是第一次加载
    let nowHeigth=0;
    let element=document.getElementsByClassName("section-link");
    document.body.onscroll = (e) => {
        nowHeigth = document.documentElement.scrollTop || document.body.scrollTop;
        
        for(let n=0;n<arr.length;n++){
            if(nowHeigth>=arr[n].offset){
                let e=document.getElementsByClassName("active");
                //console.log(e)
                if(e.length>0){
                    for(let a=0;a<e.length;a++){
                        e[a].setAttribute('class',e[a].getAttribute('class').replace("active",''))
                    }
                }
                element[n].setAttribute('class',element[n].getAttribute('class')+" active"); 
              /*   var aa=element[n].parentNode.parentNode.previousElementSibling;//查看是否含有父节点
               // console.log(aa.getAttribute('class'))
                if(aa.getAttribute("class")){
                   // console.log(aa.getAttribute("class").indexOf('sidebar-link'))
                    if(aa.getAttribute("class").indexOf('sidebar-link')>-1){
                    //console.log(aa.getAttribute('class'))
                        aa.setAttribute("class",aa.getAttribute('class')+' active');
                    }
                } */
           }
        }
       // console.log(nowHeigth)
    }
}
function jump1(jumpId) {
    // 用 class="d_jump" 添加锚点
    let jump = document.getElementById(jumpId)
    let total = jump.offsetTop
    let distance = document.documentElement.scrollTop || document.body.scrollTop
    arr.push(distance)
    // 平滑滚动，时长500ms，每10ms一跳，共50跳
    let step = total / 50
    if (total > distance) {
        smoothDown()
    } else {
        let newTotal = distance - total
        step = newTotal / 50
        smoothUp()
    }
    function smoothDown() {
        if (distance < total) {
            distance += step
            document.body.scrollTop = distance
            document.documentElement.scrollTop = distance
            setTimeout(smoothDown, 10)
        } else {
            document.body.scrollTop = total
            document.documentElement.scrollTop = total
        }
    }
    function smoothUp() {
        if (distance > total) {
            distance -= step
            document.body.scrollTop = distance
            document.documentElement.scrollTop = distance
            setTimeout(smoothUp, 10)
        } else {
            document.body.scrollTop = total
            document.documentElement.scrollTop = total
        }
    }
}
