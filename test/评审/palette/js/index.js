/**
 * Created by qwer on 2017/8/28.
 */
window.onload = function () {
   /* let canvas = document.querySelector('canvas');
    /!*let ctx = canvas.getContext('2d');*!/
    let bottom = document.querySelector('.bottom');
    let bw = parseInt(getComputedStyle(bottom,null).width);
    let bh = parseInt(getComputedStyle(bottom,null).height);
    canvas.width = `${bw}`;
    canvas.height = `${bh}`;
    let line = document.querySelector('.icon-line');
    let palettes = new Palette(canvas);
    line.onclick = function () {
        palettes.line();
    }
    let dash = document.querySelector('.icon-xuxian');
    dash.onclick = function () {
        palettes.dashed();
    }
    let circle = document.querySelector('.icon-yuan');
    circle.onclick =function () {
        palettes.circle();
    }
    let pencil = document.querySelector('.icon-tubiao')
    pencil.onclick = function () {
        palettes.pencil();
    }
    let poly = document.querySelector('.icon-duobianxing');
    poly.onclick = function () {
        palettes.poly();
    }
    let rect = document.querySelector('.icon-juxing');
    rect.onclick = function () {
        palettes.rect();
    }
    let polyJ = document.querySelector('.icon-unie60d');
    polyJ.onclick = function () {
        let jiao = prompt('请输入',5)
        palettes.polyJ(jiao);
    }*/
    let canvas = document.querySelector('canvas');
    let ctx = canvas.getContext('2d');
    let mask = document.querySelector('.mask');
    let bottom = document.querySelector('.bottom');
    let bw = parseInt(getComputedStyle(bottom,null).width);
    let bh = parseInt(getComputedStyle(bottom,null).height);
    canvas.width = `${bw}`;
    canvas.height = `${bh}`;
    let palettes = new Palette(mask,ctx,canvas);
    let tools = document.querySelectorAll('.tools');
    let btn = document.querySelectorAll('.btn');
    let input = document.querySelectorAll('input');
    let eraser = document.querySelector('.eraser');
    let xiangpi = document.querySelector('.icon-xiangpi');
    let word = document.querySelector('.word');
    tools.forEach(element=>{
        element.onclick = function () {
            let num = document.querySelector('label[active=true]');
                num.setAttribute('active',false)
                element.setAttribute('active',true);
                if (this.id=='pencil'){
                    palettes.pencil();
                }else{
                    palettes.draw(this.id);
                }
        }
    })
    btn.forEach(element=>{
        element.onclick = function () {
            let num = document.querySelector('label[active=true]');
            num.setAttribute('active',false)
            element.setAttribute('active',true);
            palettes.style=this.id;
        }
    })
    input.forEach((element,index)=>{
        element.onchange = function () {
            if (index==0){
                palettes.strokeStyle  = this.value;
            }
            if(index==1){
                palettes.fillStyle  = this.value;
            }
        }
    })
    xiangpi.onclick = function () {
        palettes.eraser(eraser,20,20);
    }
    word.onclick = function () {
        palettes.font();
    }
    let save = document.querySelector('.icon-baocun');
    save.onclick=function () {
        save.href = canvas.toDataURL('image/png');
    }
    /*let news = document.querySelector('.icon-xinjian');
    news.onclick = function () {

    }*/
    let reverse = document.querySelector('.reverse');
    reverse.onclick = function () {
        palettes.reverse();
    }
    let clipObj = document.querySelector('.clip');
    let clip = document.querySelector('.icon-caiqie');
    clip.onclick = function () {
        palettes.clip(clipObj);
    }
}