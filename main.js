const mainSpace = 10;
const size = 80;

let main = document.querySelector(".container");
let result = document.querySelector(".result");
let values = [];
let boxNumber = 0;
let divider = 0;
let blank = [];
let moves = 0;

function createValues() {
  values = Array.from("123456789");
  values.push("10");
  values.push("11");
  values.push("12");
  values.push("13");
  values.push("14");
  values.push("15");
  boxNumber = values.length + 1;
  divider = boxNumber / Math.sqrt(boxNumber);
  blank = [divider - 1, divider - 1];
}
function createBoxs() {
  createValues();
  for (let i = 0; i < divider; i++) {
    for (let j = 0; j < divider; j++) {
      if (i != blank[0] || j != blank[1]) {
        let box = document.createElement("div");
        box.className = "box";
        let index = Math.floor(Math.random() * values.length);
        box.textContent = `${values[index]}`;
        box.setAttribute("row", i);
        box.setAttribute("col", j);
        box.setAttribute("value", values[index]);
        values.splice(index, 1);
        box.style.top = `${mainSpace * (i + 1) + size * i}px`;
        box.style.left = `${mainSpace * (j + 1) + size * j}px`;
        main.appendChild(box);
      }
    }
  }
}

document.addEventListener("click", function (e) {
  if (e.target.className.search("box") != -1) {
    ++moves;
    let r = parseInt(e.target.getAttribute("row"));
    let c = parseInt(e.target.getAttribute("col"));
    if (r == blank[0] || c == blank[1]) {
      if (Math.abs(r - blank[0]) == 1 || Math.abs(c - blank[1]) == 1) {
        moveBox(e.target);
        blank[0] = r;
        blank[1] = c;
        isCorrectPostion();
        result.textContent = `your moves : ${moves} move`;
      } else {
        unMoveBox(e.target);
      }
    } else {
      unMoveBox(e.target);
    }
  }
});

function unMoveBox(box) {
  box.classList.add("cant-move");
  setTimeout(() => {
    box.classList.remove("cant-move");
  }, 300);
}

function moveBox(box) {
  box.setAttribute("row", blank[0]);
  box.setAttribute("col", blank[1]);
  box.style.top = `${mainSpace * (blank[0] + 1) + size * blank[0]}px`;
  box.style.left = `${mainSpace * (blank[1] + 1) + size * blank[1]}px`;
}

function isCorrectPostion() {
  let divs = Array.from(main.children);

  let inpos = divs.filter((div) => {
    let i = div.getAttribute("value");
    let row = Math.abs(parseInt(i / divider - 0.25));
    let divd = i / divider;
    let conv = (divd - parseInt(divd)) * divider - 1;
    let col = 0;
    if (conv == -1) {
      col = divider - 1;
    } else {
      col = conv;
    }

    let r = div.getAttribute("row");
    let c = div.getAttribute("col");
    if (row == r && col == c) {
      div.classList.add("in-post");
    } else {
      div.classList.remove("in-post");
    }

    return row == r && col == c;
  });

  if (inpos.length == divs.length) {
    divs.forEach((div) => {
      div.classList.add("final");
    });
    result.innerHTML = `Game Won<br>you need ${moves} move to win`;
    let but = document.querySelector("button");
    but.style.display = "block";

    but.onclick = function () {
      but.style.display = "none";
      divs.forEach((div) => {
        div.remove();
      });
      createBoxs();
    };
  }
}

createBoxs();
