const bird = document.getElementById("bird");
const pipeTop = document.getElementById("pipe-top");
const pipeBottom = document.getElementById("pipe-bottom");
const message = document.getElementById("message");

let birdY = 200;
let gravity = 0.6;   // sedang
let jump = -7;       // sedang
let velocity = 0;

let pipeX = 400;
let gap = 130;
let started = false;

function resetPipe() {
  pipeX = 400;
  const pipeHeight = Math.floor(Math.random() * 160) + 60;
  pipeTop.style.height = pipeHeight + "px";
  pipeBottom.style.height = (400 - pipeHeight - gap) + "px";
}

function gameLoop() {
  if (started) {
    velocity += gravity;
    velocity = Math.min(velocity, 7);
    birdY += velocity;

    pipeX -= 2;

    if (pipeX < -60) resetPipe();

    pipeTop.style.right = (400 - pipeX) + "px";
    pipeBottom.style.right = (400 - pipeX) + "px";

    if (
      birdY > 470 || birdY < 0 ||
      (pipeX < 80 && pipeX > 20 &&
       (birdY < parseInt(pipeTop.style.height) ||
        birdY + 30 > 500 - parseInt(pipeBottom.style.height)))
    ) {
      alert("Game Over!");
      location.reload();
    }

    bird.style.top = birdY + "px";
  } else {
    bird.style.top = birdY + "px";
  }

  requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", () => {
  if (!started) {
    started = true;
    message.style.display = "none";
    resetPipe();
  }
  velocity = jump;
});

gameLoop();
