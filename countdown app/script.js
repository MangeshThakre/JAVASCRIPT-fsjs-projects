class Functionalities {
  alertEle = document.querySelector("#alert");
  alertText = document.querySelector("#alertText");
  interval = "";
  countdown = document.querySelector("#countdown");
  years = document.querySelector("#years");
  Months = document.querySelector("#Months");
  Days = document.querySelector("#Days");
  hours = document.querySelector("#hours");
  Minutes = document.querySelector("#Minutes");
  seconds = document.querySelector("#seconds");

  // submit button click
  submit(event) {
    event.preventDefault();
    clearInterval(this.interval);

    //  extract monthm date year form the input date element
    const [month, date, year] = event.target[0].value.split("/");
    // extract hour , minute form inpute time element
    const [hour, minute] = event.target[1].value.split(":");
    //  create new date using ( year , date, month,hours,minute) extracted value from inpute
    const countDownTime = new Date(
      `${year}-${month}-${date}T${hour}:${minute}:00`
    );
    // get current date
    const currentDate = new Date();

    // check if countDown date is greater then current  date if not then thwor warning else call displayTime() for  every interval of 1 second
    if (currentDate > countDownTime) return this.warningAlert();
    else {
      return (this.interval = setInterval(() => {
        this.displayTime(countDownTime, currentDate);
      }, 1000));
    }
  }

  // display Time
  displayTime(countDownTime) {
    const timeLeft = new Date(countDownTime - new Date());
    if (timeLeft < 0) {
      clearInterval(this.interval);
      this.years.textContent =
        this.Months.textContent =
        this.Days.textContent =
        this.hours.textContent =
        this.Minutes.textContent =
        this.seconds.textContent =
          0;
    }

    const years = timeLeft.getUTCFullYear() - 1970;
    const months = timeLeft.getUTCMonth();
    const days = timeLeft.getUTCDate() - 1;
    const hours = timeLeft.getUTCHours();
    const minutes = timeLeft.getUTCMinutes();
    const seconds = timeLeft.getUTCSeconds();

    this.years.textContent = years;
    this.Months.textContent = months;
    this.Days.textContent = days;
    this.hours.textContent = hours;
    this.Minutes.textContent = minutes;
    this.seconds.textContent = seconds;
  }

  warningAlert() {
    this.alertEle.style.display = "block";
    this.alertText.textContent =
      "countdown time should be greater then current time";
    setTimeout(() => {
      this.alertEle.style.display = "none";
    }, 3000);
  }
}
const functionalities = new Functionalities();
