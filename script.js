// https://github.com/SedunovSSS
// Flappy Bird on JS (Web Version)
// Original: https://github.com/SedunovSSS/Flappy-Bird
// https://github.com/SedunovSSS/Flappy-Bird-JS


var cvs = document.getElementById("canvas"),
ctx = cvs.getContext("2d");

var bird = new Image();
var bg = new Image(); 
var pipeUp = new Image(); 
var pipeBottom = new Image(); 

var fly = new Audio();
var die = new Audio();
var checkpoint = new Audio();

bird.src = "img/bird.png"; 
bg.src = "img/bg.png";
pipeUp.src = "img/column1.png"; 
pipeBottom.src = "img/column2.png"; 

fly.src = "sounds/fly.mp3";
die.src = "sounds/die.mp3";
checkpoint.src = "sounds/point.mp3"

var otstup = 200;

var score = 0;

document.addEventListener('keydown', moveUp);
document.getElementById('button').onclick = function(){
    moveUp();
}

var xPos = 10, yPos = 200;

function moveUp(){
    if (yPos >= 0){
    yPos -= 60;
    fly.play();
    }
}

var pipe = [];
pipe[0] = {
    x: cvs.width,
    y: -150,
}

function drawing(){ 
    ctx.drawImage(bg, 0, 0);
    for (i = 0; i < pipe.length; i++){
    ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height - 50 + otstup);
    pipe[i].x--;
    if (pipe[i].x == 20){
        pipe.push({
            x: cvs.width,
            y: Math.floor(Math.random() * pipeUp.height) - 300,
        });
    }
    if(xPos + bird.width >= pipe[i].x && xPos <= pipe[i].x + pipeUp.width
        && (yPos <= pipe[i].y + pipeUp.height
        || yPos + bird.height >= pipe[i].y + pipeUp.height + otstup - 30)){
            pipe[0] = {
                x: cvs.width,
                y: -150,
            }
            xPos = 10, yPos = 200;
            pipe.length = 0;    
            location.reload();       
    }
    if (pipe[i].x == 5){
        score++;
        checkpoint.play();
    }
    if (pipe.length >= 5){
        pipe.shift();
    }
    }
    ctx.drawImage(bird, xPos, yPos);
    if (yPos <= cvs.height - bird.height){yPos+=2;}
    ctx.fillStyle = "#000";
    ctx.font = "20px Arial";
    ctx.fillText("SCORE: " + score, 5, cvs.height - 15)
    requestAnimationFrame(drawing);
}
pipeBottom.onload = drawing;
