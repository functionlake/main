am4core.ready(function() {

// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

// Create chart instance
var chart = am4core.create("chartdiv", am4charts.XYChart);

// // Set input format for the dates
chart.dateFormatter.inputDateFormat = "dd-MM-yyyy HH:mm:ss";
// Increase contrast by taking evey second color
chart.colors.step = 3;

// Create axes, change minGridDistance to larger value to get less grid of X axis
var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
dateAxis.renderer.minGridDistance = 100;
dateAxis.baseInterval = { "timeUnit": "second", "count": 1 }; 
dateAxis.tooltipDateFormat = "HH:mm:ss, dd MMM";
// Format dateaxis
dateAxis.periodChangeDateFormats.setKey("hour", "[bold]dd MMM[/]");

//Scroll bar
chart.scrollbarX = new am4core.Scrollbar();
chart.scrollbarX.parent = chart.bottomAxesContainer;

// Create series
function createAxisAndSeries(field, name, opposite, bullet) {
  var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  if(chart.yAxes.indexOf(valueAxis) != 0){
        valueAxis.syncWithAxis = chart.yAxes.getIndex(0);
  }
  
valueAxis.events.on("ready", function(ev) {
  ev.target.min = ev.target.min;
  ev.target.max = ev.target.max;
})

  var series = chart.series.push(new am4charts.LineSeries());
  series.dataFields.valueY = field;
  series.dataFields.dateX = "date";
  series.strokeWidth = 2;
  series.yAxis = valueAxis;
  series.name = name;
  series.tooltipText = "{name}: [bold]{valueY}[/]";
series.tensionX = 0.8;
  series.showOnInit = true;
  // Auto hide axes
  series.events.on("hidden", toggleAxes);
  series.events.on("shown", toggleAxes);

  var interfaceColors = new am4core.InterfaceColorSet();



































  
  valueAxis.renderer.line.strokeOpacity = 1;
  valueAxis.renderer.line.strokeWidth = 2;
  valueAxis.renderer.line.stroke = series.stroke;
  valueAxis.renderer.labels.template.fill = series.stroke;
  valueAxis.renderer.opposite = opposite;
}

//false for left axis, true for right axis, change S*-legend to desired legend name
createAxisAndSeries("S1","Block 06.1", false, "circle"); 
createAxisAndSeries("S2","Block 05.2&3", false, "triangle"); 
createAxisAndSeries("S3","Block 11.2", false, "rectangle"); 
createAxisAndSeries("S4","Block 12W", false, "circle"); 
createAxisAndSeries("S5","Total NSCP", false, "circle"); 
createAxisAndSeries("S6","LTP export pressure", true, "circle"); 

//Hide axis
function toggleAxes(ev) {
  var axis = ev.target.yAxis;
  var disabled = true;
  axis.series.each(function(series) {
    if (!series.isHiding && !series.isHidden) {
      disabled = false;
    }
  });
  axis.disabled = disabled;
}

// Add legend
chart.legend = new am4charts.Legend();

// Add cursor
chart.cursor = new am4charts.XYCursor();

// Add data
chart.data = [
{"date":"01/01/2022 00:00:00","S1":0.00,"S2":0.00,"S3":0.00,"S4":0.00,"S5":0.00,"S6":0.00},{"date":"01/01/2022 00:01:00","S1":10.00,"S2":10.00,"S3":10.00,"S4":10.00,"S5":10.00,"S6":90.00},{"date":"01/01/2022 00:02:00","S1":3.66,"S2":5.56,"S3":0.92,"S4":0.22,"S5":10.35,"S6":93.61},{"date":"01/02/2022 00:00:00","S1":3.43,"S2":5.56,"S3":0.92,"S4":0.22,"S5":10.12,"S6":92.58},{"date":"01/03/2022 00:00:00","S1":3.86,"S2":5.56,"S3":0.92,"S4":0.22,"S5":10.55,"S6":94.48},{"date":"01/04/2022 00:00:00","S1":3.85,"S2":5.56,"S3":0.92,"S4":0.22,"S5":10.55,"S6":94.48},{"date":"01/05/2022 00:00:00","S1":3.85,"S2":5.56,"S3":0.92,"S4":0.22,"S5":10.55,"S6":94.48},{"date":"01/06/2022 00:00:00","S1":3.85,"S2":5.56,"S3":0.92,"S4":0.22,"S5":10.55,"S6":94.47},{"date":"01/07/2022 00:00:00","S1":3.85,"S2":5.56,"S3":0.92,"S4":0.22,"S5":10.55,"S6":94.48},{"date":"01/08/2022 00:00:00","S1":3.85,"S2":5.56,"S3":0.92,"S4":0.22,"S5":10.55,"S6":94.47},{"date":"01/09/2022 00:00:00","S1":3.47,"S2":5.56,"S3":0.92,"S4":0.22,"S5":10.16,"S6":92.76},{"date":"01/10/2022 00:00:00","S1":3.85,"S2":5.56,"S3":0.92,"S4":0.22,"S5":10.55,"S6":94.48},{"date":"01/11/2022 00:00:00","S1":3.85,"S2":5.56,"S3":0.92,"S4":0.22,"S5":10.55,"S6":94.47},{"date":"01/12/2022 00:00:00","S1":3.85,"S2":5.56,"S3":0.92,"S4":0.22,"S5":10.55,"S6":94.47},{"date":"01/01/2023 00:00:00","S1":1.91,"S2":5.56,"S3":0.67,"S4":0.17,"S5":8.29,"S6":85.84},{"date":"01/02/2023 00:00:00","S1":2.25,"S2":5.56,"S3":0.67,"S4":0.17,"S5":8.64,"S6":86.90},{"date":"01/03/2023 00:00:00","S1":2.25,"S2":5.56,"S3":0.67,"S4":0.17,"S5":8.64,"S6":86.90},{"date":"01/04/2023 00:00:00","S1":2.25,"S2":5.56,"S3":0.67,"S4":0.17,"S5":8.64,"S6":86.90},{"date":"01/05/2023 00:00:00","S1":2.25,"S2":5.56,"S3":0.67,"S4":0.17,"S5":8.64,"S6":86.90},{"date":"01/06/2023 00:00:00","S1":2.25,"S2":5.56,"S3":0.67,"S4":0.17,"S5":8.64,"S6":86.90},{"date":"01/07/2023 00:00:00","S1":2.25,"S2":5.56,"S3":0.67,"S4":0.17,"S5":8.64,"S6":86.89},{"date":"01/08/2023 00:00:00","S1":2.25,"S2":5.56,"S3":0.67,"S4":0.17,"S5":8.64,"S6":86.90},{"date":"01/09/2023 00:00:00","S1":2.03,"S2":5.56,"S3":0.67,"S4":0.17,"S5":8.42,"S6":86.20},{"date":"01/10/2023 00:00:00","S1":2.25,"S2":5.56,"S3":0.67,"S4":0.17,"S5":8.64,"S6":86.90},{"date":"01/11/2023 00:00:00","S1":2.25,"S2":5.56,"S3":0.67,"S4":0.17,"S5":8.64,"S6":86.90},{"date":"01/12/2023 00:00:00","S1":2.25,"S2":5.56,"S3":0.67,"S4":0.17,"S5":8.64,"S6":86.90},{"date":"01/01/2024 00:00:00","S1":1.80,"S2":5.56,"S3":0.58,"S4":0.00,"S5":7.94,"S6":84.62},{"date":"01/02/2024 00:00:00","S1":1.60,"S2":5.56,"S3":0.58,"S4":0.00,"S5":7.74,"S6":84.12},{"date":"01/03/2024 00:00:00","S1":1.80,"S2":5.56,"S3":0.58,"S4":0.00,"S5":7.94,"S6":84.62},{"date":"01/04/2024 00:00:00","S1":1.80,"S2":5.56,"S3":0.58,"S4":0.00,"S5":7.94,"S6":84.62},{"date":"01/05/2024 00:00:00","S1":1.80,"S2":5.56,"S3":0.58,"S4":0.00,"S5":7.94,"S6":84.63},{"date":"01/06/2024 00:00:00","S1":1.80,"S2":5.56,"S3":0.58,"S4":0.00,"S5":7.94,"S6":84.62},{"date":"01/07/2024 00:00:00","S1":1.80,"S2":5.56,"S3":0.58,"S4":0.00,"S5":7.94,"S6":84.62},{"date":"01/08/2024 00:00:00","S1":1.73,"S2":5.56,"S3":0.58,"S4":0.00,"S5":7.87,"S6":84.44},{"date":"01/09/2024 00:00:00","S1":1.38,"S2":5.56,"S3":0.58,"S4":0.00,"S5":7.52,"S6":83.62},{"date":"01/10/2024 00:00:00","S1":1.09,"S2":5.56,"S3":0.58,"S4":0.00,"S5":7.23,"S6":83.05},{"date":"01/11/2024 00:00:00","S1":0.88,"S2":5.56,"S3":0.58,"S4":0.00,"S5":7.02,"S6":82.68},{"date":"01/12/2024 00:00:00","S1":0.00,"S2":5.56,"S3":0.58,"S4":0.00,"S5":6.14,"S6":81.81}
,
,
,
,
,
,
,
,
,
,
,
,
,
,
,
,
,
,
,
,
];
});


























































































































































