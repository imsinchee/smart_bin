var firebaseConfig = {
  apiKey: "AIzaSyBb-hbOWhzM3srzdnjhL4bONWd9mthcy98",
    authDomain: "idp-bf0cb.firebaseapp.com",
    databaseURL: "https://idp-bf0cb.firebaseio.com",
    projectId: "idp-bf0cb",
    storageBucket: "idp-bf0cb.appspot.com",
    messagingSenderId: "561595991088",
    appId: "1:561595991088:web:3642893ccc67f2ae1159f5",
    measurementId: "G-M75QFKPF7G"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.database();
console.log("Ready");

var metal_count, paper_count, plastic_count, glass_count;
db.ref("IDP").set({
  state: "Null",
  metal: 0,
  paper: 0,
  plastic: 0,
  glass: 0
});

// Load google charts
google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);

// Draw the chart and set the chart values
function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ["Task", "Hours per Day"],
    ["Metal", metal_count],
    ["Paper", paper_count],
    ["Plastic", plastic_count],
    ["Glass", glass_count]
  ]);

  // Optional; add a title and set the width and height of the chart
  var options = { title: "Bin Content", width: 550, height: 400 };

  // Display the chart inside the <div> element with id="piechart"
  var chart = new google.visualization.PieChart(
    document.getElementById("piechart")
  );
  chart.draw(data, options);
}

var get_metal = db.ref("IDP/metal");
get_metal.on("value", function(snapshot) {
  metal_count = snapshot.val();
  var metal_percent = metal_count / 5;
  document.getElementById("bottom_metal").innerHTML = metal_percent * 100 + "%";
  drawChart();
});

var get_paper = db.ref("IDP/paper");
get_paper.on("value", function(snapshot) {
  paper_count = snapshot.val();
  var paper_percent = paper_count / 5;
  document.getElementById("bottom_paper").innerHTML = paper_percent * 100 + "%";
  drawChart();
});

var get_plastic = db.ref("IDP/plastic");
get_plastic.on("value", function(snapshot) {
  plastic_count = snapshot.val();
  var plastic_percent = plastic_count / 5;
  document.getElementById("bottom_plastic").innerHTML =
    plastic_percent * 100 + "%";
  drawChart();
});

var get_glass = db.ref("IDP/glass");
get_glass.on("value", function(snapshot) {
  glass_count = snapshot.val();
  var glass_percent = glass_count / 5;
  document.getElementById("bottom_glass").innerHTML = glass_percent * 100 + "%";
  drawChart();
});
