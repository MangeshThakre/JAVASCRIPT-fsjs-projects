function search(input) {
  if (!input)
    return (document.querySelector("#dropdown").style.display = "none");

  const myRegex = new RegExp(`^${input}`, "gi");
  const filteredCountry = countries.filter((country) => myRegex.test(country));
  displayDropDown(filteredCountry);
}

function displayDropDown(filteredCountry) {
  const dropdownEle = document.querySelector("#dropdown");
  const dropdownUl = document.querySelector("#dropdownUl");

  filteredCountry.length > 0
    ? (dropdownEle.style.display = "block")
    : (dropdownEle.style.display = "none");

  dropdownUl.innerHTML = "";
  filteredCountry.forEach((country) => {
    dropdownUl.innerHTML += liEliment(country);
  });
}

function liEliment(country) {
  return ` <li>
    <button
      type="button"
      value = ${country.split(" ").join("-")}
      onclick="handleclick(this.value)"
      class="inline-flex py-2 px-4 w-full hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
    >
      ${country}
    </button>
  </li>`;
}

function handleclick(country) {
  document.querySelector("#search-dropdown").value = country
    .split("-")
    .join(" ");
}
