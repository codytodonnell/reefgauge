angular.module('reef')

.directive('scatterPlot', ['$window', '$timeout', function($window, $timeout) {
	return {
		restrict: 'EA',
		scope: {
			xvar: '=',
			yvar: '='
		},
		link: function($scope, element, attrs) {
			var xVar = $scope.xvar;
			var yVar = $scope.yvar;

			// set the dimensions and margins of the graph
			var margin = {top: 20, right: 20, bottom: 30, left: 50},
			    width = 1260 - margin.left - margin.right,
			    height = 800 - margin.top - margin.bottom;

			// set the ranges
			// var x = d3.scaleLinear().range([0, width]);
			var x = d3.scaleBand().rangeRound([0, width]).padding(0.5);
			var y = d3.scaleLinear().range([height, 0]);
			var radiusScale = d3.scaleLinear().range([4, 15]);
			var colorScale = d3.scaleLinear().range(["#babcb8", "#e70808"]); // red
			// var colorScale = d3.scaleLinear().range(["#babcb8", "#42AD3E"]); // green

			// append the svg obgect to the body of the page
			// appends a 'group' element to 'svg'
			// moves the 'group' element to the top left margin
			var svg = d3.select(element[0]).append("svg")
			    .attr("width", width + margin.left + margin.right)
			    .attr("height", height + margin.top + margin.bottom)
			  .append("g")
			    .attr("transform",
			          "translate(" + margin.left + "," + margin.top + ")");

			// Get the data
			d3.json("data/ReefMasterBySite.json").then(function(data) {
				// // format the data
				// data.forEach(function(d) {
				//   d.LC = +d.LC;
				//   d.NEGsum = +d.NEGsum;
				// });

				// Scale the range of the data
				// x.domain([0, d3.max(data, function(d) { return d.POSsum; })]);
				x.domain(data.map(function(d) { return d[xVar]; }));
				y.domain([0, d3.max(data, function(d) { return d[yVar]; })]);
				radiusScale.domain([0, d3.max(data, function(d) { return d.CCA; })]);
				colorScale.domain([0, d3.max(data, function(d) { return d[yVar]; })]);
				  
				// Add the scatterplot
				svg.selectAll("dot")
				  .data(data)
				.enter().append("circle")
				  .attr("r", function(d) { 
				  		return radiusScale(d.CCA); 
				  	})
				  .attr("cx", function(d) { 
				  		return x(d[xVar]) + Math.random()*130; 
				  	})
				  .attr("cy", function(d) { 
				  		return y(d[yVar]); 
				  	})
				  .style("fill", function(d) { return colorScale(d[yVar]); })
				  .style("opacity", 0.8)
				  .style("stroke", "#ccc");

				// Add the X Axis
				svg.append("g")
					.attr("class", "x axis")
				  	.attr("transform", "translate(0," + height + ")")
				  	.call(d3.axisBottom(x));

				// Add the Y Axis
				svg.append("g")
					.attr("class", "y axis")
					//.attr("transform", "translate(" + width + ", 0)")
				  	.call(d3.axisLeft(y));
			});
		}
	}
}]);