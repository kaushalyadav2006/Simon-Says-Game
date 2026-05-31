let gameSeq = [];
let userSeq = [];

let btns = ["red", "yellow", "green", "blue"];
let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
  if (!started) {
    console.log("game is started");
    started = true;
    levelUp();
  }
});

function gameFlash(btn) {
  btn.classList.add("flash");

  setTimeout(function () {
    btn.classList.remove("flash");
  }, 350);
}

function userFlash(btn) {
  btn.classList.add("userFlash");

  setTimeout(function () {
    btn.classList.remove("userFlash");
  }, 350);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * btns.length);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);
  //   console.log(randIdx);
  //   console.log(randColor);
  //   console.log(randBtn);
  gameSeq.push(randColor);
  console.log(gameSeq);
  gameFlash(randBtn);
}
function checkAns(idx) {
  //   console.log("curr level : ", level);
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(function () {
        levelUp();
      }, 1000);
    }
  } else {
    h2.innerText = `Game Over! Press any key to start `;
    document.querySelector("body").style.backgroundColor = "#b5838d";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "#f2f3f8";
    }, 1000);
    reset();
  }
}

function btnPress() {
  //   console.log(this);
  let btn = this;
  //   gameFlash(btn);
  userFlash(btn);

  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);
  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");

for (let btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  // clear state immediately
  h2.innerHTML = `🥲Game Over! <b>Your Score was ${level - 1} 💪<b/> <br> <br> 👨‍💻Press any key to restart the Game...`;
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;

  // restart automatically after 2 seconds
}
