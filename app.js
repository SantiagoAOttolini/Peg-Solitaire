const initialState = [
  [undefined, undefined, 1, 1, 1, undefined, undefined],
  [undefined, undefined, 1, 1, 1, undefined, undefined],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 0, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [undefined, undefined, 1, 1, 1, undefined, undefined],
  [undefined, undefined, 1, 1, 1, undefined, undefined]
];

let dynamicBoard = "<ul>";

for (let i = 0; i < initialState.length; i++) {
  // recorremos el array
  dynamicBoard += "<li>";
  for (let j = 0; j < initialState[i].length; j++) {
    dynamicBoard += "<button></button>";
  }
  dynamicBoard += "</li>";
}
dynamicBoard += "</ul>";

window.onload = function() {
  const boardElement = document.getElementById("board"); // obtenemos el board

  //Asignamos dynamicBoard

  boardElement.innerHTML = dynamicBoard;
};
