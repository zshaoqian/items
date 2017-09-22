/**
 * Created by qwer on 2017/8/14.
 */
function $(select,ranger=document){
    if(typeof select == 'string'){
        let selector = select.trim();
        let firstChar = selector.charAt(0);
        if(firstChar =='#'){
            return ranger.getElementById(selector.substring(1));
        }else if(firstChar == '.'){
            return ranger.getElementsByClassName(selector.substring(1));

        }else if(/^[a-zA-Z][a-zA-Z1-6]{0,8}$/.test(selector)){
            return ranger.getElementsByTagName(selector);
        }
    }else if(typeof select =='function'){
        window.onload = function () {
            select();
        }
    }
}
function html(element,content) {
        // console.log(element);
    if (arguments.length == 2){
        element.innerHTML = content;
    }else if(arguments.length == 1){
        return element.innerHTML;
    }

}
function text(element,content) {
    if (arguments.length == 2){
        element.innerText = content;
    }else if(arguments.length == 1){
        return element.innerText;
    }
}
function css(element,arrObj) {
    for(let i in arrObj){
        element.style[i] = arrObj[i];
    }
}
function on(collection,type,fn) {
    for(let i =0;i<collection.length;i++){
        collection[i][type]=fn;
    }
}
function off(collection,type){
    for(let i = 0;i<collection.length;i++){
        collection[i][type] = null;
    }
}
function animate(element,arrObj,speed=10,fn){
    let t = setInterval(function () {
        for(let i in arrObj){
            let start = parseInt(getComputedStyle(element)[i]);
            if(start>=arrObj[i]){
                clearInterval(t);
                if(true){
                    /*fn.call(element);*/
                    fn.apply(element);
                }
            }
            element.style[i] = `${start+speed}px`;
        }
    },60)
}
