const canvas = document.getElementById('pongCanvas');
  if (
    ball.x - BALL_RADIUS <= PLAYER_X + PADDLE_WIDTH &&
    ball.y + BALL_RADIUS >= playerY &&
    ball.y - BALL_RADIUS <= playerY + PADDLE_HEIGHT
  ) {
    ball.x = PLAYER_X + PADDLE_WIDTH + BALL_RADIUS;
    ball.vx = Math.abs(ball.vx);
    // Add some "spin" based on collision position
    let collidePoint = ball.y - (playerY + PADDLE_HEIGHT / 2);
    ball.vy += collidePoint * 0.04;
  }

  // AI paddle collision
  if (
    ball.x + BALL_RADIUS >= AI_X &&
    ball.y + BALL_RADIUS >= aiY &&
    ball.y - BALL_RADIUS <= aiY + PADDLE_HEIGHT
  ) {
    ball.x = AI_X - BALL_RADIUS;
    ball.vx = -Math.abs(ball.vx);
    let collidePoint = ball.y - (aiY + PADDLE_HEIGHT / 2);
    ball.vy += collidePoint * 0.04;
  }

  // Score for player
  if (ball.x + BALL_RADIUS < 0) {
    aiScore++;
    resetBall();
  }
  // Score for AI
  if (ball.x - BALL_RADIUS > canvas.width) {
    playerScore++;
    resetBall();
  }

  // AI paddle movement
  let aiCenter = aiY + PADDLE_HEIGHT / 2;
  if (aiCenter < ball.y - 10) {
    aiY += AI_SPEED;
  } else if (aiCenter > ball.y + 10) {
    aiY -= AI_SPEED;
  }
  // Clamp AI paddle
  aiY = Math.max(0, Math.min(canvas.height - PADDLE_HEIGHT, aiY));
   

// Reset ball to center
function resetBall() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  // Randomize direction
  ball.vx = 5 * (Math.random() > 0.5 ? 1 : -1);
  ball.vy = 3 * (Math.random() > 0.5 ? 1 : -1);
}

// Main game loop
function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

// Start game
gameLoop();