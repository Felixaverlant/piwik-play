var parseDate = d3.time.format("%Y-%m-%d").parse;


function format_data(data){
  var no_null_data = _.pick(data, function(v,k){ return !_.isEmpty(v) });
  var d = [];

   for (var key in no_null_data) {
      var ddd = {};    

      if (data.hasOwnProperty(key)) {
          ddd.dates = parseDate(key)
          
          data[key].forEach(function(da){
            if(da['label'] === "felix"){
              ddd.visits = da['nb_visits']
            }
          });

      } 
      d.push(ddd)
    }
    return d
}

d3.json("/api/visits", function(error, data) {

  if (error) throw error;

  var ddd = format_data(data)

  var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
  

  var x = d3.time.scale()
    .range([0, width]);

  var y = d3.scale.linear()
      .range([height, 0]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

  var line = d3.svg.line()
      .x(function(d) { return x(d.dates); })
      .y(function(d) { return y(d.visits); });

  var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(d3.extent(ddd, function(dd) { return dd.dates; }));
    y.domain(d3.extent(ddd, function(dd) { return dd.visits; }));

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Visits");

    svg.append("path")
        .datum(ddd)
        .attr("class", "line")
        .attr("d", line);
     
});