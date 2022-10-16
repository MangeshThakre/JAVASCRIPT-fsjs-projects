// Load google charts
google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);

// Draw the chart and set the chart values
function drawChart(
  data = [
    ["Task", "Hours per Day"],
    ["", 0],
  ],
  totalLonePrice
) {
  var data = google.visualization.arrayToDataTable(data);

  // Optional; add a title and set the width and height of the chart
  var options = {
    title: `Total Amount ${totalLonePrice ? totalLonePrice : ""}`,
    width: 700,
    height: 400,
  };

  // Display the chart inside the <div> element with id="piechart"
  var chart = new google.visualization.PieChart(
    document.getElementById("piechart")
  );

  chart.draw(data, options);
}

document.querySelector("#form").onsubmit = (event) => submit(event);

function submit(event) {
  event.preventDefault();
  const loanAmoutn = Number(event.target[0].value);
  const intrest = Number(event.target[1].value) / 100;
  const periodInMonth = Number(event.target[2].value);
  const periodInYear = Number(event.target[2].value) / 12;

  const emi =
    (loanAmoutn * intrest * periodInYear + loanAmoutn) / periodInMonth;
  const averageIntrest = emi * periodInMonth - loanAmoutn;

  drawChart(
    [
      ["Task", "Hours per Day"],
      ["Loan Amout", loanAmoutn],
      ["Intrest", averageIntrest],
    ],
    loanAmoutn + averageIntrest
  );

  document.querySelector("#AvgIntrest").textContent =
    averageIntrest.toFixed(2) + " Rs";
  document.querySelector("#MIntrest").textContent =
    (averageIntrest / periodInMonth).toFixed(2) + " Rs";
  document.querySelector("#EMI").textContent = emi.toFixed(2) + " Rs";
}
