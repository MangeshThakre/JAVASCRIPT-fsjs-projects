const textBox = document.querySelector("#textBox");
const textInput = document.querySelector("#textInput");
const showLenght = document.querySelector("#showLenght");
const lengtButtons = document.querySelector("#lengtButtons");
const timerEl = document.querySelector("#timer");
let textArr = [];
let currentText = [];
let wrongLetters = 0;

// timer variables
let timer = 60;
let interval = "";

async function rendomText(lenghtArg = 100) {
  const RandomTextAPI = `https://api.quotable.io/random?minLength=${lenghtArg}&maxLength=${
    lenghtArg + 20
  }`;

  textBox.innerHTML = `<img src="./assets/loading.svg" alt="loading....." />`;
  try {
    const response = await fetch(RandomTextAPI);
    const { content: text, length: lenght } = await response.json();
    textArr = text.split("");

    let HTMLTEXT = "";
    textArr.forEach((e, i) => {
      HTMLTEXT = HTMLTEXT + `<span id=${i} >${e}</span>`;
    });

    textBox.innerHTML = `<div>${HTMLTEXT}<div>`;
    showLenght.textContent = "Lenght : " + lenght;
    SelectedLenghtButton(lenghtArg);
  } catch (error) {
    console.log(error);
    textBox.innerHTML = `<h3> Network Error </h3>`;
  }
}
rendomText();

function SelectedLenghtButton(lenght) {
  lengtButtons.childNodes.forEach((e, i) => {
    if (!e.id) return;
    e.id == lenght
      ? (e.style.backgroundColor = "#28282b")
      : (e.style.backgroundColor = "whitesmoke");
  });
  initialInputValue();
  counter();
  clearInterval(interval);
  currentText = [];
  wrongLetters = 0;
  return;
}

function wordChecker(textIndex) {
  //   console.log(textArr[textIndex], currentText[textIndex]);
  if (textArr[textIndex] === currentText[textIndex]) {
    textBox.firstElementChild.childNodes.forEach((e, i) => {
      if (e.id == textIndex) {
        e.style.color = "white";
        e.className = "pointer";
      } else {
        e.className = "";
      }
    });
  } else {
    textBox.firstElementChild.childNodes.forEach((e, i) => {
      if (e.id == textIndex) {
        e.style.textDecoration = "line-through";
        e.style.color = "#e73535";
        e.className = "pointer";
        wrongLetters++;
      } else {
        e.className = "";
      }
    });
  }
}

// counter ()
// creating clouser for counter() for one time calling function
function counter() {
  let isCounerActive = true;
  timerEl.textContent = "";

  return function () {
    if (isCounerActive == true) {
      isCounerActive = false;
      timerEl.textContent = "Remaining Time: " + "1:00";

      return (interval = setInterval(() => {
        timer--;
        timerEl.textContent = "Remaining Time: 0:" + timer;
        if (timer == 0) {
          clearInterval(interval);
        }
      }, 1000));
    } else return;
  };
}

// function netWPM() {
//   return ((currentText.length / 5 - wrongLetters) / (60 / timer)) * -100;
// }

/// input functionaity on space
let inputTextArr = [];
let lastInput = "";
let inputString = "";
const active = counter();

function textInputHandler(e) {
  inputTextArr = e.value.split("");
  lastInput = inputTextArr[inputTextArr.length - 1];

  // check if the (lenght.input value  &  lenght.display text) is same or not
  // if not same the store currentText.push(the last index value) and call wordChecker()
  // and invoke active() for first time (  note :  active()   closure    line no: 71 )
  if (textArr.length > inputTextArr.length) {
    currentText.push(lastInput);
    wordChecker(inputTextArr.lastIndexOf(lastInput));
    active(); // activate counter
  } else {
    alert(`
    total letter : ${textArr.length} 
    typed Letter : ${inputTextArr.length}
    typing Error : ${wrongLetters}
    Time Out :  ${timer == 0 ? "YES" : "NO"}
          `);
    rendomText();
  }
}

/// empty textArea filed every time when page load
function initialInputValue() {
  textInput.value = "";
  textInput.focus();
}
initialInputValue();
