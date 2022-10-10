function handleSubmit(event) {
  event.preventDefault();
  const firstName = event.target[0].value;
  const lastName = event.target[1].value;
  const email = event.target[2].value;
  const password = event.target[3].value;
  const cPassword = event.target[4].value;
  const passRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  const isvalid = passRegex.test(password);
  if (password != cPassword) {
    document.querySelector("#warningText").textContent =
      "password and confirm password must be same";
    document.querySelector("#alert").style.display = "block";
    setTimeout(() => {
      document.querySelector("#alert").style.display = "none";
    }, 5000);
  } else if (!isvalid) {
    document.querySelector("#alert").style.display = "block";
    document.querySelector(
      "#warningText"
    ).textContent = `Password Must have 8-12 characters At least one upper case English
    letter, one lower case English letter, one digit, and one special
    characte`;
    setTimeout(() => {
      document.querySelector("#alert").style.display = "none";
    }, 5000);
  } else if (password == cPassword && isvalid) {
    window.location.href = "/dashbord.html";
  }
  //   regex condition

  console.table({ firstName, lastName, email, password, cPassword });
}
