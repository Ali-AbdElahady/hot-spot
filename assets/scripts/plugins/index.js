var width = 960,
  height = 500,
  margin = 20;
var svg = d3
  .select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);
var projection = d3
  .geoEquirectangular()
  .scale((width - margin * 2) / (2 * Math.PI))
  .translate([width / 2, height / 2]);
var path = d3.geoPath().projection(projection);
 d3.json(“world.json”, function(error, world) { if (error) throw error;
