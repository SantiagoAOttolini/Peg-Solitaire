//#region Global variables
var board = [
  [
    undefined,
    undefined,
    { value: 1 },
    { value: 1 },
    { value: 1 },
    undefined,
    undefined
  ],
  [
    undefined,
    undefined,
    { value: 1 },
    { value: 1 },
    { value: 1 },
    undefined,
    undefined
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
  [
    undefined,
    undefined,
    { value: 1 },
    { value: 1 },
    { value: 1 },
    undefined,
    undefined
  ],
  [
    undefined,
    undefined,
    { value: 1 },
    { value: 1 },
    { value: 1 },
    undefined,
    undefined
  ]
];
var piece = 32;
var score = 0;
//Functional of the game
var selectedBall = { x: undefined, y: undefined };
var suggestions = [];
//#endregion
//#region Functions
//Create an id for a peg
//Ej: ball-5-6, position in the row is 5 and position in the column is 6
var createId = function(rowN, colN) {
  return "ball-" + rowN + "-" + colN;
};
//Get the position of the peg
var getPositionFromId = function(id) {
  var idParts = id && id.length ? id.split("-") : [];
  if (idParts.length === 3) {
    return {
      x: parseInt(idParts[1]),
      y: parseInt(idParts[2])
    };
  }
  return {};
};
//Return a specify element
var getElement = function(id) {
  var element = document.getElementById(id);
  return element || {};
};
//#endregion
//#region Create row, cell, col
//cell is the ball
//collN is the position of the column
//Generate all of the cells in one row
var generateCell = function(cell, rowN, colN) {
  //id = location of the peg
  var html = '<button id="' + createId(rowN, colN) + '" class = "';
  if (cell && cell.value) {
    html += "ball-place";
  } else if (cell && cell.value == 0) {
    html += "ball-place-empty";
  } else {
    html += "no-ball";
  }
  html += '"></button>';
  return html;
};
//row is all array
//rowN is the position of the row
//Generate the row
var generateRow = function(row, rowN) {
  var html = '<div class="row">';
  for (let j = 0; j < row.length; j++) {
    html += generateCell(row[j], rowN, j);
  }
  html += "</div>";
  return html;
};

//Generate all the rows for the game
var generateBoard = function() {
  var html = '<div class="row">';
  for (let i = 0; i < board.length; i++) {
    //create the rows
    html += generateRow(board[i], i);
  }
  html += "</div>";
  return html;
};
//#endregion
//#region Actions
//Remove selection of the peg
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
var selectBall = function(evt) {
  suggestions = [];
  var ball = evt.target;
  var pos = getPositionFromId(ball.id);
  if (pos.x !== undefined && pos.y !== undefined) {
    unselectedBall();
    if (
      selectedBall.x === parseInt(pos.x) &&
      selectedBall === parseInt(pos.y)
    ) {
      unselectedBall();
      selectedBall.x = undefined;
      selectedBall.y = undefined;
    } else {
      selectedBall.x = parseInt(pos.x);
      selectedBall.y = parseInt(pos.y);
      ball.className = "selected";
      showSuggestions();
    }
  }
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
    right: getElement(createId(selectedBall.x, selectedBall.y + 2)),
    below: getElement(createId(selectedBall.x + 2, selectedBall.y))
  };
  if (
    near.above.className === "ball-place" &&
    possible.above.className === "ball-place-empty"
  ) {
    possible.above.className = "suggestion";
    suggestions.push(possible.above.id);
  }
  if (
    near.left.className === "ball-place" &&
    possible.left.className === "ball-place-empty"
  ) {
    possible.left.className = "suggestion";
    suggestions.push(possible.left.id);
  }
  if (
    near.below.className === "ball-place" &&
    possible.below.className === "ball-place-empty"
  ) {
    possible.below.className = "suggestion";
    suggestions.push(possible.below.id);
  }
  if (
    near.right.className === "ball-place" &&
    possible.right.className === "ball-place-empty"
  ) {
    possible.right.className = "suggestion";
    suggestions.push(possible.right.id);
  }
};
//#region AllSugestion for popup
var getNearBall = function(x, y) {
  var near = {
    above: getElement(createId(x - 1, y)),
    left: getElement(createId(x, y - 1)),
    right: getElement(createId(x, y + 1)),
    below: getElement(createId(x + 1, y))
  };
  return near;
};

var getPossibleBall = function(x, y) {
  var possible = {
    above: getElement(createId(x - 2, y)),
    left: getElement(createId(x, y - 2)),
    right: getElement(createId(x, y + 2)),
    below: getElement(createId(x + 2, y))
  };
  return possible;
};
var allSuggestions = [];
var checkResult = function() {
  var balls = document.getElementsByClassName("ball-place");
  allSuggestions = [];
  for (i = 0; i < balls.length; i++) {
    var pos = getPositionFromId(balls[i].id);
    if (pos.x !== undefined && pos.y !== undefined) {
      var near = getNearBall(pos.x, pos.y);
      var possible = getPossibleBall(pos.x, pos.y);
      if (
        near.above.className === "ball-place" &&
        possible.above.className === "ball-place-empty"
      ) {
        allSuggestions.push(possible.above.id);
      }
      if (
        near.left.className === "ball-place" &&
        possible.left.className === "ball-place-empty"
      ) {
        allSuggestions.push(possible.left.id);
      }
      if (
        near.right.className === "ball-place" &&
        possible.right.className === "ball-place-empty"
      ) {
        allSuggestions.push(possible.right.id);
      }
      if (
        near.below.className === "ball-place" &&
        possible.below.className === "ball-place-empty"
      ) {
        allSuggestions.push(possible.below.id);
      }
    }
  }
  if (allSuggestions.length === 0) {
    return true;
  } else {
    return false;
  }
};
//#endregion
var moveBall = function(evt) {
  var id = evt.target.id; //Target is the element that we clicked on
  var pos = getPositionFromId(id);
  if (pos.x !== undefined && pos.y !== undefined) {
    if (suggestions.includes(id)) {
      var oldRow = selectedBall.x;
      var oldCol = selectedBall.y;
      var newRow = pos.x;
      var newCol = pos.y;
      var midRow = oldRow + (newRow - oldRow) / 2;
      var midCol = oldCol + (newCol - oldCol) / 2;
      board[oldRow][oldCol] = { value: 0 };
      board[midRow][midCol] = { value: 0 };
      board[newRow][newCol] = { value: 1 };
      selectedBall = { x: undefined, y: undefined };
      suggestions = [];

      piece -= 1;
      score += 10;
      init();
    }
  }
  console.log(allSuggestions);
  if (checkResult()) {
    if (score == 310) {
      var popup = document.getElementById("win");
      if (popup.className == "popup-inactive") {
        popup.className = "popup-active";
        showRankingDiv(true, "You score" + "" + score);
      }
    } else {
      var popup = document.getElementById("loose");
      if (popup.className == "popup-inactive") {
        popup.className = "popup-active";
        showRankingDiv(true, "You score" + "" + score);
      }
    }
  }
};

//Reset the board
var ResetBoard = function() {
  board = [
    [
      undefined,
      undefined,
      { value: 1 },
      { value: 1 },
      { value: 1 },
      undefined,
      undefined
    ],
    [
      undefined,
      undefined,
      { value: 1 },
      { value: 1 },
      { value: 1 },
      undefined,
      undefined
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
    [
      undefined,
      undefined,
      { value: 1 },
      { value: 1 },
      { value: 1 },
      undefined,
      undefined
    ],
    [
      undefined,
      undefined,
      { value: 1 },
      { value: 1 },
      { value: 1 },
      undefined,
      undefined
    ]
  ];
  piece = 32;
  score = 0;
  selectedBall = { x: undefined, y: undefined };
  suggestions = [];
  var popup = document.getElementById("loose");
  if (popup.className == "popup-active") {
    popup.className = "popup-inactive";
  }
  var popup = document.getElementById("win");
  if (popup.className == "popup-active") {
    popup.className = "popup-inactive";
  }
  init();
};

//Save
var set = function() {
  // Local storage can't save the array so have tranform the array to string
  // string that represent the board
  localStorage.setItem("SaveBoard", JSON.stringify(board));
  localStorage.setItem("SavePieces", JSON.stringify(piece));
  localStorage.setItem("SaveScore", JSON.stringify(score));
  init();
};

//Load
var get = function() {
  board = JSON.parse(localStorage.getItem("SaveBoard"));
  piece = JSON.parse(localStorage.getItem("SavePieces"));
  score = JSON.parse(localStorage.getItem("SaveScore"));

  init();
};

//#endregion
//#region Handlers
var addBallsEventHandlers = function(ball) {
  for (let i = 0; i < ball.length; i++) {
    ball[i].onclick = selectBall;
  }
};
var addBallsPlaceEmptyEventHandlers = function(ballPlaceEmpty) {
  for (let i = 0; i < ballPlaceEmpty.length; i++) {
    ballPlaceEmpty[i].onclick = moveBall;
  }
};
//#endregion
//#region Menu
function showMenu() {
  if (document.getElementById("button-show").onclick) {
    document.getElementById("sidebar").style.visibility = "unset";
  }
}
function closeMenu() {
  if (document.getElementById("button-close").onclick) {
    document.getElementById("sidebar").style.visibility = "hidden";
  }
}
//#endregion
//#region INIT
//Initialize game
var init = function() {
  // get the board
  var boardElement = document.getElementById("board");
  //Asign dynamicBoard
  boardElement.innerHTML = generateBoard();

  var ball = boardElement.getElementsByClassName("ball-place");
  addBallsEventHandlers(ball);

  var ballPlaceEmpty = boardElement.getElementsByClassName("ball-place-empty");
  addBallsPlaceEmptyEventHandlers(ballPlaceEmpty);

  //Text content for show the score and pieces
  document.getElementById("piece").textContent = "Piece:" + " " + piece;
  document.getElementById("score").textContent = "Score:" + " " + score;
  document.getElementById("reset").onclick = ResetBoard;
  document.getElementById("load").onclick = get;
  document.getElementById("button-close").onclick = closeMenu;
  document.getElementById("button-show").onclick = showMenu;
  document.getElementById("save-game").onclick = set;
  document.getElementById("reset");
  
};
window.onload = init;
//#endregion
