
const mario   = document.querySelector('.mario');
const pipe    = document.querySelector('.pipe');
const clouds  = document.querySelector('.clouds');
const finish  = document.querySelector('.game-over');
var pipeMoved = 0;
var points    = 0;
var runner;
var gameover = true;

const puloAudio = new Audio();
puloAudio.src = '/audio/pulo.ogg';
const morreuAudio = new Audio();
morreuAudio.src = '/audio/morreu.wav';
const inicioAudio = new Audio();
inicioAudio.src = '/audio/inicio.wav';

const start = () => {
    inicioAudio.play();
    finish.style.display = 'none';
    clouds.style.removeProperty('left');
    clouds.style.right = '-550px';
    clouds.style.animation = 'clouds-animation 30s infinite linear';
    pipe.style.removeProperty('left')
    pipe.style.right = '-180px';
    pipe.style.animation = 'pipe-animation 2s infinite linear';
    mario.classList.remove('jump');
    mario.style.botton = '0';
    mario.style.width  = '150px';
    mario.style.height = '100px';
    mario.style.removeProperty('marginLeft');
    mario.src = '/img/mario-run.gif';
    runner    = setInterval(() => loop() ,10);
    pipeMoved = 0;
    points    = 0;
    gameover  = false;
}

const jump = () => {
    if(!gameover){
        puloAudio.play();
        mario.style.animation = 'jump-animation 500ms ease-out';
        setTimeout(() => mario.style.removeProperty('animation'),500);
    }
}
const loop = () => {
    pipeMoved++;
    const pipePosition   = pipe.offsetLeft;
    const cloudsPosition = clouds.offsetLeft;
    const marioPosition  = +window.getComputedStyle(mario).bottom.replace('px','');   
    if(pipePosition <= 120 && pipePosition > 0 && marioPosition < 80 ){
        clouds.style.removeProperty('animation');
        clouds.style.left      = `${cloudsPosition}px`;
        pipe.style.removeProperty('animation');
        pipe.style.left        = `${pipePosition}px`;
        mario.style.removeProperty('animation');
        mario.style.botton     = `${marioPosition}px`;
        mario.src              = '/img/mario-stop.gif';
        gameover = true;
        clearInterval(runner);
        finish.style.display = 'block';
        morreuAudio.play();
        return;
    }
    if(pipeMoved == 200){
        points++
        pipeMoved = 0;
        document.querySelector('.points').innerHTML = 'Pontos: ' + points;
    }
}

document.addEventListener("keydown",jump);