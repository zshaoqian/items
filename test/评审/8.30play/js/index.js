/**
 * Created by qwer on 2017/8/30.
 */
window.onload = function(){
    let song =document.querySelector('.song');
    let singer = document.querySelector('.singer');
    let ul = document.querySelector('ul');
    let audio =document.querySelector('audio');
    let circle = document.querySelector('.circle3');
    let pause = document.querySelectorAll('.peause')
    let paused = document.querySelector('.peaused');
    let play = document.querySelector('.play');
    let end = document.querySelector('.end');
    let next = document.querySelector('.next');
    let pre =document.querySelector('.pre');
    let body = document.querySelector('body');
    let html = document.querySelector('html');
    let i = 0;
    render(database[i]);
    next.onclick = function () {
        i++;
        render(database[i]);
        audio.play()
        paused.style.display = 'none';
        play.style.display = 'block';
    }
    pre.onclick = function () {
        i--;
        render(database[i]);
        audio.play()
        paused.style.display = 'none';
        play.style.display = 'block';
    }
    pause[0].onclick = function () {
        if(audio.paused){
            audio.play();
            paused.style.display = 'none';
            play.style.display = 'block';
        }else{
            audio.pause();
            play.style.display = 'none';
            paused.style.display = 'block';
        }
    }
    pause[1].onclick = function () {
        if(audio.paused){
            audio.play();
            paused.style.display = 'none';
            play.style.display = 'block';
        }else{
            audio.pause();
            play.style.display = 'none';
            paused.style.display = 'block';
        }
    }
    function render(data) {
        end.innerText = `${data.alltime}`;
        /*end.innerText = `${Math.floor(audio.duration/60)>=10?Math.floor(audio.duration/60):'0'+Math.floor(audio.duration/60)}:${Math.floor(audio.duration%60)>=10?Math.floor(audio.duration%60):'0'+Math.floor(audio.duration%60)}`*/
        circle.src = data.photo;
        audio.src = data.src;
        body.style.backgroundImage=`url:(${data.src})`;
        html.style.backgroundImage=`url:(${data.src})`;
        song.innerText = data.songs;
        singer.innerText = data.name;
        ul.innerHTML = '';
        for(let j=0;j<data.lyrics.length;j++){
                ul.innerHTML +=`
                    <li>${data.lyrics[j].lyric}</li>
                `
        }
    audio.ontimeupdate = function () {
        let bili = audio.currentTime/audio.duration;
        let a = document.querySelector('.xian>a');
        let current = document.querySelector('.current');
        current.innerText =`${Math.floor(audio.currentTime/60)>=10?Math.floor(audio.currentTime/60):'0'+Math.floor(audio.currentTime/60)}:${Math.floor(audio.currentTime%60)>=10?Math.floor(audio.currentTime%60):'0'+Math.floor(audio.currentTime%60)}`
        a.style.width = `${bili*100}%`;
        data.lyrics.forEach((element,index)=>{
            let a = index;
            if (element.time==current.innerText){
                if (index<4){
                    index=0;
                }else{
                    index-=4;
                }
                ul.innerHTML = ''
                for(let l=index;l<data.lyrics.length;l++){
                    ul.innerHTML +=`
                    <li class="li${l}">${data.lyrics[l].lyric}</li>
                `
                }
                document.querySelector(`.li${a}`).style.color = '#ff6700';
                document.querySelector(`.li${a}`).style.transform = 'scale(1.4)'
            }
        })
    }
    audio.onended = function () {
        i++;
        if(i==6){
            i=0
        }
        render(database[i]);
        audio.play();
        paused.style.display = 'none';
        play.style.display = 'block';
    }
        let volume = document.querySelector('.volume');
        let volumes = document.querySelector('.volumes');
        let volumes1 = document.querySelector('.volumes1');
        let  a = document.querySelector('.volumes>a');
        let volumes2 = document.querySelector('.volumes2')
        volume.onclick = function () {
            volumes.classList.toggle('display')
        }
        volumes.onmousedown = function (e) {
            let obj = e.target;
            let cx = e.clientX,ox=e.offsetX;
            let ol = a.offsetLeft;
            document.onmousemove = function (e) {
                let cx1=e.clientX;

                let lefts = cx1-cx-ox+ol;
                if(lefts<=-5){
                    lefts = -5
                }
                if (lefts>=100){
                    lefts = 95;
                }
                obj.style.left = `${lefts+5}px`;
                volumes2.style.width = `${lefts+5}px`
                audio.volume = (lefts)/100

            }
            volumes.onmouseup = function () {
                volumes.onmouseup = null;
                document.onmousemove = null;
            }
        }

}
}