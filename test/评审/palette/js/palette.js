/**
 * Created by qwer on 2017/8/28.
 */
/*
* 属性
*   线宽   端点   颜色   多边形边数   橡皮擦尺寸  canvas的宽高   history   画布环境ctx
*   canvas
*
* 方法
*   画线   实线、虚线   铅笔   多边形  文字  橡皮擦   多角形   裁切   圆
*
*   新建    保存

 * */
function Palette(mask,ctx,canvas) {
    /*定义属性是为了定义画板类的特点，也为了方便后面操作*/
    this.canvas = canvas;
    /*将canvas作为属性来操作*/
    this.mask = mask;
    /*定义一个mask属性来防止橡皮擦触发不了鼠标的onmouseup事件不能触发*/
    this.ctx = ctx;
    /*画图环境属性*/
    this.lineWidth = 1;
    /*定义描边的宽度*/
    this.fillStyle = '#333';
    /*定义默认的填充颜色*/
    this.strokeStyle = '#333';
    /*定义描边的颜色*/
    this.lineCap = 'butt';
    /*定义拐角*/
    this.history = [];
    /*将历史记录定义为属性*/
    this.style = 'stroke';
    /*定义默认的样式为描边*/
    this.polyJnum = 5;
    /*定义多角形默认的角数为5*/
    this.polynum = 5;
    /*定义多边形默认的边数为5边形*/
    this.temp = null;
}
/*以下为画板类的方法*/
Palette.prototype = {
    init:function () {
        this.ctx.setLineDash([0,0]);
        this.ctx.strokeStyle = this.strokeStyle;
        this.ctx.fillStyle = this.fillStyle;
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.lineCap = this.lineCap;
        this.ctx[this.style]();
    },/*定义初始化方法，定义一些很多方法都会用到的代码，缩减代码，让代码更加简洁，易懂*/
    line:function (ox,oy,cx,cy) {
        /*该方法传入四个参数，ox，cx分别为鼠标按下和移动时距离body的水平距离，
        * oy，cy分别是鼠标按下和移动是距离body的垂直距离。
        * */
        this.ctx.beginPath();
        /*beginPath（）方法是画板画图环境上的方法，开始一条路径*/
        this.ctx.moveTo(ox,oy);
        /*moveTo（）画板环境上的方法，路径的起点*/
        this.ctx.lineTo(cx,cy);
        /*lineTo（）画板环境上的方法，路径的终点*/
        this.ctx.closePath();
        /*closePath()画板环境上的方法，闭合一个路径*/
        this.ctx[this.style]();
    },/*直线的方法*/
    dashed:function (ox,oy,cx,cy) {
       /* let that = this;
        this.mask.onmousedown = function (e) {
            let ox = e.offsetX,oy = e.offsetY;
            that.mask.onmousemove = function (e) {
                let cx = e.offsetX,cy = e.offsetY;
                that.ctx.clearRect(0,0,that.canvas.width,that.canvas.height);
                if(that.history.length>0){
                    that.ctx.putImageData(that.history[that.history.length-1],0,0);
                }*/
                this.ctx.beginPath();
                this.ctx.setLineDash([5,15]);
                /*此处为设置虚线，参数表示绘制5个点跳过15个点*/
                this.ctx.moveTo(ox,oy);
                this.ctx.lineTo(cx,cy);
                this.ctx.closePath();
        this.ctx[this.style]();
           /* }
            document.onmouseup = function () {
                that.mask.onmousemove = null;
                that.mask.onmouseup = null;
                that.history.push(that.ctx.getImageData(0,0,that.canvas.width,that.canvas.height))
            }
            document.onkeydown = function (e) {
                if (e.ctrlKey&&e.keyCode==90){
                    that.history.pop();
                    //console.log(data);
                    let  img = that.history[that.history.length-1];
                    that.ctx.putImageData(img,0,0)
                    if(that.history.length==1){
                        alert('不能删除了')
                    }
                }
            }
        }*/
    },
    circle:function (ox,oy,cx,cy) {
        /*let  that = this
        this.mask.onmousedown = function (e) {
            let ox = e.offsetX,oy = e.offsetY;
            that.mask.onmousemove = function (e) {
                let cx = e.offsetX,cy = e.offsetY;
                that.ctx.clearRect(0,0,that.canvas.width,that.canvas.height);
                if(that.history.length>0){
                    that.ctx.putImageData(that.history[that.history.length-1],0,0);
                }*/
                let r = Math.sqrt(Math.pow(ox-cx,2)+Math.pow(oy-cy,2));
                /*定义半径*/
                this.ctx.beginPath();
                this.ctx.arc(ox,oy,r,0,Math.PI*2,false);
                /*arc()画板环境的方法，ox，oy为圆心，r为半径，圆的闭合，boolean值顺时针画圆，还是逆时针画*/
                this.ctx.closePath();
                this.ctx[this.style]();
            /*}
            that.mask.onmouseup = function () {
                that.mask.onmousemove = null;
                that.mask.onmouseup = null;
                that.history.push(that.ctx.getImageData(0,0,that.canvas.width,that.canvas.height))
            }
            document.onkeydown = function (e) {
                if (e.ctrlKey&&e.keyCode==90){
                    that.history.pop();
                    //console.log(data);
                    let  img = that.history[that.history.length-1];
                    that.ctx.putImageData(img,0,0)
                    if(that.history.length==1){
                        alert('不能删除了')
                    }
                }
            }
        }*/
    },
    /*铅笔的方法*/
    pencil:function () {
        let that = this;
        this.mask.onmousedown = function (e) {
            that.init();
            let ox = e.offsetX,oy = e.offsetY;
            /*如果历史记录的长度大于0，说明有历史记录*/
            if(that.history.length>0){
                /*将历史记录中的最后一条放到画板上，也就是将上一次的图片信息展示出来*/
                that.ctx.putImageData(that.history[that.history.length-1],0,0);
            };
            that.ctx.beginPath();
            that.ctx.moveTo(ox,oy);
            that.mask.onmousemove = function (e) {
                let cx = e.offsetX,cy = e.offsetY;
                that.ctx.lineTo(cx,cy);
                that.ctx.stroke();
            };
            that.mask.onmouseup = function () {
                that.mask.onmousemove = null;
                that.mask.onmouseup = null;
                /*当鼠标抬起时，说明一条路径完成，记录一个历史纪录*/
                /*通过获得画板上的图片信息，去保存历史纪录*/
                that.history.push(that.ctx.getImageData(0,0,that.canvas.width,that.canvas.height))
            };
            document.onkeydown = function (e) {
                if (e.ctrlKey&&e.keyCode==90){
                    that.history.pop();
                    //console.log(data);
                    let  img = that.history[that.history.length-1];
                    that.ctx.putImageData(img,0,0);
                    if(that.history.length==1){
                        alert('不能删除了')
                    }
                }
            }
        }
    },
    /*多边形的画法*/
    poly:function (ox,oy,cx,cy) {
        /*let that = this;
        this.mask.onmousedown = function (e) {
            let ox =e.offsetX,oy = e.offsetY;
            let n=5;
            that.mask.onmousemove = function (e) {
                let cx = e.offsetX,cy = e.offsetY;
                that.ctx.clearRect(0,0,that.canvas.width,that.canvas.height);
                if (that.history.length>0) {
                    that.ctx.putImageData(that.history[that.history.length - 1], 0, 0)
                }*/
                let r =Math.sqrt(Math.pow(ox-cx,2)+Math.pow(oy-cy,2));
                /*多边形是依据圆去画，所以先定义圆的半径*/
                this.ctx.beginPath();
                this.ctx.moveTo(ox+r,oy);
                for(let i = 1;i<this.polynum;i++){
                    let x =ox+Math.cos(Math.PI*2/this.polynum*i)*r,y = oy+Math.sin(Math.PI*2/this.polynum*i)*r;
                    this.ctx.lineTo(x,y)
                }
                /*用循环的方法去化正多边形的每一条边，根据半径去定义每个点的位置*/
                this.ctx.closePath();
        this.ctx[this.style]();
        /* }
            that.mask.onmouseup = function () {
                that.mask.onmousemove = null;
                that.mask.onmouseup = null;
                that.history.push(that.ctx.getImageData(0,0,that.canvas.width,that.canvas.height));
            }
        }*/
    },
    /*正方形*/
    rect:function(ox,oy,cx,cy) {
        /*let that = this;
        this.mask.onmousedown = function (e) {
            let ox =e.offsetX,oy = e.offsetY;
            that.mask.onmousemove = function (e) {
                let cx = e.offsetX,cy = e.offsetY;
                that.ctx.clearRect(0,0,that.canvas.width,that.canvas.height);
                if(that.history.length>0)
                that.ctx.putImageData(that.history[that.history.length-1],0,0)*/
                this.ctx.beginPath();
                this.ctx.moveTo(ox,oy);
                this.ctx.lineTo(ox,cy);
                this.ctx.lineTo(cx,cy);
                this.ctx.lineTo(cx,oy);
                this.ctx.closePath();
        this.ctx[this.style]();
        /*}
            that.mask.onmouseup = function () {
                that.mask.onmousemove = null;
                that.mask.onmouseup = null;
                that.history.push(that.ctx.getImageData(0,0,that.canvas.width,thar.canvas.height));
            }
        }*/
    },
    /*多角形*/
    polyJ: function (ox,oy,cx,cy) {
        /*this.mask.onmousedown = function (e) {
            let ox = e.offsetX, oy = e.offsetY;
            that.mask.onmousemove = function (e) {
                let cx = e.offsetX,cy = e.offsetY;
                that.ctx.clearRect(0,0,that.canvas.width,that.canvas.height);
                if(that.history.length>0){
                    that.ctx.putImageData(that.history[that.history.length-1],0,0)
                }*/
                let r =Math.sqrt(Math.pow(ox-cx,2)+Math.pow(oy-cy,2));
                this.ctx.beginPath();
                this.ctx.moveTo(ox+r,oy);
                let x,y;
                for(let i = 1;i<this.polyJnum*2;i++){
                    if(i%2){
                         x =ox+Math.cos(Math.PI*2/this.polyJnum/2*i)*r/2;y = oy+Math.sin(Math.PI*2/2/this.polyJnum*i)*r/2;
                    }else{
                         x =ox+Math.cos(Math.PI*2/this.polyJnum/2*i)*r;y = oy+Math.sin(Math.PI*2/2/this.polyJnum*i)*r;
                    }
                    this.ctx.lineTo(x,y)
                }
                /*和多边形原理一样，只不过要来回画*/
                this.ctx.closePath();
        this.ctx[this.style]();
            /*}
            that.mask.onmouseup = function () {
                that.mask.onmousemove = null;
                that.mask.onmouseup = null;
                that.history.push(that.ctx.getImageData(0,0,that.canvas.width,that.canvas.height))
            }
            document.onkeydown = function (e) {
                if(e.ctrlKey&&e.keyCode == 90){
                    that.history.pop();
                    let img = that.history[that.history.length-1];
                    that.ctx.putImageData(img,0,0)
                }
            }
        }*/
    },
    /*定义一个封装函数，简化代码，代码利用率高，面向对象*/
    draw:function (type) {
        /*传入一个参数，type指明要执行的方法，回调函数*/
        this.mask.onmousedown = function (e) {
            let ox = e.offsetX,oy = e.offsetY;
            this.init();
            this.mask.onmousemove = function (e) {
                let cx = e.offsetX,cy = e.offsetY;
                this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
                /*清除画板，clearRect（）方法有四个参数，前两个为开始坐标，后两个为结束坐标*/
                if(this.history.length>0){
                    this.ctx.putImageData(this.history[this.history.length-1],0,0)
                }
                this[type](ox,oy,cx,cy);
            }.bind(this);
            /*将函数中所有的this绑定最外层this*/
            this.mask.onmouseup = function () {
                this.mask.onmousemove = null;
                this.mask.onmouseup = null;
                this.history.push(this.ctx.getImageData(0,0,this.canvas.width,this.canvas.height))
            }.bind(this)
        }.bind(this);
        document.onkeydown = function (e) {
            if(e.ctrlKey&&e.keyCode == 90){
                this.history.pop();
                let img = this.history[this.history.length-1];
                this.ctx.putImageData(img,0,0)
            }
        }.bind(this);
    let chexiao = document.querySelector('.icon-chexiao');
        chexiao.onclick = function () {
            this.history.pop();
            let img = this.history[this.history.length-1];
            this.ctx.putImageData(img,0,0)
        }.bind(this)
    },
    /*橡皮擦的方法*/
    eraser:function (obj,w,h) {
        /*传入三个对象，obj为橡皮擦，w为橡皮擦的宽度，h为橡皮擦高度*/
        let that = this;
        this.mask.onmousedown = function (e) {
            obj.style.display = 'block';
            e.preventDefault();
            /*阻止事件对象的默认行为，防止屏幕变蓝*/
            that.mask.onmousemove = function (e) {
                let ox = e.offsetX,oy = e.offsetY;
                let lefts = ox - w/2,tops = oy-h/2;
                if (tops<=0){
                    tops = 0;
                }
                if (tops>that.canvas.height-h){
                    tops = that.canvas.height-h;
                }
                if(lefts<=0){
                    lefts=0;
                }
                if(lefts>that.canvas.width-w){
                    lefts = that.canvas.width-w;
                }
                /*四个if,防止橡皮擦超出画板边界*/
                obj.style.top = `${tops}px`;
                obj.style.left = `${lefts}px`;
                that.ctx.clearRect(lefts,tops,w,h);
            };
            that.mask.onmouseup = function () {
                that.mask.onmousemove = null;
                that.mask.onmouseup = null;
                obj.style.display = 'none';
                that.history.push(that.ctx.getImageData(0,0,that.canvas.width,that.canvas.height));
            }
        }
    },
    /*文字工具*/
    font:function () {
        let that = this;
        let divs = document.createElement('div');
        this.mask.onmousedown = function (e) {
            let ox = e.offsetX,oy = e.offsetY;
            divs.style.cssText = `
                width:80px;
                height:20px;
                background:#fff;
                border:1px dashed #ccc;
                position:absolute;
                top:${oy}px;
                left:${ox}px;
              
                `;
            /*在画板上出现一个div框，作为文本框*/
            that.mask.appendChild(divs);
            that.mask.onmousedown = null;
        };
        divs.onclick = function () {
            this.contentEditable = 'true';
        /*将该框设置为可编辑*/
        };
        let lefts,tops;
        divs.onmousedown = function (e) {
            let ox = e.clientX,oy = e.clientY;
            let ol = this.offsetLeft,ot = this.offsetTop;
            that.mask.onmousemove = function (e) {
                divs.style.cursor = 'move';
                let cx = e.clientX,cy = e.clientY;
                lefts = cx-ox+ol;
                tops=cy-oy+ot;
                divs.style.top = `${tops}px`;
                divs.style.left = `${lefts}px`;
            };
            divs.onmouseup = function () {
                that.mask.onmousemove = null;
                divs.onmouseup = null;
            };
        };
        /*移动文本框*/
        divs.onblur = function () {
            let value = divs.innerText;
            that.mask.removeChild(divs);
            that.ctx.font='bold 14px sans-serif';
            that.ctx.textAlign = 'center';
            that.ctx.textBaseline = 'middle';
            that.ctx.fillText(value,lefts,tops);
            that.history.push(that.ctx.getImageData(0,0,that.canvas.width,that.canvas.height))
        }
        /*当div失去焦点时文本编辑完成*/
    },
    reverse:function () {
        let imgData = this.ctx.getImageData(0,0,this.canvas.width,this.canvas.height);
        let data = imgData.data;
        for(let i=0;i<data.length;i+=4){
            data[i]=255-data[i];
            data[i+1]=255-data[i+1];
            data[i+2]=255-data[i+2];
        }
        /*将图片数据的所有信息反向*/
        this.ctx.putImageData(imgData,0,0);
        /*将该图片信息放入画板*/
    },
    /*裁剪工具*/
    clip:function (clipObj) {
        let that = this;
        this.mask.onmousedown = function (e) {
            let w,h,minx,miny;
            let ox = e.offsetX,oy = e.offsetY;
            that.mask.onmousemove = function (e) {
                let cx = e.offsetX,cy = e.offsetY;
                w = Math.abs(ox-cx);
                h=Math.abs(oy-cy);
                minx = ox<cx?ox:cx;
                miny = oy<cy?oy:cy;
                clipObj.style.cssText = `display:block;
                        left:${minx}px;top:${miny}px;
                        width:${w}px;height:${h}px;
                    `
            };
            that.mask.onmouseup = function () {
                that.temp = that.ctx.getImageData(minx,miny,w,h);
                /*将该框所覆盖的区域的图片信息保存下来*/
                that.ctx.clearRect(minx,miny,w,h);
                /*将该区域的信息清除*/
                that.history.push(that.ctx.getImageData(0,0,that.canvas.width,that.canvas.height));
                that.ctx.putImageData(that.temp,minx,miny);
                that.mask.onmousemove = null;
                that.mask.onmouseup = null;
                that.drag(minx,miny,w,h,clipObj);
            }
        }
    },
    drag:function (minx,miny,w,h,clipObj) {
        let that = this;
        this.mask.onmousemove = function (e) {
            let ox = e.offsetX,oy = e.offsetY;
            if(ox>=minx&&ox<=minx+w&&oy>=miny&&oy<=miny+h){
                that.mask.style.cursor = 'move';
            }else{
                that.mask.style.cursor = 'default';
            }
        }
        this.mask.onmousedown = function (e) {
            let ox = e.offsetX,oy = e.offsetY;
            that.mask.onmousemove = function (e) {
                let cx = e.offsetX,cy = e.offsetY;
                let lefts = cx-ox+minx;
                let tops = cy-oy+miny;
                if(lefts <= 0){
                    lefts = 0
                }
                if(lefts >=that.canvas.width-w){
                    lefts = that.canvas.width-w;
                }
                if(tops <= 0){
                    tops = 0
                }
                if(tops >=that.canvas.height-h){
                    tops = that.canvas.height-h;
                }
                clipObj.style.left = `${lefts}px`;
                clipObj.style.top = `${tops}px`;
                if (that.history.length>0){
                    that.ctx.putImageData(that.history[that.history.length-1],0,0)
                }
                that.ctx.putImageData(that.temp,lefts,tops);
            }
            that.mask.onmouseup=function () {
                that.temp = null;
                clipObj.style.display = 'none'
                that.history.push(that.ctx.getImageData(0,0,that.canvas.width,that.canvas.height))
                that.mask.onmousemove = null;
                that.mask.onmouseup = null;
            }
        }
    }
};


