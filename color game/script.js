class Functionalities {
  card = document.querySelector("#card");
  emojiArr = document.querySelectorAll(".emoji");
  isRetry = false;
  retry = document.querySelector("#retry");
  buttonsEle = document.querySelector("#buttons");

  randomColor() {
    const colors = [
      "red",
      "orange",
      "yellow",
      "green",
      "blue",
      "indigo",
      "violet",
    ];
    const index = Math.floor(Math.random() * 7);
    console.log(index == 7);
    return colors[index];
  }

  handleClick(color) {
    if (this.isRetry) return;
    this.isRetry = true;
    const cardColor = this.randomColor();
    this.card.style.backgroundColor = cardColor;

    if (cardColor != color) {
      this.emojiArr[0].textContent = this.emojiArr[1].textContent = "❌❌";
    } else {
      this.emojiArr[0].textContent = this.emojiArr[1].textContent = "🎉🎉";
    }
    this.retry.style.display = "block";
    this.buttonsEle.style.display = "none";
  }

  handleretry() {
    this.isRetry = false;
    this.retry.style.display = "none";
    this.buttonsEle.style.display = "block";
    this.card.style.backgroundColor = "#1f2937";
    this.emojiArr[0].textContent = this.emojiArr[1].textContent = "";
  }
}

const functionalities = new Functionalities();
