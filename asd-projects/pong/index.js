/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var KEY = {
    "UP": 38,
    "DOWN": 40,
    "W": 87,
    "S": 83,
  };


  // Game Item Objects
  let leftPaddle = GameComponent("#leftPaddle");
  let rightPaddle = GameComponent("#rightPaddle");
  let ball = GameComponent("#ball");
  let rightScore = 0;
  let leftScore = 0;


  const BOARD_WIDTH = $("#board").width() - $("ball").width();
  const BOARD_HEIGHT = $("#board").height() - $("ball").height();
  const LEFT_SIDE = 0;
  const TOP_SIDE = 0;


  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);
  startBall();
  let updateScore = 0;



  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */

  function newFrame() {
    moveObject(leftPaddle);
    moveObject(rightPaddle);
    moveObject(ball);
    wallColliosn(ball);
    wallColliosn(rightPaddle);
    wallColliosn(leftPaddle);
    hitBall(ball, leftPaddle);
    hitBall(ball, rightPaddle);
    stopBall();

  }

  /* 
   Called in response to events.
   */

  function handleKeyDown(event) {
    if (event.which === KEY.UP) {
      leftPaddle.speedY = -5;
    } else if (event.which === KEY.DOWN) {
      leftPaddle.speedY = 5;
    }
    if (event.which === KEY.W) {
      rightPaddle.speedY = -5;
    } else if (event.which === KEY.S) {
      rightPaddle.speedY = 5;
    }
  }

  function handleKeyUp(event) {
    rightPaddle.speedY = 0;
    leftPaddle.speedY = 0;
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function GameComponent(id) {
    var gameComponentInstance = {}; // creating an emtpy object 
    gameComponentInstance.id = id; // add key: id and value: id to the object
    gameComponentInstance.x = Number($(id).css('left').replace(/[^-\d\.]/g, '')); // add key: x value: use parseFloat to get the num of left position
    gameComponentInstance.y = Number($(id).css('top').replace(/[^-\d\.]/g, '')); // add key: y value: use parseFloat to get the num of top position
    gameComponentInstance.width = $(id).width(); // add key: width value: getting width from css
    gameComponentInstance.height = $(id).height(); // add key: height value: getting height from css
    gameComponentInstance.speedX = 0; // add key: speedX value: 0 starting value 
    gameComponentInstance.speedY = 0;  // add key: speedY value: 0 starting value 
    return gameComponentInstance;
  }

  function startBall() {
    // $("#ball").css("left", BOARD_WIDTH/2); // gives ball a starting position 
    // $("#ball").css("top", BOARD_HEIGHT/2); // gives ball a starting position
    ball.x = BOARD_WIDTH / 2;
    ball.y = BOARD_HEIGHT / 2;
    ball.speedX = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1); // use Math.random to give the ball a random speed on x axis
    ball.speedY = (Math.random() * 3 + 2) * (Math.random() > 0.5 ? -1 : 1); // use Math.random to give the ball a random speed on y axis
    $("#endGame").hide();
  }

  function stopBall() {
    if (updateScore === 5) {
      ball.x = BOARD_WIDTH / 2;
      ball.y = BOARD_HEIGHT / 2;
      $("#endGame").show();
      console.log(rightScore);
      if (rightScore === 5) {
        $("#gameOver").text("Right Player Wins!");
      } else if (leftScore === 5) {
        $("#gameOver").text("Left Player Wins!");
      }
    }
  }

  function moveObject(gameComponent) {
    gameComponent.y = parseFloat(gameComponent.y) + gameComponent.speedY;
    $(gameComponent.id).css("top", gameComponent.y); // to reposition the game item up / down
    gameComponent.x = parseFloat(gameComponent.x) + gameComponent.speedX;
    $(gameComponent.id).css("left", gameComponent.x); // to reposition the game item left / right
  }

  function wallColliosn(detection) {
    // ex. if the ball goes passed the the right side of the board set ball to the middle 
    // if the ball passes the right paddle the left player scores a poin tt then rest the ball 
    if (detection.x >= BOARD_WIDTH - $(detection.id).width()) {
      if (detection.x === ball.x) {
        increaseScore("#leftScore");
      }
    }
    if (detection.y >= BOARD_HEIGHT - $(detection.id).height()) {
      detection.speedY = (Math.random() * 6 + 4) * (Math.random() > -0.5 ? -1 : 1);
    }
    if (detection.y <= TOP_SIDE) {
      detection.speedY = (Math.random() * 6 - 4) * (Math.random() > -0.5 ? -1 : 1);
    }
    // if the ball passes the left paddle the right player scores a point then rest the ball
    if (detection.x <= LEFT_SIDE) {
      if (detection.x === ball.x) {
        increaseScore("#rightScore");
      }
    }
  }

  function increaseScore(id) {
    if (id === "#leftScore") {
      updateScore += 1;
      leftScore = updateScore;
    } else if (id === "#rightScore") {
      updateScore += 1;
      rightScore = updateScore;
    }
    $(id).text(updateScore);
    startBall()
  }
  // passBall function will pass the ball if the ball collide with one of the paddles then sents the ball in the opposite direction
  function hitBall(ballItem, paddle) {
    if (doCollide(ballItem, paddle)) {
      if (ball.x >= LEFT_SIDE) {
        ball.speedX = -ball.speedX;
      }

    }
  }

  function doCollide(ball, paddle) {
    // sides of the square1
    ball.leftX = ball.x;
    ball.topY = ball.y;
    ball.rightX = ball.x + ball.width;
    ball.bottomY = ball.y + ball.height;
    // TODO: Do the same for square2
    paddle.leftX = paddle.x;
    paddle.topY = paddle.y;
    paddle.rightX = paddle.x + paddle.width;
    paddle.bottomY = paddle.y + paddle.height;
    if (ball.rightX > paddle.leftX &&
      ball.leftX < paddle.rightX &&
      ball.bottomY > paddle.topY &&
      ball.topY < paddle.bottomY) {
      return true;
    }
    else {
      return false;
    }
  }


  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
}



