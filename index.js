const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

class SnakePart{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}


let speed = 7;

let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;

let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 2;

let xVelocity = 0;
let yVelocity = 0;

let appleX = 5;
let appleY = 5;

let score = 0;

const eatSound = new Audio();

//game loop
function drawGame(){
    clearScreen();
    changeSnakePosition();
    
    let result = isGameOver();
    if (result) return;
    
    checkAppleCollision();
    drawApple();
    drawSnake();

    drawScore();

    if (score > 2){
        speed = 11;
    }
    if (score > 5){
        speed = 15;
    }
    setTimeout(drawGame, 1000/ speed);
}

function isGameOver(){
    let gameOver = false;

    if(yVelocity === 0 && xVelocity === 0){
        return false;
    }

    //walls
    if (headX < 0){
        gameOver = true;
    }

    else if (headX === tileCount){
        gameOver = true;
    }

    else if(headY < 0){
        gameOver = true;
    }

    else if(headY === tileCount){
        gameOver = true;
    }

    for(let i=0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        if (part.x == headX && part.y == headY){
            gameOver = true;
            break;
        }
    }

    if (gameOver) {
        ctx.fillStyle = 'white';
        ctx.font = '50px Verdana';

        ctx.fillText('Game Over!', canvas.width / 6.5, canvas.height / 2)
        ctx.fillText(`Score: ${score}`, canvas.width / 6.5, canvas.height / 1.25)
    }

    return gameOver
}

function drawScore(){
    ctx.fillStyle = 'white';
    ctx.font = '10px Verdana'
    ctx.fillText("Score " + score, canvas.width - 50, 10);
}

function clearScreen(){
    ctx.fillStyle = 'black'
    ctx.fillRect(0,0,canvas.width, canvas.height);
}

function drawSnake(){
    ctx.fillStyle = 'green'
    ctx.fillStyle = 'green';
    for(let i=0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize)
    }

    // put an item at the end of the list next to the head
    snakeParts.push(new SnakePart(headX, headY))
    if(snakeParts.length > tailLength){
        snakeParts.shift(); // removes further item from snake parts if tail size is less than length
    }

    ctx.fillStyle = 'orange';
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function changeSnakePosition(){
    headX = headX + xVelocity;
    headY = headY + yVelocity;

}

function drawApple(){
    ctx.fillStyle = 'red';
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize)

}

function checkAppleCollision(){
    if (appleX === headX && appleY == headY){
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        tailLength++;
        score++;
        eatSound.play();
    }
}

document.body.addEventListener('keydown', keyDown);

function keyDown(event){
    // up or w
    if(event.keyCode == 38 || event.keyCode == 87){
        if(yVelocity == 1) return;
        yVelocity = -1;
        xVelocity = 0;
    }

    // down or s
    if(event.keyCode == 40 || event.keyCode == 83){
        if(yVelocity == -1) return;
        yVelocity = 1;
        xVelocity = 0;
    }

    //left or a
    if(event.keyCode == 37 || event.keyCode == 65){
        if(xVelocity == 1) return;
        yVelocity = 0;
        xVelocity = -1;
    }

    //right or d
    if(event.keyCode == 39 || event.keyCode == 68){
        if(xVelocity == -1) return;
        yVelocity = 0;
        xVelocity = 1;
    }
}
drawGame();