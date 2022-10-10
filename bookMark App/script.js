const add = document.querySelector(".add");
// const remove = document.querySelector("#remove");
// const edit = document.querySelector("#edit");

class Functionalities {
  submitBtn = document.querySelector(".submitBtn");
  urlList = document.querySelector("#urlList");
  urlInput = document.querySelector("#urlInput");
  editId = "";
  alertEle = document.querySelector("#alert");
  ///////// methods

  async fetchDetail(url) {
    const API = "https://lets-preview.herokuapp.com/api/url?url=";
    try {
      const response = await fetch(API + url);
      const data = await response.json();
      const bookmark = {};
      bookmark["favIcon"] = data.favIcon;
      bookmark["url"] = url;
      if (data.title) bookmark["name"] = data.title;
      else if (data.og.title) bookmark["name"] = data.og.title;
      else bookmark["name"] = data.url[1];
      return bookmark;
    } catch (error) {
      this.ErrorAlert();
      this.urlInput.value = "";
      this.loadingSubmitBth(false);
      return false;
    }
  }

  loadingSubmitBth(isLoading) {
    isLoading
      ? (this.submitBtn.innerHTML = `<img src="./assets/loading.svg" alt="loading" />`)
      : (this.submitBtn.textContent = "Add");
  }

  loadUrlList() {
    this.urlInput.value = "";
    this.urlList.innerHTML = "";
    const bookmarkbookmarkArr = JSON.parse(localStorage.getItem("bookmark"));
    bookmarkbookmarkArr.forEach((element, index) => {
      const divTag = document.createElement("div");
      divTag.className = "url";
      divTag.id = index;
      divTag.innerHTML = FunctionalitiesClass.displayList(element, index);
      this.urlList.appendChild(divTag);
      this.AddREmoveEditEvent(divTag);
    });
  }
  displayList(e, id) {
    return `
    <a class="urlLeft" href="${e.url}" target ="_blank" >
      <img class="urlImage" src="${e.favIcon}" alt="" />
      <p>${e.name.slice(0, 20)}...</p>
    </a>
    <div class="urlRight">
      <span 
      id ="edit"
      >
        <img id =${id}  src="./assets/edit.png" class="editBth" alt="edit" />
      </span>
      <span
        id ="remove"
        ><img src="./assets/remove.png" class="removeBtn" alt="Delete"
      /></span>
    </div>
  `;
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.loadingSubmitBth(true);
    const bookmarkArr = JSON.parse(localStorage.getItem("bookmark"));
    const url = event.target[0].value;

    const bookmark = await this.fetchDetail(url);
    if (!bookmark) return;
    if (this.editId) {
      bookmarkArr[Number(this.editId)] = bookmark;
      this.editId = "";
      localStorage.setItem("bookmark", JSON.stringify(bookmarkArr));
    } else if (!this.editId) {
      localStorage.setItem(
        "bookmark",
        JSON.stringify([bookmark, ...bookmarkArr])
      );
    }
    this.loadingSubmitBth(false);
    this.loadUrlList();
  }

  handleRemove(e) {
    const bookmarkbookmarkArr = JSON.parse(localStorage.getItem("bookmark"));
    bookmarkbookmarkArr.splice(e.id, 1);
    localStorage.setItem("bookmark", JSON.stringify(bookmarkbookmarkArr));
    this.editId = "";
    this.loadUrlList();
  }
  handleEdit(parentEle, currentEditButton) {
    const bookmarkbookmarkArr = JSON.parse(localStorage.getItem("bookmark"));
    const url = bookmarkbookmarkArr[parentEle.id].url;
    const editBthArr = document.querySelectorAll(".editBth");
    editBthArr.forEach((button) => {
      button.setAttribute("src", "./assets/edit.png");
      if (button.id == parentEle.id && !this.editId) {
        button.setAttribute("src", "./assets/active edit.png");
        this.editId = button.id;
        this.urlInput.value = url;
      } else if (button.id == parentEle.id && this.editId == button.id) {
        button.setAttribute("src", "./assets/edit.png");
        this.editId = "";
        this.urlInput.value = "";
      } else if (button.id == parentEle.id && this.editId != button.id) {
        button.setAttribute("src", "./assets/active edit.png");
        this.editId = button.id;
        this.urlInput.value = url;
      }
    });
  }

  AddREmoveEditEvent(parentEle) {
    const removeButton = parentEle.lastElementChild.lastElementChild;
    const editButton = parentEle.lastElementChild.firstElementChild;

    removeButton.addEventListener("click", () => {
      this.handleRemove(parentEle);
    });
    editButton.addEventListener("click", () => {
      this.handleEdit(parentEle, editButton);
    });
  }

  ErrorAlert() {
    this.alertEle.style.display = "flex";
    setTimeout(() => {
      this.alertEle.style.display = "none";
    }, 3000);
  }
}
// localStorage.removeItem("bookmark");

const FunctionalitiesClass = new Functionalities();

function initialLoad() {
  const bookmark = localStorage.getItem("bookmark");
  if (!bookmark) {
    localStorage.setItem("bookmark", JSON.stringify([]));
  }
  FunctionalitiesClass.loadUrlList();
  FunctionalitiesClass.urlInput.focus();
}
initialLoad();

// event
add.addEventListener("submit", (event) => {
  FunctionalitiesClass.handleSubmit(event);
});
