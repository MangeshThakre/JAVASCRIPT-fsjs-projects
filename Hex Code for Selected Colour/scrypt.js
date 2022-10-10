const colorBoxContainer = document.querySelector(".colorBoxContainer");
const alertEle = document.querySelector("#alert");
// sessionStorage.removeItem("colorArr");

const loadMore = document.querySelector("#loadMore");

function initialLoad() {
  const { paletteTitle, colors } = data;
  colors.slice(3000, 4000).forEach((element, id) => {
    const colorBox = document.createElement("div");
    colorBox.className = "colorBox";
    colorBox.id = id;
    colorBox.setAttribute("colorCode", element.hex);
    colorBox.setAttribute("onclick", "handleCopy(this)");
    colorBox.style.backgroundColor = element.hex;
    colorBoxContainer.appendChild(colorBox);
  });
}

initialLoad();

function handleCopy(element) {
  const hexCode = element.attributes[2].value;
  navigator.clipboard.writeText(hexCode);
  alertEle.style.display = "flex";
  alertEle.innerHTML = `<div class ="copiedColor" style ="background:${hexCode}" ></div><p> ${hexCode}  copied ✅</p>`;
  setTimeout(() => {
    alertEle.style.display = "none";
  }, 3000);
}
