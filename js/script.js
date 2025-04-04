//  variable Initialize here
let direction = { x: 0, y: 0 }
const foodSound = new Audio('../music/food.mp3');
const gameOverSound = new Audio('../music/gameover.mp3')
const moveSound = new Audio('../music/move.mp3')
const musicSound = new Audio('../music/music.mp3')
let speed = 5;
accurateSpeed.innerHTML = "Speed : " + speed

let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
]

food = { x: 6, y: 7 }

// manage speed
increment.addEventListener('click', () => {
    if (speed > 0) {
        speed -= 1;
        accurateSpeed.innerHTML = "Speed : " + speed
    }else{
        return;
    }

    // console.log(speed)
})
decrement.addEventListener('click', () => {
    speed += 1;
    accurateSpeed.innerHTML = "Speed : " + speed
})
const board = document.getElementById('board')
const scores = document.getElementById('score')
/// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;

    gameEngine()
    // console.log(ctime)
}

function gameEngine() {
    // updating snake variable in arrays form & food
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        direction = { x: 0, y: 0 }
        alert(" Game over. press any key and play again")
        snakeArr = [
            { x: 13, y: 15 }
        ]
        musicSound.play();
        score = 0;
    }
    // function isCollide
    function isCollide(snake) {
        // if you pump yourself
        for (let i = 1; i < snakeArr.length; i++) {
            if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
                return true;

            }

        }
        // collision of bump in the wall
        if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
            return true

        }

    }
    // if you have eaten the food, increment score and regenerate food again
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score += 1;
        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem("highScore", JSON.stringify(hiscoreval))
            highScoreBox.innerHTML = "High Score : " + hiscoreval


        }
        scores.innerHTML = "Score : " + score
        snakeArr.unshift({ x: snakeArr[0].x + direction.x, y: snakeArr[0].y + direction.y });
        let a = 2
        let b = 16
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] }
    }
    snakeArr[0].x += direction.x
    snakeArr[0].y += direction.y

    // render the snake and eat food

    // display snake here
    board.innerHTML = ""
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head')
        } else {
            snakeElement.classList.add('snake')

        }
        board.appendChild(snakeElement)
    });
    // display food 
    foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement)
}

// main logic here
let hiscore = localStorage.getItem("hiscore")
if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem("highScore", JSON.stringify(hiscoreval))
} else {
    hiscoreval = JSON.parse(hiscore)
    highScoreBox.innerHTML = "High Score : " + hiscore
}
window.requestAnimationFrame(main)
window.addEventListener('keydown', e => {
    direction = { x: 0, y: 1 }// start the game here
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            // console.log("ArrowUp")
            direction.x = 0;
            direction.y = -1;

            break;
        case "ArrowDown":
            // console.log("ArrowDown")
            direction.x = 0;
            direction.y = 1;

            break;
        case "ArrowLeft":
            // console.log("ArrowLeft")
            direction.x = -1;
            direction.y = 0;

            break;
        case "ArrowRight":
            // console.log("ArrowRight")
            direction.x = 1;
            direction.y = 0;

            break;
        default:
            break;
    }
    // console.log(e)
})