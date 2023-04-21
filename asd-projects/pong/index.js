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
  let leftPaddle = GameComponent("#leftpaddle");
  let rightPaddle = GameComponent("#rightpaddle");
  let ball = GameComponent("#ball");

  const BOARD_WIDTH = $("#board").width();
  const BOARD_HEIGHT = $("#board").height();

  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);
  startBall();

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */

  function newFrame() {
    moveObject(leftPaddle);
    // moveObject(rightPaddle);
    // moveObject(ball);
  }


  /* 
  Called in response to events.
  */

  function handleKeyDown(event) {
    if (event.which === KEY.UP) {
      leftPaddle.speedY = -5;
      console.log("Up pressed " + event.which);
    } else if (event.which === KEY.DOWN) {
      leftPaddle.speedY = 5;
      console.log("Down pressed " + event.which);
    }
    if (event.which === KEY.W) {
      rightPaddle.speedY = -5;
      console.log("W pressed " + event.which);
    } else if (event.which === KEY.S) {
      rightPaddle.speedY = 5;
      console.log("S pressed " + event.which);
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
    gameComponentInstance.x = parseFloat($(id).css('left')); // add key: x value: use parseFloat to get the num of left position
    gameComponentInstance.y = parseFloat($(id).css('top')); // add key: y value: use parseFloat to get the num of top position
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
    ball.speedY = (Math.random() * 6 + 4) * (Math.random() > 0.5 ? -1 : 1); // use Math.random to give the ball a random speed on y axis
  }

  function moveObject(gameComponent) {
    gameComponent.y = parseFloat(gameComponent.y) + gameComponent.speedY;
    $(gameComponent.id).css("top", gameComponent.y); // to reposition the game item up / down
    gameComponent.x = parseFloat(gameComponent.x) + gameComponent.speedX;
    $(gameComponent.id).css("left", gameComponent.x); // to reposition the game item left / right
    console.log(gameComponent.y);
  }

  function wallCollision(gameComponent) {

  }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }

}
