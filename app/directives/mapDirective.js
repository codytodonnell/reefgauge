    angular.module('reef')

.directive('map', ['visService', function(visService) {
	return {
		restrict: 'EA',
		templateUrl: 'app/templates/map.html',
		link: function($scope, element, attrs) {
			/**
			 *
			 * Initialize the Mapbox map
			 * Default center point in Atlanta
			 * accessToken for Cody O'Donnell
			 * Mapbox style by Cody O'Donnell
			 *
			 */
			mapboxgl.accessToken = 'pk.eyJ1IjoiY29kb25uZWxsIiwiYSI6ImNqbmNhaTlrNzBndDIzcHBvYnNla2RneHAifQ.OMGQ5aqcWXSsAKc8niEsEw';
			var map = new mapboxgl.Map({
				container: 'map',
				style: 'mapbox://styles/mapbox/light-v10',
				center: [-74.015, 21.257],
				zoom: 4.0
			});

			var config = visService.getConfig();

			var data = null;

			var commData = null;

		    // Setup our svg layer that we can manipulate with d3
		    var svg = d3.select(map.getCanvasContainer()).append("svg");

		    var radiusScale = d3.scaleLinear().range([4, 40]);

		    var colorScale = d3.scaleOrdinal()
				.range(d3.schemeCategory10);

			var greenScale = d3.scaleLinear().range(["#babcb8", "#42AD3E"]);

			var redScale = d3.scaleLinear().range(["#babcb8", "#e70808"]);

		    // we calculate the scale given mapbox state (derived from viewport-mercator-project's code)
		    // to define a d3 projection
		    function getD3() {
				var bbox = map.getContainer().getBoundingClientRect();
				var center = map.getCenter();
				var zoom = map.getZoom();
				// 512 is hardcoded tile size, might need to be 256 or changed to suit your map config
				var scale = (512) * 0.5 / Math.PI * Math.pow(2, zoom);

				var d3projection = d3.geoMercator()
				.center([center.lng, center.lat])
				.translate([bbox.width/2, bbox.height/2])
				.scale(scale);

				return d3projection;
		    }
		    // calculate the original d3 projection
		    var d3Projection = getD3();
		    
		    var path = d3.geoPath()
		  
		  	Promise.all([
		    	d3.json("data/GeoReefMasterBySite.json"),
		    	d3.csv("data/inat-elkhorn-coral-observations.csv")
		    ]).then(function(results) {

		    	data = results[0];

		    	commData = results[1];

		    	//visService.setKeys(d3.keys(data.features[0].properties));
				visService.setData(data);

				radiusScale.domain(d3.extent(data.features, function(d) { return d.properties[config.sizeBy]; }));

				var points = svg.selectAll(".point")
					.data(data.features);

				var squares = svg.selectAll(".square")
					.data(commData);

				squares.enter().append("rect")
					.attr("class", "square")
					.attr("height", 0)
					.attr("width", 0)
					.style("fill", "#aaa")
					.style("fill-opacity", 0.4)
					.style("stroke", "#aaa")
					.style("stroke-width", 1)
					.style("stroke-opacity", 0.5)
					.transition().duration(1000)
					.attr("height", 10)
					.attr("width", 10);

				points.enter().append("circle")
					.attr("class", "point")
					.attr("r", 1)
					.style("fill", "#0082a3")
					.style("fill-opacity", 0.6)
					.style("stroke", "#004d60")
					.style("stroke-width", 1)
					.transition().duration(1000)
					.attr("r", function(d) {
						return radiusScale(d.properties[config.sizeBy]);
					});

				function render() {
					d3Projection = getD3();

					path.projection(d3Projection)

					svg.selectAll(".point")
					    .attr("cx", function(d) { 
					        var x = d3Projection(d.geometry.coordinates)[0];
					        return x
					    })
					    .attr("cy", function(d) { 
					        var y = d3Projection(d.geometry.coordinates)[1];
					        return y
					    });

					svg.selectAll(".square")
					    .attr("x", function(d) { 
					        var x = d3Projection([+d.longitude, +d.latitude])[0];
					        return x
					    })
					    .attr("y", function(d) { 
					        var y = d3Projection([+d.longitude, +d.latitude])[1];
					        return y
					    });
			    }

				// re-render our visualization whenever the view changes
				map.on("viewreset", function() {
					render();
				});

				map.on("move", function() {
					render();
				});

				// render our initial visualization
				render();
		    });

		    $scope.$watch(function() { return visService.getConfig().sizeBy; }, function(newValue, oldValue) {
				if(newValue && data) {
					sizeBy(newValue);
				}
			});

			$scope.$watch(function() { return visService.getConfig().colorBy; }, function(newValue, oldValue) {
				if(newValue && data) {
					colorBy(newValue);
				}
			});

			$scope.$watch(function() { return visService.getConfig().dataMode; }, function(newValue, oldValue) {
				if(newValue && data && newValue !== oldValue) {
					
				}
			});

			function sizeBy(prop) {
				radiusScale.domain(d3.extent(data.features, function(d) { return d.properties[prop]; }));
				svg.selectAll(".point")
				    .transition()
				    .duration(1000)
				    .attr('r', function(d) {
						return radiusScale(d.properties[prop]);
					});
			}

			function colorBy(prop) {
				var scale = null;
				var keyObj = visService.getKeyObj(prop);
				if(keyObj.scale == 'ordinal') {
					scale = colorScale;
				} else if(keyObj.scale == 'linear' && keyObj.beneficial == true) {
					scale = greenScale;
				} else if(keyObj.scale == 'linear' && keyObj.beneficial == false) {
					scale = redScale;
				}
				scale.domain(d3.extent(data.features, function(d) { return d.properties[prop]; }));
				svg.selectAll(".point")
				    .transition()
				    .duration(1000)
				    .style('fill', function(d) {
						return scale(d.properties[prop]);
					});
			}
		}
	}
}]);