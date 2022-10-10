const Api = "https://api.quotable.io/random";

class Functionalities {
  generateBthEle = document.querySelector("#generateBth");
  quoteEle = document.querySelector("#quote");
  autherEle = document.querySelector("#auther");
  AutherQuoteEle = document.querySelector(".AutherQuote");
  async fetchQuote() {
    try {
      const response = await fetch(Api);
      const data = response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  appendQuote(quote) {
    this.quoteEle.textContent = quote.content;
    this.autherEle.textContent = quote.author;
  }

  loading() {
    this.quoteEle.innerHTML = `<img src="./assets/Spinner.svg"> </img>`;
    this.autherEle.textContent = "";
  }
}
const functionalities = new Functionalities();

async function initialLoad() {
  functionalities.loading();
  const quote = await functionalities.fetchQuote();
  functionalities.appendQuote(quote);
}
initialLoad();

document.addEventListener("keydown", (e) => {
  if (e.keyCode == 13) initialLoad();
});
