class Functionalities {
  // buttons
  startPauseBtn = document.querySelector("#startPause");
  reset = document.querySelector("#reset");
  split = document.querySelector("#split");
  // hr,m,s,ms elements
  hrEle = document.querySelector("#hr");
  mEle = document.querySelector("#m");
  sEle = document.querySelector("#s");
  msEle = document.querySelector("#ms");
  ////log
  logEle = document.querySelector("#log");
  logItems = 0;
  //   variables
  isStopWatchStarted = false;
  hours = 0;
  minutes = 0;
  seconds = 0;
  milis = 0;
  timer = "";

  //  startStop
  startStop() {
    // if timer is already on then stop
    if (this.isStopWatchStarted) {
      // stop the timer
      this.startPauseBtn.textContent = "START";
      this.isStopWatchStarted = false;
      this.startPauseBtn.style.backgroundColor = "rgb(8, 207, 114)";

      //  disable the split(functionality)
      this.split.disabled = true;
      this.split.className = "split";

      //  activate the reset(functionality)
      this.reset.disabled = false;
      this.reset.className = this.reset.className + " activeReset";

      clearInterval(this.timer);

      // if timer is already off then start
    } else {
      //  start the timer
      this.isStopWatchStarted = true;
      this.startPauseBtn.textContent = "PAUSE";
      this.startPauseBtn.style.backgroundColor = "pink";
      this.timer = setInterval(() => {
        this.startTimer();
      }, 10);

      //  activate the split(functionality)
      this.split.disabled = false;
      this.split.className = this.split.className + " activeSplit";

      //  deactivate the reset(functionality)
      this.reset.disabled = true;
      this.reset.className = "reset";
    }
  }

  //   handle pause
  handleReset() {
    // set logItems count to 0
    this.logItems = 0;
    // remove all the logItems element from log
    this.logEle.innerHTML = "";

    // disable split
    this.split.disabled = true;
    this.split.className = "split";
    // disable reset
    this.reset.disabled = true;
    this.reset.className = "reset";

    // cleare interver and reset the timer to 00:00:00:00
    clearInterval(this.timer);
    this.hours = this.minutes = this.seconds = this.milis = 0;
    //   a = b = c = value   , syntex formate
    this.hrEle.textContent =
      this.mEle.textContent =
      this.sEle.textContent =
        "00 :";
    this.msEle.textContent = "00";
  }

  //   startTimer
  startTimer() {
    this.milis++;
    // 1000ms == 1s
    if (this.milis > 99) {
      this.milis = 0;
      this.seconds++;
    }
    // 60s == 1m
    if (this.seconds > 59) {
      this.seconds = 0;
      this.minutes++;
    }
    // 60m == 1hr
    if (this.minutes > 59) {
      this.minutes = 0;
      this.hours++;
    }
    this.displayCountDown();
  }

  //   displayContDown
  displayCountDown() {
    const { hours, minutes, seconds, milis } = this.counterFornater();
    this.hrEle.textContent = hours + " : ";
    this.mEle.textContent = minutes + " : ";
    this.sEle.textContent = seconds + " : ";
    this.msEle.textContent = milis;
  }

  //  counterFormater
  counterFornater() {
    const hours = this.hours > 9 ? this.hours : "0" + this.hours;
    const minutes = this.minutes > 9 ? this.minutes : "0" + this.minutes;
    const seconds = this.seconds > 9 ? this.seconds : "0" + this.seconds;
    const milis = this.milis;
    return { hours, minutes, seconds, milis };
  }

  // handle split
  handleSplit() {
    // increase the logItem by 1
    const id = ++this.logItems;
    // get formated counter value fot logitems html
    const args = this.counterFornater();

    const addTimeEle = document.createElement("div");
    addTimeEle.className = "addTime";
    addTimeEle.innerHTML = this.loadSplitTimHTML(args, id);
    this.logEle.appendChild(addTimeEle);
  }

  // addTimeEle html
  loadSplitTimHTML(args, id) {
    return `  <div class="addTime">
    <span>${id}</span>
    <span>${args["hours"]} : ${args["minutes"]} : ${args["seconds"]} : ${args["milis"]}</span>
  </div>`;
  }

  initialLoad() {
    // disable the skip button and restart button
    this.reset.disabled = true;
    this.split.disabled = true;
    this.startPauseBtn.className =
      this.startPauseBtn.className + " startActive";
  }
}

const functionalities = new Functionalities();
functionalities.initialLoad();

// start-pause event listener
functionalities.startPauseBtn.addEventListener("click", () => {
  functionalities.startStop();
});

// split event listener
functionalities.split.addEventListener("click", () => {
  functionalities.handleSplit();
});

// reset event listener
functionalities.reset.addEventListener("click", () => {
  functionalities.handleReset();
});

/* working  */

/*
 whenever counter starts, split(split functionality)  get activated and reste(reset functionality) gets diactivated
 whenever counter paused, split(split functionality)  gets diactivated  and reste(reset functionality) gets activated
 on reset split(split functionality) and reste(reset functionality) gets deactivated

*/
