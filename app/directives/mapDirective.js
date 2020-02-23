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

			var scienceData = null;

			var communityData = null;

		    // Setup our svg layer that we can manipulate with d3
		    var svg = d3.select(map.getCanvasContainer()).append("svg");

		    var nodes = d3.select('svg')
		    	.append('g')
		    	.attr('id', 'nodes');

		    var squares = nodes.append('g')
		    	.attr('class', 'squares')
		    	.selectAll(".square");

		    var points = nodes.append('g')
		    	.attr('class', 'points')
		    	.selectAll(".point");

		    var tip = d3.select(map.getCanvasContainer()).append("div")	
				.attr("class", "tooltip")				
				.style("opacity", 0);

		    var radiusScale = d3.scaleLinear()
		    	.range([5, 10, 15, 20, 25])
		    	.clamp(true);

		    var colorScale = d3.scaleOrdinal()
				.range(d3.schemeCategory10)
				.domain(['benthos', 'coral', 'fish']);

			// var greenScale = d3.scaleLinear().range(["#99AD98", "#42AD3E"]);
			// #008080,#70a494,#b4c8a8,#f6edbd,#edbb8a,#de8a5a,#ca562c
			// var greenScale = d3.scaleLinear().range(["#e70808", "#E8A0A0", "#aaa", "#99AD98", "#42AD3E"]);
			var greenScale = d3.scaleLinear()
				.range(["#ca562c", "#edbb8a", "#f6edbd", "#b4c8a8", "#008080"])
				.clamp(true);

			var redScale = d3.scaleLinear().range(["#E8A0A0", "#e70808"]);

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

		    	scienceData = results[0];

		    	communityData = results[1];

				visService.setScienceData(scienceData);
				visService.setCommunityData(communityData);

				//radiusScale.domain(d3.extent(scienceData.features, function(d) { return d.properties[config.science.sizeBy]; }));
				radiusScale.domain([0, 5, 10, 20, 40]);

				/**
				 * If in science mode, draw the points last
				 * If in community mode, draw the squares last
				 */
				if(config.dataMode == 'science') {
					enterSquares();
					enterPoints();
				} else {
					enterPoints();
					enterSquares();
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

		    $scope.$watch(function() { return visService.getConfig().science.sizeBy; }, function(newValue, oldValue) {
				if(newValue && scienceData) {
					sizeScienceBy(newValue);
				}
			});

			$scope.$watch(function() { return visService.getConfig().science.colorBy; }, function(newValue, oldValue) {
				if(newValue && scienceData) {
					colorScienceBy(newValue);
				}
			});

			$scope.$watch(function() { return visService.getConfig().dataMode; }, function(newValue, oldValue) {
				if(newValue && newValue !== oldValue) {
					reverseNodeOrder();
					toggleScience();
					toggleCommunity();
				}
			});

			function enterSquares() {
				squares.data(communityData)
					.enter().append("rect")
					.attr("class", "square")
					.attr("height", 0)
					.attr("width", 0)
					.style("fill", squareFill)
					.style("fill-opacity", squareFillOpacity)
					.style("stroke", squareStroke)
					.style("stroke-width", squareStrokeWidth)
					.style("stroke-opacity", squareStrokeOpacity)
					.style("cursor", squareCursor)
					.style("pointer-events", squarePointerEvents)
					.on("mouseover", squareHover)
					.on("mouseout", squareOut)
					.transition().duration(1000)
					.attr("height", 10)
					.attr("width", 10);
			}

			function enterPoints() {
				points.data(scienceData.features)
					.enter().append("circle")
					.attr("class", "point")
					.attr("r", 1)
					.style("fill", pointFill)
					.style("fill-opacity", pointFillOpacity)
					.style("stroke", pointStroke)
					.style("stroke-width", pointStrokeWidth)
					.style("stroke-opacity", pointStrokeOpacity)
					.style("cursor", pointCursor)
					.style("pointer-events", pointPointerEvents)
					.on("mouseover", pointHover)
					.on("mouseout", pointOut)
					.transition().duration(1000)
					.attr("r", pointRadius);
			}

			function exitSquares() {

			}

			function sizeScienceBy(prop) {
				radiusScale.domain(d3.extent(scienceData.features, function(d) { return d.properties[prop]; }));
				svg.selectAll(".point")
				    .transition()
				    .duration(1000)
				    .attr('r', function(d) {
						return radiusScale(d.properties[prop]);
					});
			}

			function colorScienceBy(prop) {
				var scale = getScienceScale(prop);
				svg.selectAll(".point")
				    .transition()
				    .duration(1000)
				    .style('fill', function(d) {
						return scale(d.properties[prop]);
					});
			}

			function toggleScience() {
				svg.selectAll(".point")
				    .transition()
				    .duration(500)
				    .style("fill", pointFill)
					.style("fill-opacity", pointFillOpacity)
					.style("stroke-opacity", pointStrokeOpacity);
			}

			function toggleCommunity() {
				svg.selectAll(".square")
				    .transition()
				    .duration(500)
				    .style("fill", squareFill)
					.style("fill-opacity", squareFillOpacity)
					.style("stroke-opacity", squareStrokeOpacity)
					.style("cursor", squareCursor)
					.style("pointer-events", squarePointerEvents);
			}

			function reverseNodeOrder() {
				var nodesGroup = document.getElementById("nodes");
				nodesGroup.appendChild(nodesGroup.firstElementChild);
			}

			function getScienceScale(prop) {
				var scale = null;
				var keyObj = visService.getKeyObj(prop);
				if(keyObj.scale == 'ordinal') {
					scale = colorScale;
				} else if(keyObj.scale == 'linear' && keyObj.beneficial == true) {
					scale = greenScale;
				} else if(keyObj.scale == 'linear' && keyObj.beneficial == false) {
					scale = redScale;
				}
				// scale.domain(d3.extent(scienceData.features, function(d) { return d.properties[prop]; }));
				scale.domain([0, 5, 10, 20, 40]);

				return scale;
			}

			function squareHover(d) {
				var node = d3.select(this);

				node.transition()
					.duration(500)
					.style("stroke", "#494949")
					.style("stroke-opacity", 0.8)
					.style("stroke-width", 10);

				svg.append("svg:image")
					.attr('id', 'image-' + d.id)
					.attr('class', 'community-hover-image')
					.attr('x', +node.attr("x") + +node.attr("width")/2 - 100)
					.attr('y', +node.attr("y") + +node.attr("height") + 10)
					.attr('width', 200)
					.attr("xlink:href", d.image_url);
			}

			function squareOut(d) {
				d3.select(this)
					.transition()
					.duration(500)
					.style("stroke", squareStroke)
					.style("stroke-opacity", squareStrokeOpacity)
					.style("stroke-width", squareStrokeWidth);

				d3.selectAll(".community-hover-image")
					.remove();
			}

			function pointHover(d) {
				var node = d3.select(this);

				node.transition()
					.duration(500)
					.style("stroke", "#494949")
					.style("stroke-opacity", 0.8)
					.style("stroke-width", 4);

				var tipContent = d.properties.Site !== "" ? d.properties.Site : d.properties.Batch + " " + d.properties.Code;

				tip.html('<span>' + tipContent + '</span')
					.attr('id', d.properties.id)
					.style('left', node.attr("cx") + "px")
					.style('top', node.attr("cy") - node.attr("r") - 4 + "px")
					.style('transform', 'translate(-50%, -100%)')
					.style('opacity', 0.9);
			}

			function pointOut(d) {
				d3.select(this)
					.transition()
					.duration(500)
					.style("stroke", pointStroke)
					.style("stroke-opacity", pointStrokeOpacity)
					.style("stroke-width", pointStrokeWidth);

				tip.style('opacity', 0);
			}

			function squareFill(d) {
				return config.dataMode === 'community' ? colorScale('fish') : "#aaa";
			}

			function squareStrokeOpacity(d) {
				return config.dataMode === 'community' ? 0.8 : 0;
			}

			function squareFillOpacity(d) {
				return config.dataMode === 'community' ? 0.8 : 0.4;
			}

			function squareStroke(d) {
				return "#aaa";
			}

			function squareStrokeWidth(d) {
				return 1;
			}

			function squareCursor(d) {
				return config.dataMode === 'community' ? 'pointer' : 'none';
			}

			function squarePointerEvents(d) {
				return config.dataMode === 'community' ? 'all' : 'none';
			}

			function pointFill(d) {
				if(config.dataMode === 'science') {
					var scale = getScienceScale(config.science.colorBy);
					return scale(d.properties[config.science.colorBy]);
				} else {
					return '#aaa';
				}
			}

			function pointFillOpacity(d) {
				return config.dataMode === 'science' ? 0.5 : 0.1;
			}

			function pointStrokeOpacity(d) {
				return config.dataMode === 'science' ? 0.3 : 0;
			}

			function pointStroke(d) {
				return "#004d60";
			}

			function pointStrokeWidth(d) {
				return 1;
			}

			function pointCursor(d) {
				return config.dataMode === 'science' ? 'pointer' : 'none';
			}

			function pointPointerEvents(d) {
				return config.dataMode === 'science' ? 'all' : 'none';
			}

			function pointRadius(d) {
				return radiusScale(d.properties[config.science.sizeBy]);
				// return 6;
			}

			function render() {
				d3Projection = getD3();

				path.projection(d3Projection);

				var tipProjection = null;
				var tipNodeRadius = null;

				var hoverImage = svg.select('.community-hover-image');
				var hoverImageNode = null;

				svg.selectAll(".point")
				    .attr("cx", function(d) {
				    	var projection = d3Projection(d.geometry.coordinates);
				    	if(d.properties.id === tip.attr('id')) {
				    		tipProjection = projection;
				    		tipNodeRadius = d3.select(this).attr('r');
				    	}
				        var x = projection[0];
				        return x
				    })
				    .attr("cy", function(d) { 
				        var y = d3Projection(d.geometry.coordinates)[1];
				        return y
				    });

				svg.selectAll(".square")
				    .attr("x", function(d) {
				    	if(hoverImage.node() && "image-"+d.id === hoverImage.attr('id')) {
				    		hoverImageNode = d3.select(this);
				    	}
				        var x = d3Projection([+d.longitude, +d.latitude])[0];
				        return x
				    })
				    .attr("y", function(d) { 
				        var y = d3Projection([+d.longitude, +d.latitude])[1];
				        return y
				    });

				/**
				 * Re-position tooltip based on point's new x and y values
				 * The tooltip id is set to the data point's id so it can be retrieved from here
				 */
				if(tipProjection) {
					tip.style('left', tipProjection[0] + 'px')
						.style('top', tipProjection[1] - tipNodeRadius - 4 + 'px');
				}

				/**
				 * Re-position hover image based on square's new x and y values
				 * The image id is set to the "image-[data point's id]" so it can be retrieved from here
				 */
				if(hoverImageNode) {
					hoverImage.attr('x', +hoverImageNode.attr("x") + +hoverImageNode.attr("width")/2 - 100)
						.attr('y', +hoverImageNode.attr("y") + +hoverImageNode.attr("height") + 10);
				}
		    }
		}
	}
}]);