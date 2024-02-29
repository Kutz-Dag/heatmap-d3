let w = 1000;
let h = 500;
let paddingX = 70;
let paddingY = 20;
let margin = { top: 30, right: 20, bottom: 60, left: 60 };

const request = new XMLHttpRequest();
request.open("GET", 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json', true);
request.send();
request.onload = function() {
  let data = JSON.parse(request.responseText);

  console.log(data.monthlyVariance[1]);
  
  let baseTemperatures = data.baseTemperature;
  
  let monthVar = data.monthlyVariance;
  
  let colorPalette = ["#3288bd", "#66c2a5", "#abdda4", "#e6f598", "#fee08b", "#fdae61", "#f46d43", "#d53e4f"];
  
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  let title = d3.select("#title").text("Global Surface Temperature 1753-2015")
  
  let description = d3.select("#description").text("1753 - 2015: base temperature 8.66℃")
  
  //   This is the svg element
  let svg = d3.select(".heatMap")
              .append("svg")
              .attr("width", w)
              .attr("height", h)
  
  monthVar.forEach((variance) => (variance.month -= 1));
  
  //   Setting up the x-axis
  let xScale = d3.scaleBand(monthVar.map((variance) => variance.year),[margin.left, w - margin.right]);
  
  let yearFormat = d3.format("d");
  
  let tickFilter = xScale.domain().filter((year) => year % 10 === 0);
  
  let xAxis = d3.axisTop(xScale).tickFormat(yearFormat).tickValues(tickFilter);
  
  svg.append("g")
     .attr("transform", `translate(0,${margin.top - 1})`)
     .attr("id", "x-axis")
     .call(xAxis);
  
  //   Setting up the y-axis
  let yScale = d3.scaleBand([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [margin.top, h - margin.bottom]);
  
  const monthFormat = function(month) {
    const dates = new Date(0);
    dates.setUTCMonth(month);
    const format = d3.timeFormat("%B");
    return format(dates);
  };
  
  let yAxis = d3.axisLeft(yScale).tickFormat(monthFormat);
  
  svg.append("g")
     .attr("transform", `translate(${margin.left - 1},0)`)
     .attr("id", "y-axis")
     .call(yAxis);
  
  let minTemps = d3.min(monthVar, (variance) => variance.variance + baseTemperatures);
  
  let maxTemps = d3.max(monthVar, (variance) => variance.variance + baseTemperatures);
  
  let colors = d3.scaleSequential([maxTemps, minTemps], d3.interpolateRdYlBu);
  
  let tooltip = d3.select(".heatMap")
                   .append("div")
                   .style("opacity", 0)
                   .attr("class", "tool-tip")
                   .attr("id", "tooltip");
  
  svg.selectAll("rect")
     .data(monthVar)
     .enter()
     .append("rect")
     .attr("data-month", (d) => d.month)
     .attr("data-year", (d) => d.year)
     .attr("data-temp", (d) => d.temp + baseTemperatures)
     .attr("x", (d) => xScale(d.year))
     .attr("y", (d) => yScale(d.month))
     .attr("width", (d) => xScale.bandwidth(d.year))
     .attr("height", (d) => yScale.bandwidth(d.month))
     .attr("class", "cell")
     .attr("fill", (d) => colors(d.variance + baseTemperatures))
     .on("mouseenter", function (event, d) {
       tooltip.style("opacity", 1);
       tooltip.html(`${monthFormat(d.month)} ${d.year}<br>${(d.variance + baseTemperatures).toFixed(3)} ºC (${d.variance})`)
        .attr("data-year", d.year)
        .style("left", event.pageX + 5 + "px")
        .style("top", event.pageY + 5 + "px");
    })
    .on("mouseout", function () {
      tooltip.style("opacity", 0);
    });
  
  let wLegend = 400;
  let hLegend = 30;
  let hKeyBox = 30;
  let wKeyBox = 33;

  let arrayRange = (start, stop, step) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (value, index) => start + index * step
    );

  let legendIndices = arrayRange(minTemps, maxTemps, 1);

  let xLegend = d3.scaleLinear([minTemps, maxTemps], [0, wLegend]);
  let xAxisLegend = d3.axisBottom(xLegend)
                      .tickValues(legendIndices)
                      .tickFormat(d3.format(".2f"))
                      .tickSizeOuter(0);

  let legend = svg.append("g")
                  .attr("id", "legend")
                  .attr("width", wLegend)
                  .attr("height", hLegend);
  
  legend.append("g")
        .attr("transform", `translate(${margin.left + 40},${h - hLegend + 8})`)
        .call(xAxisLegend);

  legend.selectAll("rect")
        .data(legendIndices)
        .enter()
        .append("rect")
        .attr("width", wKeyBox)
        .attr("height", hKeyBox)
        .attr("x", (d) => xLegend(d) + margin.left + 40 - wKeyBox / 2)
        .attr("y", h - hLegend - hKeyBox + 8)
        .style("fill", (d) => colors(d));
}
