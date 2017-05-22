/*
Loading GeoJSON using d3 as constructor.
*/


var context = d3.select("canvas").node().getContext("2d"),
    path = d3.geoPath().context(context);

d3.json("https://unpkg.com/us-atlas@1/us/10m.json", function(error, us) {
  if (error) throw error;

  context.beginPath();
  path(topojson.mesh(us));
  context.stroke();
});


// function setup () {
//   var canvas = createCanvas(1024, 512);
//   var path = d3.geoPath().context(canvas);
//
//   d3.json("https://unpkg.com/us-atlas@1/us/10m.json", function(error, us) {
//     if (error) throw error;
//
//     //canvas.beginPath();
//     path(topojson.mesh(us));
//     console.log(path);
//     //canvas.stroke();
//   });
// }



//
// // var color = d3.scaleThreshold()
// //   .range(["#fde0dd","#fcc5c0","#fa9fb5","#f768a1","#dd3497","#ae017e","#7a0177","#49006a"])
// //   .domain([250, 500, 750, 1000, 1250, 1500, 1750, 2000]);
//
// // all these pixel ratio bits used to support full resolution on high-density (retina) devices
// // var devicePixelRatio = window.devicePixelRatio || 1;
//
// // var canvas = d3.select("body").append("canvas")
// //     .attr("width", width * devicePixelRatio)
// //     .attr("height", height * devicePixelRatio)
// //     .style("width", width + "px")
// //     .style("height", height + "px").node();
// //
// // var context = canvas.getContext("2d");
// // context.scale(devicePixelRatio, devicePixelRatio);
// var width = 960;
// var height = 500;
// var colors = ["#fde0dd","#fcc5c0","#fa9fb5","#f768a1","#dd3497","#ae017e","#7a0177","#49006a"];
// var steps = [250, 500, 750, 1000, 1250, 1500, 1750, 2000];
//
// // function setup(){
// //   createCanvas(width, height)
// // }
//
// // var tooltip = d3.select("body")
// //     .append("div")
// //     .attr("class", "tooltip")
// //     .style("position", "absolute")
// //     .style("z-index", "10")
// //     .style("visibility", "hidden");
//
// d3.queue()
//     .defer(d3.tsv, "data/infants-1999-2015.txt")
//     .defer(d3.json, "data/us.json")
//     .await(ready);
//
// function ready(error, deaths, us) {
//   if (error) return console.warn(error);
//
//   deathsByFips = {};
//   deaths.forEach(function(d) {
//     d.Deaths = +d.Deaths;
//     d.Population = +d.Population;
//     d["Crude Rate"] = +(d["Crude Rate"].replace(" (Unreliable)", ""));
//     deathsByFips[+d["County Code"]] = d;
//   });
//
//   var path = d3.geoPath()
//     .projection(d3.geoAlbersUsa())
//     .context(context);
//
//   var subset = topojson.feature(us, us.objects.counties).features.filter(function(d) {
//     return d.id in deathsByFips;
//   });
//
//   context.strokeStyle = "#fff";
//   context.lineWidth = 0.3;
//   subset.forEach(function(d) {
//     context.fillStyle = color(deathsByFips[d.id]["Crude Rate"]);
//     context.beginPath();
//     path(d);
//     context.fill();
//     context.stroke();
//   });
//
//   context.lineWidth = 1;
//   path(topojson.mesh(us, us.objects.states, function(a, b) { return a.id !== b.id; }));
//   context.stroke();
// }
