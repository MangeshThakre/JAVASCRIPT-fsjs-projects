// // elements
const sectionBtns = document.querySelector("#sectionBtns");
const sectionContainer = document.querySelector("#section-container");
const expanceIncomeEle = document.querySelector("#expance-income");
const dropdownEle = document.querySelector("#dropdown");
const expenceBtnEle = document.querySelector(
  '[selector="expenceIncome-section-expenceBtn"]'
);
const incomeBtnEle = document.querySelector(
  '[selector="expenceIncome-section-incomeBtn"]'
);

const sactionsNavBtns = document.querySelector("#sactionsNavBtns");

const expenceIncomeSubmitBtn = document.querySelector("#expenceIncomeSubmit");
const dropdownRadioButton = document.querySelector("#dropdownRadioButton");

//  expence section
const totalIncomeValueEle = document.querySelector("#total-income-value");
const totalExpenceValueEle = document.querySelector("#total-expance-value");
const expenceTbody = document.querySelector("#expenceTbody");
const balance = document.querySelector("#balance");

// transection section
const transectionBody = document.querySelector("#transectionBody");
const transectionTotalIncome = document.querySelector(
  "#transectionTotalIncome"
);
const transectionTotalExpence = document.querySelector(
  "#transectionTotalExpence"
);

// category section
const categoriesExpenceBtn = document.querySelector("#categoriesExpenceBtn");
const categoriesIncomeBtn = document.querySelector("#categoriesIncomeBtn");
const categoryTbody = document.querySelector("#categoryTbody");
const addIncomeInput = document.querySelector("#addIncomeInput");

// expence income section
const expenceIncomeDate = document.querySelector("#expenceIncomeDate");
const amount = document.querySelector("#amount");
const incomeExpenceSectionTableHeading = document.querySelector(
  "#incomeExpenceSectionTableHeading"
);

// alert
const popupAlert = document.querySelector('[role="alert"]');

// Draw the chart and set the chart values

const expCategoryArr = [
  "Shoping",
  "Clothe",
  "General",
  "Gifts",
  "Eating Out",
  "Entertainment",
  "Fuel",
  "Holidays",
  "Kids",
  "Sports",
  "Travel",
];

const incomeCategoryArr = ["Salary"];

// localStorage.setItem("incomeCategory", JSON.stringify(incomeCategoryArr));

class Functionalities {
  categoryDropDown(element) {
    expenceIncomeDate.value = "";
    amount.value = "";
    dropdownEle.innerHTML = "";
    if (element.id == "expenceBtn") {
      expenceBtnEle.style.background = "#fef08a";
      incomeBtnEle.style.background = "transparent";
      expenceIncomeSubmitBtn.setAttribute("selector", "expence");
      incomeExpenceSectionTableHeading.textContent = "Expense";

      const expCategory = JSON.parse(localStorage.getItem("expCategory"));
      expCategory.forEach((e, i) => this.appendCategoryOptions(e, i));
    } else if (element.id == "incomeBtn") {
      incomeBtnEle.style.background = "#fef08a";
      expenceBtnEle.style.background = "transparent";
      expenceIncomeSubmitBtn.setAttribute("selector", "income");
      incomeExpenceSectionTableHeading.textContent = "Income";

      const incomeCategory = JSON.parse(localStorage.getItem("incomeCategory"));

      incomeCategory.forEach((e, i) => this.appendCategoryOptions(e, i));
    }
  }

  appendCategoryOptions(e, i) {
    const li = document.createElement("li");
    li.innerHTML = optionHTML(e, i);
    dropdownEle.append(li);
  }

  sectionButtonStyle(currentSection) {
    sactionsNavBtns.childNodes.forEach((sectionBtn) => {
      if (sectionBtn.tagName !== "DIV") return;
      const section = sectionBtn.getAttribute("section");
      if (section == currentSection) {
        sectionBtn.style.background = "#facc15";
        sectionBtn.style.color = "white";
      } else {
        sectionBtn.style.background = "transparent";
        sectionBtn.style.color = "#a16207";
      }
    });
  }

  changeSection(currentSection) {
    sectionContainer.childNodes.forEach((section) => {
      if (section.tagName !== "DIV") return;
      if (section.id == currentSection) {
        section.setAttribute("display", "show");
      } else {
        section.setAttribute("display", "none");
      }
    });
  }

  loadTotalIncomePrice() {
    const expanceIncomeData = JSON.parse(
      localStorage.getItem("expanceIncomeData")
    );
    // filter expence-data form expanceIncomeData []
    const expenceData = expanceIncomeData.filter(
      ({ type: value }) => value == "income"
    );
    const totalIncome = expenceData.reduce((acc, crr) => {
      return (acc = acc + crr.amount);
    }, 0);
    return totalIncome;
  }

  loadTotalExpencePrice() {
    const expanceIncomeData = JSON.parse(
      localStorage.getItem("expanceIncomeData")
    );
    // filter income-data form expanceIncomeData []
    const expenceData = expanceIncomeData.filter(
      ({ type: value }) => value == "expence"
    );
    const totalExpence = expenceData.reduce((acc, crr) => {
      return (acc = acc + crr.amount);
    }, 0);
    return totalExpence;
  }

  loadExpenceIncomeTable(tBody, arr, section) {
    arr.forEach((e, i) => {
      const tr = document.createElement("tr");
      tr.className = "bg-yellow-300 border-b text-gray-900";
      tr.innerHTML = expenceIncomeTable(e, i, section);
      tBody.appendChild(tr);
    });
  }

  balance() {
    const totalIncome = this.loadTotalIncomePrice();
    const totalExpence = this.loadTotalExpencePrice();
    balance.textContent = `rs  ${totalIncome - totalExpence}`;
  }

  loadCategoryTable(categoryArr, category) {
    categoryTbody.innerHTML = "";
    categoryArr.forEach((e, i) => {
      const tr = document.createElement("tr");
      tr.id = i;
      tr.className = "bg-yellow-300 border-b text-gray-900";
      tr.innerHTML = categoryTable(e, i, category);
      categoryTbody.appendChild(tr);
      // found some bug if input value have more then one word eg"eading out"
      // useing innerHTML = `<input  value=${e} >` output will display like "ending"
      // thats why adding the value of input using js instate of innerHTMl
      tr.firstElementChild.firstElementChild.value = e;
    });
  }

  expenceCompressData(expenceData) {
    const expenceCompressDataArr = [];
    expenceData.forEach((expenceDataEle, index) => {
      const sameCategory = expenceData.filter(
        (e) => e.category == expenceDataEle.category
      );

      if (sameCategory.length == 1) {
        expenceCompressDataArr.push({
          category: sameCategory[0].category,
          amount: sameCategory[0].amount,
        });
      } else if (sameCategory.length > 1) {
        const totalAmount = sameCategory.reduce(function (acc, crr) {
          return (acc = crr.amount + acc);
        }, 0);
        expenceCompressDataArr.push({
          category: sameCategory[0].category,
          amount: totalAmount,
        });
      }
    });
    return [
      ...new Map(
        expenceCompressDataArr.map((item) => [item["category"], item])
      ).values(),
    ];
  }

  arrOfArr() {
    let expanceIncomeData = localStorage.getItem("expanceIncomeData");
    const expenceData = JSON.parse(expanceIncomeData).filter(
      ({ type: value }) => value == "expence"
    );
    const expenceCompressData = this.expenceCompressData(expenceData);
    return expenceCompressData.map((e) => [e.category, e.amount]);
  }

  // Load google charts
  loadGoogleChart() {
    const arrOfArr = this.arrOfArr();
    if (arrOfArr.length < 1) {
      document.getElementById("piechart").innerHTML = `
      <img  class ="w-[30rem]" src="./assets/Expense-Reimbursement-2.png" alt="">
      `;
      return;
    }

    google.charts.load("current", {
      packages: ["corechart"],
    });

    const loadTotalExpencePrice = this.loadTotalExpencePrice();
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
      loadTotalExpencePrice;
      var data = google.visualization.arrayToDataTable([
        ["Task", ""],
        ...arrOfArr,
      ]);

      // Optional; add a title and set the width and height of the chart
      var options = {
        title: `Total Expense: rs ${loadTotalExpencePrice} `,
        width: 500,
        height: 350,
        // is3D: true,
        backgroundColor: "#FFFDD0",
      };

      // Display the chart inside the <div> element with id="piechart"
      var chart = new google.visualization.PieChart(
        document.getElementById("piechart")
      );
      chart.draw(data, options);
    }
  }
}

const FunctionalitiesClass = new Functionalities();

function initialLoad() {
  let expanceIncomeData = localStorage.getItem("expanceIncomeData");
  if (!expanceIncomeData) {
    console.log(expanceIncomeData);
    localStorage.setItem("expanceIncomeData", JSON.stringify([]));
  }

  const expenceData = JSON.parse(expanceIncomeData).filter(
    ({ type: value }) => value == "expence"
  );

  const expenceCompressDataArr =
    FunctionalitiesClass.expenceCompressData(expenceData);

  const expCategory = localStorage.getItem("expCategory");
  if (!expCategory) {
    localStorage.setItem("expCategory", JSON.stringify(expCategoryArr));
  }

  const incomeCategory = localStorage.getItem("incomeCategory");
  if (!incomeCategory) {
    localStorage.setItem("incomeCategory", JSON.stringify(incomeCategoryArr));
  }

  spendingSection("spending-section");
  transectionSection();
  categorySection(categoriesExpenceBtn);
  FunctionalitiesClass.loadGoogleChart();
}
initialLoad();

//  spending section
function spendingSection(section = "") {
  const expanceIncomeData = JSON.parse(
    localStorage.getItem("expanceIncomeData")
  );

  const expenceData = expanceIncomeData.filter(
    ({ type: value }) => value == "expence"
  );
  const expenceCompressDataArr =
    FunctionalitiesClass.expenceCompressData(expenceData);

  expenceTbody.innerHTML = "";
  const totalIncome = FunctionalitiesClass.loadTotalIncomePrice();
  totalIncomeValueEle.textContent = "rs " + totalIncome;
  const totalExpence = FunctionalitiesClass.loadTotalExpencePrice();
  totalExpenceValueEle.textContent = "rs " + totalExpence;

  FunctionalitiesClass.loadExpenceIncomeTable(
    expenceTbody,
    expenceCompressDataArr,
    "spending"
  );

  FunctionalitiesClass.balance();
  if (section) {
    FunctionalitiesClass.changeSection(section);
    FunctionalitiesClass.sectionButtonStyle(section);
  }
}

// transection section
function transectionSection() {
  const expanceIncomeData = JSON.parse(
    localStorage.getItem("expanceIncomeData")
  );
  transectionBody.innerHTML = "";
  const totalIncome = FunctionalitiesClass.loadTotalIncomePrice();
  transectionTotalIncome.textContent = "rs " + totalIncome;
  const totalExpence = FunctionalitiesClass.loadTotalExpencePrice();
  transectionTotalExpence.textContent = "rs " + totalExpence;
  FunctionalitiesClass.loadExpenceIncomeTable(
    transectionBody,
    expanceIncomeData,
    "transection"
  );
}

// categorry section
function categorySection(element) {
  // initila select expence button
  selectExpenceIncomeCategory(element);
  const expCategory = JSON.parse(localStorage.getItem("expCategory"));
  FunctionalitiesClass.loadCategoryTable(expCategory, "expence");
}

//////////////////////////////////// Expance Income()

//  expande income initial
function initialExpanceIncome(element) {
  FunctionalitiesClass.categoryDropDown(element);
}

// /////////////////// events functions

//  on clicking any of the button, loop over the sectionContainder check if the "section"(attribute) value of the button
//  matches the section container "display"(attribute of section container child node), if match,
// then set the child attribute  display = "show" else display "none"

function sectionButtons(element) {
  const currentSection = element.getAttribute("section");
  if (currentSection == "expenceIncome-section") initialExpanceIncome(element);
  FunctionalitiesClass.changeSection(currentSection);
  FunctionalitiesClass.sectionButtonStyle(currentSection);

  // add income category value
  addIncomeInput.value = "";
  expenceIncomeDate.value = "";
  amount.value = "";
}

// expence - income section :   done button
function expanceIncomeSubmit(event) {
  // first extract the data from from
  event.preventDefault();
  const date = event.target[0].value;
  let amount = 0;
  let category = "";
  for (let element of event.target) {
    if (element.type == "radio" && element.checked) {
      category = element.value;
    }
    if (element.id == "amount") {
      amount = element.value;
    }
  }

  if (!category) {
    dropdownRadioButton.style.background = "red";
    dropdownRadioButton.style.color = "#ffffff";
    dropdownRadioButton.textContent = "please select category";
    return;
  }

  // store the data extrected data in localstorage
  const dataType = event.submitter.getAttribute("selector"); // expence or income
  const expanceIncomeData = JSON.parse(
    localStorage.getItem("expanceIncomeData")
  );
  expanceIncomeData.push({
    date,
    category,
    amount: Number(amount),
    type: dataType,
  });
  localStorage.setItem("expanceIncomeData", JSON.stringify(expanceIncomeData));

  // call the initial load to show the expance table in spending section
  initialLoad();
}

// category section :  toggle expence and income categories
function selectExpenceIncomeCategory(element) {
  addIncomeInput.value = "";
  if (element.id == "categoriesExpenceBtn") {
    element.style.backgroundColor = "#fef08a";
    categoriesIncomeBtn.style.backgroundColor = "transparent";
    document.querySelector("#categoryHead").textContent = "Expense";
    document.querySelector("#addIncomeCategdory").style.display = "none";
    const expCategory = JSON.parse(localStorage.getItem("expCategory"));
    FunctionalitiesClass.loadCategoryTable(expCategory, "expence");
  } else if (element.id == "categoriesIncomeBtn") {
    element.style.backgroundColor = "#fef08a";
    categoriesExpenceBtn.style.backgroundColor = "transparent";
    document.querySelector("#categoryHead").textContent = "Income";
    document.querySelector("#addIncomeCategdory").style.display =
      "inline-table";
    const incomeCategory = JSON.parse(localStorage.getItem("incomeCategory"));
    FunctionalitiesClass.loadCategoryTable(incomeCategory, "income");
  }
}

//  category section  : edit category button
function categoryEdit(element, id) {
  const input = element.firstElementChild.firstElementChild;
  const saveBtn = element.lastElementChild;
  const editBtn = element.children[1];
  input.disabled = false;
  input.focus();
  editBtn.style.display = "none";
  saveBtn.style.display = "flex";
}

// category section  : save category button
function categorySave(element, id, category) {
  const expCategory = JSON.parse(localStorage.getItem("expCategory"));
  const incomeCategory = JSON.parse(localStorage.getItem("incomeCategory"));

  const expanceIncomeData = JSON.parse(
    localStorage.getItem("expanceIncomeData")
  );

  const input = element.firstElementChild.firstElementChild;
  const saveBtn = element.lastElementChild;
  const editBtn = element.children[1];
  input.disabled = "true";
  editBtn.style.display = "flex";
  saveBtn.style.display = "none";

  let newValue = input.value;

  // if input value is empty
  if (!newValue) {
    categoryCancle(element, id, category);
    return;
  }

  let previousValue = "";

  // if category == expence then set teh previous value base on expenceCategory [] and update the expenceCategory base on new input value
  // if category == income then set the previous value base on incomeCategory [] and update the incomeCategory base on new input value
  if (category == "expence") {
    previousValue = expCategory[id];
    expCategory[id] = newValue;
    localStorage.setItem("expCategory", JSON.stringify(expCategory));
  } else if (category == "income") {
    previousValue = incomeCategory[id];
    incomeCategory[id] = newValue;
    localStorage.setItem("incomeCategory", JSON.stringify(incomeCategory));
  }

  // update the expenceIncome [] base on category
  expanceIncomeData.forEach((e, i) => {
    if (e.category == previousValue) {
      expanceIncomeData[i] = {
        amount: expanceIncomeData[i].amount,
        date: expanceIncomeData[i].date,
        type: expanceIncomeData[i].type,
        category: newValue,
      };
    }
  });
  localStorage.setItem("expanceIncomeData", JSON.stringify(expanceIncomeData));

  // invoke the spending section and transection section the see the update
  spendingSection();
  transectionSection();
  // update the google table
  FunctionalitiesClass.loadGoogleChart();
}

// category section :cancle category button
function categoryCancle(element, id, category) {
  const expCategory = JSON.parse(localStorage.getItem("expCategory"));
  const incomeCategory = JSON.parse(localStorage.getItem("incomeCategory"));
  const editBtn = element.children[1];
  const saveBtn = element.lastElementChild;
  const input = element.firstElementChild.firstElementChild;

  input.disabled = "true";
  editBtn.style.display = "flex";
  saveBtn.style.display = "none";

  let inputValue = "";
  // find the orignal value teh teh inptu base on id
  // incase of expecse find the value from exenceCategory []
  // incase of income find the value from incomeCategory []
  if (category == "expence") {
    inputValue = expCategory[id];
  } else if (category == "income") {
    inputValue = incomeCategory[id];
  }
  input.value = inputValue;
  return;
}

//  category section :  Add button
function addIncomeCategory(event) {
  event.preventDefault();

  const incomeCategory = JSON.parse(localStorage.getItem("incomeCategory"));
  const category = event.target[0].value;

  // if the category already exist then show alert and return
  if (incomeCategory.includes(category)) {
    setTimeout(() => {
      popupAlert.style.display = "none";
    }, 5000);
    return (popupAlert.style.display = "flex");
  }

  const newIncomeCategory = [...incomeCategory, category];
  localStorage.setItem(
    "incomeCategory",
    JSON.stringify([...incomeCategory, category])
  );

  FunctionalitiesClass.loadCategoryTable(newIncomeCategory, "income");

  // finaly remove teh inpt value
  event.target[0].value = "";
}

// reset all
function handleReset() {
  localStorage.setItem("expanceIncomeData", JSON.stringify([]));
  localStorage.setItem("expCategory", JSON.stringify(expCategoryArr));
  localStorage.setItem("incomeCategory", JSON.stringify(incomeCategoryArr));
  initialLoad();
}

//////////////////////////////////////////////////////////////////  html Element
//  category options
function optionHTML(e, i) {
  return `
    <div class="flex items-center">
    <input
      id="default-radio-1"
      type="radio"
      value=${e}
      name="default-radio"
      class="w-4 h-4 text-blue-600 bg-yellow-100 border-yellow-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-yellow-700 focus:ring-2 dark:bg-yellow-600 dark:border-yellow-500"
    />
    <label
      for="default-radio-1"
      class="ml-2 text-sm  text-gray-900  font-bold"
      >${e}</label
    >
  </div>
    `;
}

// spanding expence table
function expenceIncomeTable(element, index, section) {
  return ` 
  <td
    scope="row"
    class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
  >

  <p>
  ${element.category}
  </p>
  
  ${section == "transection" ? `<p> ${element.date} </p>` : ""}
  </td>
  <td class="py-4 px-6 font-bold  
  ${
    section == "transection" && element.type == "income"
      ? " text-green-700"
      : ""
  }
  ${
    section == "transection" && element.type == "expence" ? " text-red-700" : ""
  }
  
  ">RS ${element.amount}</td>`;
}

function categoryTable(e, i, category) {
  return `
  <td
  scope="col"
  class="py-3 px-6 font-medium whitespace-nowrap"
  id="transectionTotalExpence"
>


<input type="text" disabled="true" value =${e} id="default-search" class="block p-4 pl-10  text-sm text-gray-900 bg-yellow-300 rounded-lg border   border-yellow-300 focus:ring-yellow-500 focus:border-yellow-500 dark:bg-yello-300 dark:border-yellow-300  " placeholder="category..." required>

 
</td>

<td
scope="col"
class="py-3 px-6 font-medium whitespace-nowrap flex items-center justify-center"
id="transectionTotalExpence"

>
<button
onclick ="categoryEdit(this.parentElement.parentElement  ,${i})"
type="button" class="py-2 px-3 text-xs font-medium text-center rounded-none text-white mt-3
 bg-yellow-500 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 ">
 Edit
 </button>
</td>
<td 
scope="col"
class=" hidden py-3 px-6 font-medium whitespace-nowrap gap-4  items-center justify-center"
id="transectionTotalExpence"
>


 <button
 category = ${category}
 onclick ="categorySave(this.parentElement.parentElement  ,${i} , '${category}')"
 type="button" class="py-2  px-3 text-xs font-medium text-center rounded-none text-white mt-3
  bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 ">
  Save
  </button>
  <button
category = ${category}
onclick ="categoryCancle(this.parentElement.parentElement  ,${i} , '${category}')"
type="button" class="py-2  px-3 text-xs font-medium text-center rounded-none text-white mt-3
 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 ">
 Cancle
 </button>


</td

  `;
}

console.log(JSON.parse(localStorage.getItem("expanceIncomeData")));
// localStorage.removeItem("expanceIncomeData");
// console.log(JSON.parse(localStorage.getItem("expanceIncomeData")));
