var board = [
  [, , { value: 1 }, { value: 1 }, { value: 1 }, , ,],
  [, , { value: 1 }, { value: 1 }, { value: 1 }, , ,],
  [
    { value: 1 },
    { value: 1 },
    { value: 1 },
    { value: 1 },
    { value: 1 },
    { value: 1 },
    { value: 1 }
  ],
  [
    { value: 1 },
    { value: 1 },
    { value: 1 },
    { value: 0 },
    { value: 1 },
    { value: 1 },
    { value: 1 }
  ],
  [
    { value: 1 },
    { value: 1 },
    { value: 1 },
    { value: 1 },
    { value: 1 },
    { value: 1 },
    { value: 1 }
  ],
  [, , { value: 1 }, { value: 1 }, { value: 1 }, , ,],
  [, , { value: 1 }, { value: 1 }, { value: 1 }, , ,]
];

var selectedBall = { x: undefined, y: undefined };
var createId = function(rowN, colN) {
  return "ball-" + rowN + "-" + colN;
};


function ResetBoard(){
  var NewBoard = [
    [, , { value: 1 }, { value: 1 }, { value: 1 }, , ,],
    [, , { value: 1 }, { value: 1 }, { value: 1 }, , ,],
    [
      { value: 1 },
      { value: 1 },
      { value: 1 },
      { value: 1 },
      { value: 1 },
      { value: 1 },
      { value: 1 }
    ],
    [
      { value: 1 },
      { value: 1 },
      { value: 1 },
      { value: 0 },
      { value: 1 },
      { value: 1 },
      { value: 1 }
    ],
    [
      { value: 1 },
      { value: 1 },
      { value: 1 },
      { value: 1 },
      { value: 1 },
      { value: 1 },
      { value: 1 }
    ],
    [, , { value: 1 }, { value: 1 }, { value: 1 }, , ,],
    [, , { value: 1 }, { value: 1 }, { value: 1 }, , ,]
  ];
  
  var boardID = document.getElementById("board");
  boardID.innerHTML = generateBoard(NewBoard);

  var a = boardID.getElementsByTagName("button");
  addBallsEventHandlers(a);

}


 

var generateCell = function(cell, rowN, colN) {
  var html = '<button id="' + createId(rowN, colN) + '" class = "';
  if (cell && cell.value) {
    html += "ball-place";
  } else if (cell && cell.value === 0) {
    html += "ball-place-empty";
  } else {
    html += "no-ball";
  }
  html += '"></button>';
  return html;
};
var generateRow = function(row, rowN) {
  var html = '<div class="row">';
  for (let j = 0; j < row.length; j++) {
    html += generateCell(row[j], rowN, j);
  }
  html += "</div>";
  return html;
};
var generateBoard = function() {
  var html = '<div class="row">';
  for (let i = 0; i < board.length; i++) {
    //create the rows
    html += generateRow(board[i], i);
  }
  html += "</div>";
  return html;
};
var unselectedBall = function() {
  if (selectedBall.x !== undefined && selectedBall.y !== undefined) {
    var prevSelectedId = createId(selectedBall.x, selectedBall.y);
    document.getElementById(prevSelectedId).className = "ball-place";
    var suggestion = document.getElementsByClassName("suggestion");
    for (let i = 0; i < suggestion.length; i++) {
      suggestion[i].className = "ball-place-empty";
    }
  }
};
var getElement = function(id) {
  var element = document.getElementById(id);
  return element || {};
};

var showSuggestions = function() {
  var near = {
    above: getElement(createId(selectedBall.x - 1, selectedBall.y)),
    left: getElement(createId(selectedBall.x, selectedBall.y - 1)),
    right: getElement(createId(selectedBall.x, selectedBall.y + 1)),
    below: getElement(createId(selectedBall.x + 1, selectedBall.y))
  };
  var possible = {
    above: getElement(createId(selectedBall.x - 2, selectedBall.y)),
    left: getElement(createId(selectedBall.x, selectedBall.y - 2)),
    right: getElement(createId(selectedBall.x , selectedBall.y + 2)),
    below: getElement(createId(selectedBall.x + 2, selectedBall.y))
  };
  if (
    near.above.className === "ball-place" &&
    possible.above.className === "ball-place-empty"
  ) {
    possible.above.className = "suggestion";
  }
  if (
    near.left.className === "ball-place" &&
    possible.left.className === "ball-place-empty"
  ) {
    possible.left.className = "suggestion";
  }
  if (
    near.below.className === "ball-place" &&
    possible.below.className === "ball-place-empty"
  ) {
    possible.below.className = "suggestion";
  }
  if (
    near.right.className === "ball-place" &&
    possible.right.className === "ball-place-empty"
  ) {
    possible.right.className = "suggestion";
  }
};
var selectBall = function(evt) {
  var ball = evt.target;
  var idParts = ball.id && ball.id.length ? ball.id.split("-") : [];
  if (idParts.length === 3) {
    unselectedBall();
    if (
      selectedBall.x === parseInt(idParts[1]) &&
      selectedBall === parseInt(idParts[2])
    ) {
      unselectedBall();
      selectedBall.x = undefined;
      selectedBall.y = undefined;
    } else {
      selectedBall.x = parseInt(idParts[1]);
      selectedBall.y = parseInt(idParts[2]);
      ball.className = "selected";
      showSuggestions();
    }
  }
  console.log(selectBall);
};
var addBallsEventHandlers = function(ball) {
  for (let i = 0; i < ball.length; i++) {
    ball[i].onclick = selectBall;
  }
};

var init = function() {
  ResetBoard();
  const boardElement = document.getElementById("board"); // get the board
  //Asign dynamicBoard

  boardElement.innerHTML = generateBoard();
  var ball = boardElement.getElementsByClassName("ball-place");
  addBallsEventHandlers(ball);
  
  var reset = document.getElementById("Reset") 
  reset.onclick = ResetBoard();
};

window.onload = init;

