let row = 6;
let col = 6;
const initgrid = () => {
  row = 6;
  col = 6;
  let grid = document.getElementById("grid");
  for (let i = 0; i < row; i++) {
    let rowel = document.createElement("div");
    rowel.setAttribute("id", "row");
    rowel.classList.add("row");
    for (let j = 0; j < col; j++) {
      let colel = document.createElement("div");
      colel.setAttribute("id", `${i}${j}`);
      colel.classList.add("colm");
      colel.setAttribute("selected", false);
      let id = `${i}${j}`;
      colel.addEventListener("click", () => {
        handelclick(`${i}`, `${j}`);
      });
      rowel.appendChild(colel);
    }
    grid.appendChild(rowel);
  }
};

let grid = [];

const addcell = () => {
  let arr = [];
  for (let j = 0; j < col; j++) {
    let obj = [];
    obj.value = Math.ceil(Math.random() * 9);
    obj.selected = false;
    arr.push(obj);
  }
  grid.unshift(arr);
};

const updateBoard = () => {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      let col = document.getElementById(`${i}${j}`);
      if (grid[i][j].selected === true) {
        col.classList.add("selected");
      } else if (col.classList.contains("selected")) {
        col.classList.remove("selected");
      }
      col.innerHTML = grid[i][j].value;
    }
  }
};

const gameOver = () => {
  if (grid.length !== row) {
    return false;
  }

  //console.log("in GameOver to check");
  for (let i = 0; i < row; i++) {
    if (grid[row - 1][i].value !== "") {
      deselectAllSelected();
      // document.getElementById("try_btn").classList.remove("hide"); // enable try btn
      return true;
    }
  }

  //console.log("Poping empty row");
  grid.pop();
  colm -= 1;

  return false;
};

let startTimer = () => {
  let id = setInterval(() => {
    addcell();

    updateBoard();

    setTimeout(() => {
      if (gameOver()) {
        alert("Game is over");
        clearInterval(id);
        //startNewGame();
        //initBoard();
        return;
      }
    }, 100);
  }, 5000);
};
startTimer();

const deselectAllSelected = () => {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j].selected = false;
    }
  }
};

const removeAllselectedElement = () => {
  let count = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j].selected) {
        count++;
        grid[i][j].value = "";
        grid[i][j].selected = false;
      }
    }
  }
  return count;
};

let target = document.getElementById("target");
let targetvalue = Math.ceil(Math.random() * 60);
target.innerHTML = targetvalue;

let addsum = document.getElementById("count");
let targetsum = 0;
let score = 0;

let scorevalue = document.getElementById("scorevalue");

const handelclick = (i, j) => {
  let colid = document.getElementById(`${i}${j}`);
  let value = grid[i][j].value;
  grid[i][j].selected = !grid[i][j].selected;

  if (grid[i][j].selected) {
    targetsum += value;
  } else {
    targetsum -= value;
  }

  addsum.innerHTML = targetsum;

  if (targetsum > targetvalue) {
    targetsum = 0;
    addsum.innerHTML = targetsum;
    deselectAllSelected();
  }

  if (targetvalue === targetsum) {
    targetsum = 0;
    targetvalue = Math.ceil(Math.random() * 60);
    target.innerHTML = targetvalue;
    let noOfremovedEl = removeAllselectedElement();
    score += noOfremovedEl;
    scorevalue.innerHTML = score;
  }

  let col = document.getElementById(`${i}${j}`);

  if (grid[i][j].selected === true) {
    col.classList.add("selected");
  } else if (col.classList.contains("selected")) {
    col.classList.remove("selected");
  }
};

initgrid();
