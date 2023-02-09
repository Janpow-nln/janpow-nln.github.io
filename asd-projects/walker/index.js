/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var KEY = {
    "ENTER": 13,
    "UP": 38,
    "LEFT": 37,
    "DOWN": 40,
    "RIGHT": 39,
    "W": 87,
    "A": 65,
    "S": 83,
    "D": 68,
  };
  var BOARD_WIDTH = $("#board").width() - $("#walker").width();
  var BOARD_HEIGHT = $("#board").height() - $("#walker").height();
  var BOARD_WIDTH2 = $("#board").width() - $("#secondWalker").width();
  var BOARD_HEIGHT2 = $("#board").height() - $("#secondWalker").height();
  var LEFT_SIDE = 0;
  var TOP_SIDE = 0
  // movement variables P1
  var positionX = 0;
  var positionY = 0;
  var speedX = 0;
  var speedY = 0; 
  // movement variables P2
  var position2X = BOARD_WIDTH2;
  var position2Y = BOARD_HEIGHT2;
  var speed2X = 0;
  var speed2Y = 0; 
  // Game Item Objects


  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);  
  $(document).on('keydown', wasdHandleKeyDown); 
  $(document).on('keyup', wasdHandleKeyup);
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameitem();
    setBoundary();
    redrawGameItem();
    redrawSecondGameItem();
    repositionSecondGameitem();
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event){
    if (event.which === KEY.UP){
      speedY = -5;
      console.log("Up pressed" + event.which);
    } else if (event.which === KEY.LEFT){
      speedX = -5;
      console.log("Left pressed" + event.which);
    } else if (event.which === KEY.DOWN){
      speedY = 5;
      console.log("Down pressed" + event.which);
    } else if (event.which === KEY.RIGHT){
      speedX = 5;
      console.log("Right pressed" + event.which);
    } 
  }
// second player 
  function wasdHandleKeyDown(event){
    if (event.which === KEY.W){
      speed2Y = -5;
      console.log("W pressed " + event.which);
    } else if (event.which === KEY.A){
      speed2X = -5;
      console.log("A pressed " + event.which);
    } else if (event.which === KEY.S){
      speed2Y = 5;
      console.log("S pressed " + event.which);
    } else if (event.which === KEY.D){
      speed2X = 5;
      console.log("D pressed " + event.which);
    } 
  }
function handleKeyUp(event){
  speedX = 0;
  speedY = 0;
}
function wasdHandleKeyup(event){
  speed2X = 0;
  speed2Y = 0;
}
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function repositionGameitem() {
    positionX += speedX;
    positionY += speedY;
    
  }
  function repositionSecondGameitem(){
    position2X += speed2X;
    position2Y += speed2Y;
  }
  function redrawGameItem() {
    $("#walker").css("left", positionX); 
    $("#walker").css('top', positionY);
  }
  function redrawSecondGameItem(){
    $("#secondWalker").css("left", position2X); 
    $("#secondWalker").css('top', position2Y);
  }
  
  function setBoundary(){
    // if the position of the walker is greater than or equal to the board width, stop walker
    if ( positionX >= BOARD_WIDTH) {
      positionX = BOARD_WIDTH;
    }
    // if the position of the walker is less than or equal to the left side, stop walker
    if ( positionX <= LEFT_SIDE ) {
      positionX = LEFT_SIDE;
    } 
    // if the position of the walker is greater than or equal to the top side, stop walker
    if (positionY <= TOP_SIDE) {
      positionY = TOP_SIDE;
    } 
    // if the position of the walker is greater than or equal to the board height, stop walker
     if (positionY >= BOARD_HEIGHT) {
      positionY = BOARD_HEIGHT;
    }
    // player 2 boundary
    // if the position2 of the walker is greater than or equal to the board width, stop walker
    if ( position2X >= BOARD_WIDTH2) {
      position2X = BOARD_WIDTH2;
    }
     // if the position2 of the walker is less than or equal to the left side, stop walker
    if ( position2X <= LEFT_SIDE ) {
      position2X = LEFT_SIDE;
    } 
    // if the position2 of the walker is greater than or equal to the top side, stop walker
    if (position2Y <= TOP_SIDE) {
      position2Y = TOP_SIDE;
    }
    // if the position of the walker is greater than or equal to the board height, stop walker
    if (position2Y >= BOARD_HEIGHT) {
      position2Y = BOARD_HEIGHT;
    }
  } 

  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
