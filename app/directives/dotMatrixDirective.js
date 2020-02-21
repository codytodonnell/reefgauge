angular.module('reef')

.directive('dotMatrix', ['visService', function(visService) {
	return {
		restrict: 'EA',
		templateUrl: 'app/templates/dot-matrix.html',
		link: function($scope, element, attrs) {
			var config = visService.getData();

			var keyMap = visService.getKeyMap();

			var dataset = null;

			var margin = {top: 20, right: 20, bottom: 30, left: 50},
			    width = 1360 - margin.left - margin.right,
			    height = 800 - margin.top - margin.bottom;

			var colorScale = d3.scaleOrdinal()
				.range(d3.schemeCategory10);

			var greenScale = d3.scaleLinear().range(["#babcb8", "#42AD3E"]);

			var redScale = d3.scaleLinear().range(["#babcb8", "#e70808"]);

			var radiusScale = d3.scaleLinear().range([4, 15]);

			var pointGrid = d3.grid()
			  .points()
			  .size([1000, 600]);

			var svg = d3.select(element[0]).select("svg")
			    .attr("width", width + margin.left + margin.right)
			    .attr("height", height + margin.top + margin.bottom)
			  .append("g")
			    .attr("transform",
			          "translate(" + margin.left + "," + margin.top + ")");

			var g = svg.append('g');

			d3.json("data/ReefMasterBySite.json").then(function(result) {
				dataset = result;

				colorScale.domain(dataset.map(function(d) { return d.Ecoregion; }));

				greenScale.domain(d3.extent(dataset, function(d) { return d[config.colorBy]; }));

				radiusScale.domain(d3.extent(dataset, function(d) { return d[config.sizeBy]; }));
				
				dataset.sort(function(a, b) {
					return sortByProperty(a, b, config.orderBy);
				});

				visService.setKeys(d3.keys(dataset[0]));
				visService.setDataset(dataset);
				
				var dots = g.selectAll(".dot")
				    .data(pointGrid(dataset), function(d) { return d.id; });

				dots.enter().append("circle")
					.attr("class", "dot")
					.attr("r", function(d) {
						return radiusScale(d[config.sizeBy]);
					})
					.style('fill', function(d) {
						// return colorScale(d.Ecoregion);
						return greenScale(d[config.colorBy]);
					})
					.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
					.on("click", function(d) {
						console.log(d);
					});

				$scope.$apply();
			});

			$scope.$watch(function() { return visService.getData().orderBy; }, function(newValue, oldValue) {
				if(newValue && dataset) {
					orderBy(newValue);
				}
			});

			$scope.$watch(function() { return visService.getData().colorBy; }, function(newValue, oldValue) {
				if(newValue && dataset) {
					colorBy(newValue);
				}
			});

			$scope.$watch(function() { return visService.getData().sizeBy; }, function(newValue, oldValue) {
				if(newValue && dataset) {
					sizeBy(newValue);
				}
			});

			function orderBy(prop) {
				dataset.sort(function(a, b) {
					return sortByProperty(a, b, prop);
				});
				g.selectAll(".dot")
				    .data(pointGrid(dataset), function(d) { return d.id; })
				    .transition()
				    .duration(1000)
				    .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
			}

			function colorBy(prop) {
				var scale = null;
				if(keyMap[prop].scale == 'ordinal') {
					scale = colorScale;
				} else if(keyMap[prop].scale == 'linear' && keyMap[prop].beneficial == true) {
					scale = greenScale;
				} else if(keyMap[prop].scale == 'linear' && keyMap[prop].beneficial == false) {
					scale = redScale;
				}
				scale.domain(d3.extent(dataset, function(d) { return d[prop]; }));
				g.selectAll(".dot")
				    .transition()
				    .duration(1000)
				    .style('fill', function(d) {
						return scale(d[prop]);
					});
			}

			function sizeBy(prop) {
				radiusScale.domain(d3.extent(dataset, function(d) { return d[prop]; }));
				g.selectAll(".dot")
				    .transition()
				    .duration(1000)
				    .attr('r', function(d) {
						return radiusScale(d[prop]);
					});
			}

			function sortByProperty(a, b, prop) {
				if(a[prop] > b[prop]) {
					return -1;
				}
				if(a[prop] < b[prop]) {
					return 1;
				}
				return 0;
			}
			  // condots.transition()
			  //   .attr("r", 10)
			  //   .attr('fill', 'orange')
			  //   .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
			  // condots.exit().transition()
			  //   .attr("r", 1e-6)
			  //   .remove();
		}
	}
}]);