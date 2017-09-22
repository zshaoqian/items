/**
 * Created by qwer on 2017/8/12.
 */
window.onload = function() {
	let banner = document.getElementsByClassName('banner2')[0];
	let lis = banner.getElementsByTagName('li');
	let Btn = document.getElementsByClassName('btn')[0];
	let btns = Btn.getElementsByTagName('li');
	let t = setInterval(fn, 3000);
	let num = next = 0;
	btns[0].style.background = '#fff';
	let widths = banner.offsetWidth;

	function fn() {
		/*num++;
		num = num%lis.length;
		for(let i=0;i<lis.length;i++){
		    lis[i].style.display = 'none';
		    btns[i].style.background = '#999';
		}
		lis[num].style.display = 'block';
		btns[num].style.background = '#fff';*/
		next++;
		if (next == lis.length) {
			next = 0;
		}
		animate(lis[num], {
			opacity: 0
		});
		btns[num].style.background = '#999';
		animate(lis[next], {
			opacity: 1
		});
		btns[next].style.background = '#fff';
		num = next;
	}
	banner.onmouseover = function() {
		clearInterval(t);
	}
	banner.onmouseout = function() {
		t = setInterval(fn, 3000);
	}
	for (let i = 0; i < btns.length; i++) {

		btns[i].onmouseover = function() {
			animate(lis[num], {
				opacity: 0
			})
			btns[num].style.background = '#999';
			animate(lis[i], {
				opacity: 1
			});
			btns[i].style.background = '#fff';

			// clearInterval(t);
			num = next = i;
		}
	}
	let display = document.getElementsByClassName('display1');
	let banner_nav = document.getElementsByClassName('banner_nav')[0];
	let LI = document.getElementsByClassName('li');
	for (let i = 0; i < LI.length; i++) {
		LI[i].onmouseover = function() {

			display[i].style.display = 'block';
		}
		LI[i].onmouseout = function() {
			display[i].style.display = 'none';
		}
	}
	let miaodian = document.querySelector('.miaodian');
	let miaodian1 = document.querySelectorAll('.miaodian1>li');
	let miao = document.querySelectorAll('.miao');
	let sousuo = document.querySelector('.sousuo');
	let ch = innerHeight;
	let posArr = [];
	let x = 0;
	miaodian1.forEach((element, index) => {
		element.onclick = function() {
			miaodian1[x].classList.remove('add');
			miaodian1[index].classList.add('add');
			animate(document.body, {
				scrollTop: posArr[index]
			});

			x = index;
		}
	})
	miaodian1[7].onclick = function() {
		animate(document.body, {
			scrollTop: 0
		});
	}
	miao.forEach(element => {
		let a = element.offsetTop;
		posArr.push(a)
	})
	let flag = true;
	window.onscroll = function() {
		let b = document.body.scrollTop;

		posArr.forEach((value, index) => {
			if (b > 500) {
				if (flag) {
					flag = false;
					animate(miaodian, {
						height: 332,
						width: 35
					}, 80);
					animate(sousuo, {
						height: 50
					}, 150)
				}
			} else if (b < 500) {
				if (!flag) {
					flag = true;
					animate(miaodian, {
						height: 0,
						width: 0
					}, 80)
					animate(sousuo, {
						height: 0
					}, 150)
				}

			}
			if (b + ch >= value + 300) {
				miaodian1[x].classList.remove('add');
				miaodian1[index].classList.add('add');
				x = index;
				let imgss = miao[index].getElementsByTagName('img');
				for (let i = 0; i < imgss.length; i++) {
					imgss[i].src = imgss[i].getAttribute('path');
				}
			}
		})

	}
	let input = document.querySelector('#mq');
	input.onfocus = function() {
		input.placeholder = input.getAttribute('value');
		input.value = null;
		console.dir(input);
	}
    input .onblur = function () {
        input.value = input.getAttribute('placeholder')
        input.placeholder = null;
    }
	let fixed = document.getElementsByClassName('fixed')[0];
	let L = fixed.getElementsByTagName('li');

	let zichan = document.querySelectorAll('.zichan');
	let arr = Array.from(L);
	arr.forEach((element,index)=>{
        element.addEventListener('mouseover',function () {
        	zichan[index].style.display = 'block';
            animate(zichan[index],{left:-100,opacity:1},200)
        })
        element.addEventListener('mouseout',move);
        function move() {
            animate(zichan[index],{left:-150,opacity:0},200)
			zichan[index].style.display = 'none';
        }
		}
	)

}