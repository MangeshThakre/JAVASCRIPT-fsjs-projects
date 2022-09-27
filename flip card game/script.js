const cardContainer = document.querySelector("#cardContainer");
const info = document.querySelector("#info");
const score = document.querySelector("#score");
const cardImage = document.querySelectorAll(".cardImage");
const randomImg = [];
const randomCardArr = [];

// flip
let flipedCard = [];
let match = 0;

function randomNumber(lenght) {
  return Math.floor(Math.random() * lenght) + 1;
}

function randomCard() {
  let pushCount = 0;
  let randomImgIndexCount = 0;

  while (randomImg.length < 3) {
    const randomNo = randomNumber(10);
    !randomImg.includes(randomNo) ? randomImg.push(randomNo) : "";
  }

  function RandomCardStoreObj(i, randomImgIndexCount) {
    let j = 0;
    while (j < 1) {
      const randomCardIndex = randomNumber(4);
      if (!randomCardArr[randomCardIndex]) {
        randomCardArr[randomCardIndex] = randomImg[randomImgIndexCount];
        j++;
      }
    }
  }

  for (let i = 0; i <= 4; i++) {
    if (randomCardArr.length == 0) {
      randomCardArr.push(randomImg[0]);
      pushCount++;
    } else {
      if (pushCount == 1) {
        RandomCardStoreObj(i, randomImgIndexCount);
        pushCount = 0;
        randomImgIndexCount++;
      } else {
        RandomCardStoreObj(i, randomImgIndexCount);
        pushCount = 1;
      }
    }
  }
  return randomCardArr;
}

function loose() {
  cardContainer.childNodes.forEach((e) => {
    if (e.classList && e.classList[0] == "card") {
      e.remove();
    }
  });

  document.body.className = "dark ";
  document.body.style.backgroundColor = "#151515";

  info.style.display = "flex";
  info.firstElementChild.textContent = "Lose";
  score.remove();
  document.body.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    location.reload();
  });
}

function win() {
  cardContainer.childNodes.forEach((e) => {
    if (e.classList && e.classList[0] == "card") {
      e.remove();
    }
  });

  info.style.display = "flex";
  info.firstElementChild.textContent = "Win";
  score.remove();
  document.body.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    location.reload();
  });
}

let cardIds = [];
function flip(e) {
  if (cardIds.includes(e.id)) return;
  const newClass = e.className.split(" ");
  newClass.shift();
  e.className = newClass.join(" ");
  e.firstElementChild.style.display = "block";
  flipedCard.push(randomCardArr[e.id]);
  cardIds.push(e.id);

  //
  const isMatched = flipedCard.filter((element) => {
    return element == randomCardArr[e.id];
  });
  if (isMatched.length == 2) {
    match++;
    score.textContent = match;
  }

  if (
    flipedCard.length == 3 &&
    !flipedCard.some((e, i, arr) => arr.indexOf(e) !== i)
  ) {
    return loose();
  } else if (flipedCard.length < 4) {
    return;
  } else if (flipedCard.length >= 4 && match != 2) {
    return loose();
  } else if (match == 2) {
    return win();
  }
}

function initial() {
  document.body.className = "light";
  randomCard();
  cardImage.forEach((e, i) => {
    const src = `./assets/${randomCardArr[i]}.png`;
    e.setAttribute("src", src);
  });

  match = 0;
  flipedCard = [];
}
initial();
