/**
 * Created by qwer on 2017/8/24.
 */
window.onload =function () {
	let contact = [
	    {'name':'安','phone':'13810306971','pingyin':'an'},
	    {'name':'陈','phone':'15582415977','pingyin':'chenchong'},
	    {'name':'乘','phone':'13605456530','pingyin':'cq'},
	    {'name':'达','phone':'13653501267','pingyin':'d'},
	    {'name':'佩','phone':'18734177687','pingyin':'p'},
	    {'name':'杜','phone':'18235882390','pingyin':'dk'},
	    {'name':'刚','phone':'13522510414','pingyin':'g'},
	    {'name':'郭鑫','phone':'18306890504','pingyin':'gx'},
	    {'name':'刘建峰','phone':'15698350250','pingyin':'ljf'},
	    {'name':'甜','phone':'13734164315','pingyin':'tw'},
	    {'name':'杨','phone':'17835423091','pingyin':'yx'},
	    {'name':'志','phone':'18234877146','pingyin':'zy'},
	    {'name':'兴','phone':'13835850805','pingyin':'xg'},
	    {'name':'孙','phone':'15935876284','pingyin':'sw'},
	    {'name':'李星','phone':'18335182523','pingyin':'lx'},
	    {'name':'齐','phone':'17835424911','pingyin':'qcf'},
	    {'name':'米','phone':'18435419601','pingyin':'mjh'}
		]
	localStorage.contact = JSON.stringify(contact);
	let arr = JSON.parse(localStorage.contact);
	/*function getdata() {
	    let arr =localStorage.getItem('contact')?JSON.parse(JSON.stringify(localStorage.contact)):false;
	    if (!arr){
	        localStorage.setItem('contact',JSON.stringify(contact));
	 		arr = JSON.parse(localStorage.contact);
	    }
	    return arr;
	}
	let arr;
	arr.getdata();*/
	let inputs = document.querySelector('input');
	inputs.oninput = function() {
		let val = inputs.value.trim();
		let filters = arr.filter(element => {
			return element.name.includes(val) || element.phone.includes(val) || element.pingyin.includes(val)
		});
		render(filters);
	}
	render(arr);
	
	function render(arr) {
		let arrObj = {};
		arr.forEach(value => {
			let first = value.pingyin.charAt(0).toUpperCase();
			if (!arrObj[first]) {
				arrObj[first] = [];
			}
			arrObj[first].push(value);
		})
	
		let keys = Object.keys(arrObj).sort();
		let slide = document.querySelector('ul');
		let dl = document.querySelectorAll('dl')[0];
		dl.innerHTML = '';
		slide.innerHTML = '';
		keys.forEach(element => {
			dl.innerHTML += `
	            <dt>${element}</dt>
	            `;
			slide.innerHTML +=`
				<li>${element}</li>
			`
			/*let H=slide.offsetHeight;
			slide.style.marginTop = '-H/2';*/
			arrObj[element].forEach(value => {
				dl.innerHTML += `
	                <dd><a href="tel:${value.phone}">${value.name}</a></dd>
	            `
			})
		})
	}
	
	/*let keys = []
	for(var item in arrObj){
	    item
	    keys.push(item);
	}*/
	let tips = document.querySelector('.tips');
	let header = document.querySelector('header');
	let height = tips.offsetTop;
	
	let heights = height + header.offsetTop;
	let dt = document.querySelectorAll('dt');
	let tops = [];
	dt.forEach(element => {
		tops.push(element.offsetTop)
	
	})
	window.onscroll = function() {
		tops.forEach((value, index) => {
			let scrolls = document.body.scrollTop;
			if (value < heights + scrolls) {
				tips.innerText = dt[index].innerHTML;
			}
		})
	}
}