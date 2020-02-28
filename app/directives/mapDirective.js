    angular.module('reef')

.directive('map', ['visService', '$rootScope', function(visService, $rootScope) {
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

			$scope.science = visService.getConfig().science;

			var scienceData = null;

			var communityData = null;

			var communityFiltered = null;

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
		    	.domain(getKeyDomain(config.science.sizeBy))
		    	.clamp(true);

		    var ordinalColorScale = d3.scaleOrdinal()
				.range(d3.schemeCategory10)
				.domain(['benthos', 'coral', 'fish']);

			// var linearColorScale = d3.scaleLinear().range(["#99AD98", "#42AD3E"]);
			// #008080,#70a494,#b4c8a8,#f6edbd,#edbb8a,#de8a5a,#ca562c
			// var linearColorScale = d3.scaleLinear().range(["#e70808", "#E8A0A0", "#aaa", "#99AD98", "#42AD3E"]);
			var linearColorScale = d3.scaleLinear()
				.range(["#ca562c", "#edbb8a", "#f6edbd", "#b4c8a8", "#008080"])
				.clamp(true);

			var redScale = d3.scaleLinear().range(["#E8A0A0", "#e70808"]);

		    // calculate the original d3 projection
		    var d3Projection = getD3();
		    
		    var path = d3.geoPath()
		 	// d3.json("https://api.inaturalist.org/v1/observations?project_id=66630&order=desc&order_by=created_at")
		  	Promise.all([
		    	d3.json("data/ReefMasterBySite.json"),
		    	// d3.csv("data/inat-elkhorn-coral-observations.csv")
		    	d3.csv("data/inat-reefgauge-022820.csv")
		    ]).then(function(results) {

		    	scienceData = results[0];

		    	communityData = results[1];

				visService.setScienceData(scienceData);
				visService.setCommunityData(communityData);

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

		    $scope.$watchGroup(['science.sizeBy', 'science.colorBy'], function(newValues, oldValues, scope) {
		    	console.log(newValues);
		    	if(newValues.length > 0 && scienceData) {
		    		if(newValues[0] !== oldValues[0] && newValues[1] !== oldValues[1]) {
						sizeAndColorScienceBy(newValues[0], newValues[1]);
					} else if(newValues[0] !== oldValues[0]) {
						sizeScienceBy(newValues[0]);
					} else if(newValues[1] !== oldValues[1]) {
						colorScienceBy(newValues[1]);
					}
		    	}
		    	
		    });

		    $scope.$watch(function() { return visService.getConfig().community.filters; }, function(newValue, oldValue) {
				if(newValue && communityData) {
					changeCommunityFilters();
				}
			});

		 //    $scope.$watch(function() { return visService.getConfig().science.sizeBy; }, function(newValue, oldValue) {
			// 	if(newValue && scienceData) {
			// 		sizeScienceBy(newValue);
			// 	}
			// });

			// $scope.$watch(function() { return visService.getConfig().science.colorBy; }, function(newValue, oldValue) {
			// 	if(newValue && scienceData) {
			// 		colorScienceBy(newValue);
			// 	}
			// });

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
					.filter(applyCommunityFilters)
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
				points.data(scienceData)
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
					.on("click", pointClick)
					.transition().duration(1000)
					.attr("r", pointRadius);
			}

			function changeCommunityFilters() {
				svg.selectAll(".square")
				    .transition()
				    .duration(500)
				    .filter(applyCommunityFilters);
			}

			function sizeScienceBy(key) {
				radiusScale.domain(getKeyDomain(key));
				svg.selectAll(".point")
				    .transition()
				    .duration(1000)
				    .attr('r', function(d) {
						return radiusScale(d[key]);
					});
			}

			function colorScienceBy(key) {
				var colorScale = getScienceColorScale(key);
				svg.selectAll(".point")
				    .transition()
				    .duration(1000)
				    .style('fill', function(d) {
						return colorScale(d[key]);
					});
			}

			function sizeAndColorScienceBy(sizeKey, colorKey) {
				radiusScale.domain(getKeyDomain(sizeKey));
				var colorScale = getScienceColorScale(colorKey);
				svg.selectAll(".point")
				    .transition()
				    .duration(1000)
				    .attr('r', function(d) {
						return radiusScale(d[sizeKey]);
					})
					.style('fill', function(d) {
						return colorScale(d[colorKey]);
					});
			}

			function toggleScience() {
				svg.selectAll(".point")
				    .transition()
				    .duration(500)
				    .style("fill", pointFill)
					.style("fill-opacity", pointFillOpacity)
					.style("stroke-opacity", pointStrokeOpacity)
					.style("cursor", pointCursor)
					.style("pointer-events", pointPointerEvents);
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

			function getScienceColorScale(key) {
				var colorScale = null;
				var keyMeta = visService.getKeyMeta(key);
				if(keyMeta.scale == 'ordinal') {
					colorScale = ordinalColorScale;
				} else if(keyMeta.scale == 'linear') {
					colorScale = linearColorScale;
				}
				// } else if(keyObj.scale == 'linear' && keyObj.beneficial == false) {
				// 	scale = redScale;
				// }
				// scale.domain(d3.extent(scienceData.features, function(d) { return d[prop]; }));
				colorScale.domain(getKeyDomain(key));

				return colorScale;
			}

			function getKeyDomain(key) {
				var domain = visService.getKeyMeta(key).domain;
				if(domain) {
					return domain;
				} else if(scienceData) {
					return d3.extent(scienceData, function(d) { return d[key]; });
				} else {
					return null;
				}
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

				var tipContent = d.site !== "" ? d.site : d.batch + " " + d.code;

				tip.html('<span>' + tipContent + '</span')
					.attr('id', d.id)
					.style('left', node.attr("cx") + "px")
					.style('top', node.attr("cy") - node.attr("r") - 4 + "px")
					.style('transform', 'translate(-50%, -100%)')
					.style('opacity', 0.9);
			}

			function pointOut(d) {
				if(!d.selected) {
					d3.select(this)
						.transition()
						.duration(500)
						.style("stroke", pointStroke)
						.style("stroke-opacity", pointStrokeOpacity)
						.style("stroke-width", pointStrokeWidth);
				}

				tip.style('opacity', 0);
			}

			function pointClick(d) {
				d.selected = !d.selected;
				console.log(d);
				if(d.selected) {
					visService.setScienceDrillDatum(d);
					visService.setScienceDrillOpen(true);
					svg.selectAll(".point")
						.transition()
						.duration(500)
						.style("stroke", pointStroke)
						.style("stroke-opacity", pointStrokeOpacity)
						.style("stroke-width", pointStrokeWidth)
						.each(function(p) {
							if(p.id !== d.id) p.selected = false;
						});
					d3.select(this)
						.transition()
						.duration(500)
						.style("stroke", "#494949")
						.style("stroke-opacity", 0.8)
						.style("stroke-width", 4);
				} else {
					visService.setScienceDrillDatum(null);
					visService.setScienceDrillOpen(false);
					d3.select(this)
						.transition()
						.duration(500)
						.style("stroke", pointStroke)
						.style("stroke-opacity", pointStrokeOpacity)
						.style("stroke-width", pointStrokeWidth);
				}

				$rootScope.$broadcast('pointClicked');
				var bounds = map.getBounds();
				var quarterHeight = (bounds._ne.lat - bounds._sw.lat) * 0.25;
				map.panTo([d.longitude, (d.latitude - quarterHeight)]);
			}

			function squareFill(d) {
				return config.dataMode === 'community' ? ordinalColorScale('fish') : "#aaa";
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
					var scale = getScienceColorScale(config.science.colorBy);
					return scale(d[config.science.colorBy]);
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
				return radiusScale(d[config.science.sizeBy]);
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
				    	var projection = d3Projection([d.longitude, d.latitude]);
				    	if(d.id === tip.attr('id')) {
				    		tipProjection = projection;
				    		tipNodeRadius = d3.select(this).attr('r');
				    	}
				        var x = projection[0];
				        return x
				    })
				    .attr("cy", function(d) { 
				        var y = d3Projection([d.longitude, d.latitude])[1];
				        return y
				    });

				svg.selectAll(".square")
				    .attr("x", function(d) {
				    	if(hoverImage.node() && "image-"+d.id === hoverImage.attr('id')) {
				    		hoverImageNode = d3.select(this);
				    	}
				        var x = d3Projection([d.longitude, d.latitude])[0];
				        return x
				    })
				    .attr("y", function(d) {
				        var y = d3Projection([d.longitude, d.latitude])[1];
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

		    /*
		    * Include observations that match any of the filters specified in the config
		    **/
		    function applyCommunityFilters(d) {
	    		var include = false;
	    		config.community.filters.forEach(function(f) {
	    			if(d[f.key] === f.value) include = true;
	    		});
	    		return include;
		    }
		}
	}
}]);