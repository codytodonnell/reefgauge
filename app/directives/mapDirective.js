    angular.module('reef')

.directive('map', ['$rootScope', 'visService', 'keyService', '$timeout', function($rootScope, visService, keyService, $timeout) {
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
				zoom: 4,
				minZoom: 3.5,
				maxBounds: [[-105.86389277033904, -3.163228674565218],[-38.74399127489755, 41.63340723008753]]
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

		    var squaresG = nodes.append('g')
		    	.attr('class', 'squares');

		    var points = nodes.append('g')
		    	.attr('class', 'points')
		    	.selectAll(".point");

		    var tip = d3.select(map.getCanvasContainer()).append("div")	
				.attr("class", "tooltip")				
				.style("opacity", 0);

		    var radiusScale = d3.scaleThreshold()
		    	.range([5, 10, 15, 20, 25])
		    	.domain(getKeyDomain(config.science.sizeBy));

		    var ordinalColorScale = d3.scaleOrdinal()
				.range(visService.categoricalColors)
				.domain(['Coral', 'Fish', 'Benthos']);

			// var linearColorScale = d3.scaleLinear().range(["#99AD98", "#42AD3E"]);
			// #008080,#70a494,#b4c8a8,#f6edbd,#edbb8a,#de8a5a,#ca562c
			// var linearColorScale = d3.scaleLinear().range(["#e70808", "#E8A0A0", "#aaa", "#99AD98", "#42AD3E"]);
			var colorScalePositive = d3.scaleThreshold()
				.range(visService.divergentColorsAsc);

			var colorScaleNegative = d3.scaleThreshold()
				.range(visService.divergentColorsDesc);

			var colorScaleIndex = d3.scaleThreshold()
				.range(visService.divergentColorsAlt);

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

		    	communityData.forEach(function(d) {
		    		d.latitude = +d.latitude;
		    		d.longitude = +d.longitude;
		    		keyService.assignFilterGroupToItem(d);
		    	});

				visService.setScienceData(scienceData);
				visService.setCommunityData(communityData);

				/**
				 * Initially draw science node group on top of community node group
				 * If community is showing but science isn't, reverse the order so community node group is on top
				 */
				if(config.community.show && !config.science.show) reverseNodeOrder(); 

				enterSquares();
				enterPoints();

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
					enterSquares();
					render();
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
					// reverseNodeOrder();
				}
			});

			$rootScope.$on('drillClosed', function(event, data) {
				svg.selectAll(".square")
					.transition()
					.duration(500)
					.style("stroke", squareStroke)
					.style("stroke-opacity", squareStrokeOpacity)
					.style("stroke-width", squareStrokeWidth)
					.each(function(s) {
						s.selected = false;
					});

				svg.selectAll(".point")
					.transition()
					.duration(500)
					.style("stroke", pointStroke)
					.style("stroke-opacity", pointStrokeOpacity)
					.style("stroke-width", pointStrokeWidth)
					.each(function(p) {
						p.selected = false;
					});
			});

			function enterSquares() {
			 	var squares = squaresG.selectAll('.square')
			 		.data(communityData.filter(applyCommunityFilters));

			    squares.exit().remove();
				
				squares.enter().append("rect")
					.attr("class", "square")
					.attr("height", 10)
					.attr("width", 10)
					.style("fill", "none")
					.style("fill-opacity", squareFillOpacity)
					.style("stroke", squareStroke)
					.style("stroke-width", squareStrokeWidth)
					.style("stroke-opacity", squareStrokeOpacity)
					.style("cursor", squareCursor)
					.style("pointer-events", squarePointerEvents)
					.on("mouseover", squareHover)
					.on("mouseout", squareOut)
					.on("click", squareClick);

				squaresG.selectAll('.square')
					.transition()
					.duration(250)
					.style("fill", squareFill);
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
				var sq = svg.selectAll(".square")
					.data(communityData.filter(applyCommunityFilters));

				sq.exit().remove();
				sq.enter()
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
				var keyMeta = keyService.getScienceKeyByName(key);
				if(keyMeta.scale == 'ordinal') {
					colorScale = ordinalColorScale;
				} else if(keyMeta.scale == 'linear' && keyMeta.positive) {
					colorScale = colorScalePositive;
				} else if(keyMeta.scale == 'linear' && !keyMeta.positive) {
					colorScale = colorScaleNegative;
				} else if(keyMeta.scale == 'index') {
					colorScale = colorScaleIndex;
				}

				colorScale.domain(getKeyDomain(key));

				return colorScale;
			}

			function getKeyDomain(key) {
				var domain = keyService.getScienceKeyByName(key).domain;
				if(domain) {
					return domain;
				} else if(scienceData) {
					return d3.extent(scienceData, function(d) { return d[key]; });
				} else {
					return null;
				}
			}

			function squareHover(d) {
				if(!d.selected) {
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
			}

			function squareOut(d) {
				if(!d.selected) {
					d3.select(this)
						.transition()
						.duration(500)
						.style("stroke", squareStroke)
						.style("stroke-opacity", squareStrokeOpacity)
						.style("stroke-width", squareStrokeWidth);
				}

				d3.selectAll(".community-hover-image")
					.remove();
			}

			function squareClick(d) {
				d.selected = !d.selected;
				console.log(d);
				if(d.selected) {
					visService.setDrillItem(d);
					visService.setDrillOpen(true);
					svg.selectAll(".square")
						.transition()
						.duration(500)
						.style("stroke", squareStroke)
						.style("stroke-opacity", squareStrokeOpacity)
						.style("stroke-width", squareStrokeWidth)
						.each(function(s) {
							if(s.id !== d.id) s.selected = false;
						});
					d3.select(this)
						.transition()
						.duration(500)
						.style("stroke", "#494949")
						.style("stroke-opacity", 0.8)
						.style("stroke-width", 10);

					squareOut(d);
				} else {
					visService.setDrillOpen(false);
					$timeout(function() {
						visService.setDrillItem(null);
					}, 500);
					d3.select(this)
						.transition()
						.duration(500)
						.style("stroke", squareStroke)
						.style("stroke-opacity", squareStrokeOpacity)
						.style("stroke-width", squareStrokeWidth);
				}

				$rootScope.$broadcast('nodeClicked');
				var bounds = map.getBounds();
				var quarterHeight = (bounds._ne.lat - bounds._sw.lat) * 0.25;
				map.panTo([d.longitude, (d.latitude - quarterHeight)]);
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
					visService.setDrillItem(d);
					visService.setDrillOpen(true);
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
					visService.setDrillOpen(false);
					$timeout(function() {
						visService.setDrillItem(null);
					}, 500);
					d3.select(this)
						.transition()
						.duration(500)
						.style("stroke", pointStroke)
						.style("stroke-opacity", pointStrokeOpacity)
						.style("stroke-width", pointStrokeWidth);
				}

				$rootScope.$broadcast('nodeClicked');
				var bounds = map.getBounds();
				var quarterHeight = (bounds._ne.lat - bounds._sw.lat) * 0.25;
				map.panTo([d.longitude, (d.latitude - quarterHeight)]);
			}

			function squareFill(d) {
				return config.community.show ? ordinalColorScale(d.filter_group) : "#aaa";
			}

			function squareStrokeOpacity(d) {
				return config.community.show ? 0.8 : 0;
			}

			function squareFillOpacity(d) {
				return config.community.show ? 0.8 : 0.4;
			}

			function squareStroke(d) {
				return "#aaa";
			}

			function squareStrokeWidth(d) {
				return 1;
			}

			function squareCursor(d) {
				return config.community.show ? 'pointer' : 'none';
			}

			function squarePointerEvents(d) {
				return config.community.show ? 'all' : 'none';
			}

			function pointFill(d) {
				if(config.science.show) {
					var scale = getScienceColorScale(config.science.colorBy);
					return scale(d[config.science.colorBy]);
				} else {
					return '#aaa';
				}
			}

			function pointFillOpacity(d) {
				return config.science.show ? 0.5 : 0.1;
			}

			function pointStrokeOpacity(d) {
				return config.science.show ? 0.3 : 0;
			}

			function pointStroke(d) {
				return "#004d60";
			}

			function pointStrokeWidth(d) {
				return 1;
			}

			function pointCursor(d) {
				return config.science.show ? 'pointer' : 'none';
			}

			function pointPointerEvents(d) {
				return config.science.show ? 'all' : 'none';
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