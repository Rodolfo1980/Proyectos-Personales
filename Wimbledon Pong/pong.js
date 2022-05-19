// Select Canvas element
const canvas = document.getElementById("pong");

// getContext of canvas 
const ctx = canvas.getContext('2d');

// Sounds
let hit = new Audio();
let userScore = new Audio();
let computerScore = new Audio();

hit.src = "sounds/hit.mp3";
userScore.src = "sounds/userScore.mp3";
computerScore.src = "sounds/computerScore.mp3";

// The ball
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speed: 5,
    velocityX: 5,
    velocityY: 5,
    speed: 7,
    color: "YELLOW",
}

// User Paddle
const user = {
    x: 10,
    y: (canvas.height- 100) / 2,
    width: 15,
    height: 100,
    color: "WHITE",
    score: 0
}

// Computer Paddle
const computer = {
    x: canvas.width - 25,
    y: (canvas.height- 100) / 2,
    width: 15,
    height: 100,
    color: "WHITE",
    score: 0
}

// Create the net
const net = {
    x: (canvas.width - 2) / 2,
    y: 0,
    width: 2,   
    height: 10,
    color: "WHITE"
}

// Draw a rectangle
function drawRect(x, y, w, h, color) { 
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

// Draw circle, will be used to draw the ball
function drawArc(x, y, r, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
}

// Listening to the mouse
canvas.addEventListener("mousemove", getMoussePosition);
function getMoussePosition(evt) {
    let rect = canvas.getBoundingClientRect();
    user.y = evt.clientY - rect.top - user.height / 2;
}

// When user or computer scores, the ball will be reset
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.velocityX = -ball.velocityX;
    ball.speed = 7;
}

// Draw the net
function drawNet() {
    for (let i = 0; i < canvas.height; i += 15) {
        drawRect(net.x, net.y + i, net.width, net.height, net.color);
    }
}

// Draw Text
function drawText(text, x, y) {
    ctx.fillStyle = "#000000";
    ctx.font = "70px fantasy";
    ctx.fillText(text, x, y);
}

// Collision detection
function collision(b, p) {
    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;

    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;

    return p.left < b.right && p.top < b.bottom && p.right > b.left && p.bottom > b.top;
}

// Update function
function update() {
    // change the score
    if (ball.x - ball.radius < 0) {
        computer.score++;
        computerScore.play();
        resetBall();
    } else if (ball.x + ball.radius > canvas.width) {
        user.score++;
        userScore.play();
        resetBall();
    }
    // Ball velocity
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    // Computer AI
    computer.y += ((ball.y - (computer.y + computer.height / 2))) * 0.08;

    // The ball collides with the top and bottom walls we inverse the y velocity
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.velocityY = -ball.velocityY;
        hit.play();
    }

    // Check if the ball hits the user or the computer paddle
    let player = (ball.x + ball.radius < canvas.width / 2) ? user : computer;

    // If the ball hits a paddle
    if (collision(ball, player)) {
        // play sound
        hit.play();
        // checking where the ball hits the paddle
        let collidePoint = (ball.y - (player.y + player.height / 2));
        // normalize the value of collidePoint, we want it between -1 and 1
        collidePoint = collidePoint / (player.height / 2);
        // Angles when the ball hits the paddle
        let angleRad = (Math.PI / 4) * collidePoint;
        // change the x and y velocity direction
        let direction = (ball.x + ball.radius < canvas.width / 2) ? 1 : -1;
        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = ball.speed * Math.sin(angleRad);
        // speed up the ball everytime it hits
        ball.speed += 0.1;
    }
}

// Render the game
function render() {
    // clear the canvas
    drawRect(0, 0, canvas.width, canvas.height, "GREEN");
    // draw the user score to the left
    drawText(user.score, canvas.width / 4, canvas.height / 5, "BLACK");
    // draw the computer score to the right
    drawText(computer.score, 3 * canvas.width / 4, canvas.height / 5, "BLACK");
    // draw the net
    drawNet();
    // draw user's paddles
    drawRect(user.x, user.y, user.width, user.height, user.color);
    // draw computer's paddles
    drawRect(computer.x, computer.y, computer.width, computer.height, computer.color);
    // draw the ball
    drawArc(ball.x, ball.y, ball.radius, ball.color);
}

// Game init
function game() {
    update();
    render();
}   

// Numbers of frames per second
let framePerSecond = 50;

// Call the game function 50 times every second
let loop = setInterval(game, 1000 / framePerSecond);
