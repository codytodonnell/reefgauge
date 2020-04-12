angular.module('reef')

.directive('mapLegend', ['keyService', 'visService', '$rootScope', function(keyService, visService, $rootScope) {
	return {
		restrict: 'E',
		scope: {
			config: '='
		},
		templateUrl: 'app/templates/legend.html',
		link: function($scope) {
			$scope.open = true;

			$scope.sizeKey = keyService.getScienceKeyByName($scope.config.science.sizeBy);

			$scope.colorKey = keyService.getScienceKeyByName($scope.config.science.colorBy);

			$scope.isSingleDimension = function() {
				return $scope.config.science.colorBy === $scope.config.science.sizeBy ? true : false;
			};

			var colorLegendValues = angular.copy($scope.colorKey.domain);
			colorLegendValues.unshift(0);

			var sizeLegendValues = angular.copy($scope.sizeKey.domain);
			sizeLegendValues.unshift(0);

			var legendHeight = parseInt(d3.select('#legend').style('height'));

			var communityHeight = 20;

		    // set the dimensions and margins of the graph
			var margin = {top: 20, right: 5, bottom: 5, left: 30},
			    width = 175 - margin.left - margin.right,
			    height = 275 - margin.top - margin.bottom;

		    var svgColor = d3.select('#legend-color-svg')
		    	.attr("width", width + margin.left + margin.right)
			    .attr("height", height + margin.top + margin.bottom);

			var svgSize = d3.select('#legend-size-svg')
		    	.attr("width", width + margin.left + margin.right)
			    .attr("height", height + margin.top + margin.bottom);

			var svgCommunity = d3.select('#legend-community-svg')
		    	.attr("width", width + margin.left + margin.right)
			    .attr("height", 20);

			var band = d3.scalePoint()
			    .range([margin.top, height])
			    .domain([0, 1, 2, 3, 4]);

			var colorScale = null;

			var colorScalePositive = d3.scaleThreshold()
				.range(visService.divergentColorsAsc);

			var colorScaleNegative = d3.scaleThreshold()
				.range(visService.divergentColorsDesc);

			var colorScaleIndex = d3.scaleThreshold()
				.range(visService.divergentColorsAlt);

			// var ordinalColorScale = d3.scaleOrdinal()
			// 	.range(['#39b185', '#9ccb86', '#eeb479', '#e88471', '#cf597e'])
			// 	.domain(['Herbivorous Fish', 'Piscivorous Fish', 'Coral', 'Benthic Detractors', 'Benthic Promoters']);

			var ordinalColorScale = d3.scaleOrdinal()
				.range(visService.categoricalColors)
				.domain(['Coral', 'Fish', 'Benthos']);

			var radiusScale = d3.scaleThreshold()
		    	.range([5, 10, 15, 20, 25]);

		   	var labelScale = null;

		    var labelScalePositive = ['critical', 'poor', 'fair', 'good', 'very good'];

		    var labelScaleNegative = ['very good', 'good', 'fair', 'poor', 'critical'];

		    var colorPoint = svgColor.selectAll('.color-point')
		    	.data(colorLegendValues)
		    	.enter()
		    	.append('g')
		    	.attr('class', 'color-point')
		    	.attr('transform', function(d, i) {
		    		return 'translate(' + margin.left + ', ' + band(i) + ')';
		    	});

		    colorPoint.append('circle');

		    colorPoint.append('text')
		    	.attr('x', 30)
		    	.attr('y', 5);

		    var sizePoint = svgSize.selectAll('.size-point')
		    	.data(sizeLegendValues)
		    	.enter()
		    	.append('g')
		    	.attr('class', 'size-point')
		    	.attr('transform', function(d, i) {
		    		return 'translate(' + margin.left + ',' + band(i) + ')';
		    	});

		    sizePoint.append('circle');

		    sizePoint.append('text')
		    	.attr('x', 30)
		    	.attr('y', 5);

		    var square = svgCommunity.append('g')
		    	.attr('transform', function(d, i) {
		    		return 'translate(' + (margin.left - 5) + ', ' + 5 + ')';
		    	});
		    
		    square.append('rect')
		    	.attr('height', 10)
		    	.attr('width', 10)
		    	.style("fill-opacity", 0.8)
				.style("stroke",'#aaa')
				.style("stroke-width", 1)
				.style("stroke-opacity", 0.8);

			square.append('text')
				.attr('x', 30)
				.attr('alignment-baseline', 'hanging');

		    updateScienceLegend();
		    updateCommunityLegend();

		    function updateScienceLegend() {
		    	$scope.sizeKey = keyService.getScienceKeyByName($scope.config.science.sizeBy);
				$scope.colorKey = keyService.getScienceKeyByName($scope.config.science.colorBy);

				colorScale = getScienceColorScale();
				colorLabelScale = $scope.colorKey.positive ? labelScalePositive : labelScaleNegative;
				sizeLabelScale = $scope.sizeKey.positive ? labelScalePositive : labelScaleNegative;

				colorScale.domain($scope.colorKey.domain);
				radiusScale.domain($scope.sizeKey.domain);

				colorLegendValues = angular.copy($scope.colorKey.domain);
				colorLegendValues.unshift(0);

				sizeLegendValues = angular.copy($scope.sizeKey.domain);
				sizeLegendValues.unshift(0);

				colorPoint.data(colorLegendValues);

		    	colorPoint.select('circle')
		    		.style('fill', function(d) { return colorScale(d); })
		    		.attr('r', function(d) { 
		    			return $scope.isSingleDimension() ? radiusScale(d) : 10; 
		    		});

			    colorPoint.select('text')
			    	.text(function(d, i) { 
			    		if(i == 0) {
			    			return '<' + colorLegendValues[1] + ' (' + colorLabelScale[i] + ')';
			    		} else if(i === colorLegendValues.length - 1) {
			    			return '>' + d + ' (' + colorLabelScale[i] + ')';
			    		} else if(colorLegendValues[i+1] == null) {
			    			return d;
			    		} else {
			    			return d + ' - ' + colorLegendValues[i+1] + ' (' + colorLabelScale[i] + ')';
			    		}
			    	});

			    svgColor.selectAll('.color-point')
			    	.style('opacity', function(d, i) {
			    		if($scope.colorKey.key === 'bi' && i === 4) {
			    			return 0;
			    		} else {
			    			return 1;
			    		}
			    	});

			    sizePoint.data(sizeLegendValues);

			    sizePoint.select('circle')
			    	.attr('r', function(d) { return radiusScale(d); });

			    sizePoint.select('text')
			    	.text(function(d, i) { 
			    		if(i == 0) {
			    			return '<' + sizeLegendValues[1] + ' (' + sizeLabelScale[i] + ')';
			    		} else if(i === sizeLegendValues.length - 1) {
			    			return '>' + d + ' (' + sizeLabelScale[i] + ')';
			    		} else if(sizeLegendValues[i+1] == null) {
			    			return d;
			    		} else {
			    			return d + ' - ' + sizeLegendValues[i+1] + ' (' + sizeLabelScale[i] + ')';
			    		}
			    	});

			    svgSize.selectAll('.size-point')
			    	.style('opacity', function(d, i) {
			    		if($scope.sizeKey.key === 'bi' && i === 4) {
			    			return 0;
			    		} else {
			    			return 1;
			    		}
			    	});
		    }

		    function updateCommunityLegend() {
		    	square.select('rect')
		    		.style('fill', ordinalColorScale($scope.config.community.filterGroup));

		    	square.select('text')
		    		.text('1 ' + $scope.config.community.filterGroup + ' Observation');
		    }

		    function getScienceColorScale() {
		    	if($scope.colorKey.scale == 'linear' && $scope.colorKey.positive) {
					return colorScalePositive;
				} else if($scope.colorKey.scale == 'linear' && !$scope.colorKey.positive) {
					return colorScaleNegative;
				} else if($scope.colorKey.scale == 'index') {
					return colorScaleIndex;
				}
		    }

		    $scope.toggleLegend = function() {
		    	$scope.open = !$scope.open;
		    };

		    $scope.$watchGroup(['config.science.sizeBy', 'config.science.colorBy'], function(newValues, oldValues, scope) {
		    	console.log(newValues);
		    	if(newValues.length > 0) {
		    		updateScienceLegend();
		    	}
		    });

		    $scope.$watch('config.community.filterGroup', function(newValue, oldValue) {
		    	if(newValue) {
		    		updateCommunityLegend();
		    	}
		    });
		}
	}
}]);