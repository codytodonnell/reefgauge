angular.module('reef')

.factory('keyService', function() {
	/*
	* List of all the scientific keys and their metadata
	* Still questioning whether this should be a map or an array, but may be too small to matter right now
	**/
	var scienceKeys = [
		{
			key: "slcavg",
			display_name: "Live Coral Cover",
			units: '% of sampled area',
			scale: 'linear',
			domain: [0, 5, 10, 20, 40],
			beneficial: true,
			group: "Coral",
			top_level: true,
			selected: true,
			children: ["t_all", "perclargeam", "percsmallam"],
			image: "",
			description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
		},
		{
			key: "rmax",
			display_name: "Reef Height",
			units: 'centimeters',
			scale: 'linear',
			domain: [0, 5, 10, 20, 40],
			beneficial: true,
			group: "Coral",
			image: "",
			description: "Coral reefs provide habitat for fish and other reef organisms. The structural relief is a measure of a coral reef’s vertical height and is a proxy for reef complexity (holes and crevices). Reefs with higher relief and/or complexity often provide more habitat for of fish and reef biota."
		},
		{
			key: "havg",
			display_name: "Herbivorous Fish",
			units: 'biomass (grams/100m2)',
			scale: 'linear',
			domain: [960, 1919, 2879, 3479, 3480],
			beneficial: true,
			group: "Fish",
			top_level: true,
			children: ["parravg"],
			image: "",
			description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
		},
		{
			key: "pavg",
			display_name: "Piscivorous Fish",
			units: 'biomass (grams/100m2)',
			scale: 'linear',
			domain: [500, 1000, 2999, 6999, 7000],
			beneficial: true,
			group: "Fish",
			top_level: true,
			children: ["grouavg"],
			image: "",
			description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
		},
		{
			key: "cca",
			display_name: "Crustose Coralline Algae",
			units: '% of sampled area',
			scale: 'linear',
			domain: [0, 1, 5.1, 12.1, 25],
			beneficial: true,
			group: "Benthos",
			top_level: false,
			image: "",
			description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
		},
		{
			key: "ma",
			display_name: "Macroalgae",
			units: '% of sampled area',
			scale: 'linear',
			domain: [25, 12.1, 5.1, 1, 0],
			beneficial: false,
			group: "Benthos",
			top_level: false,
			image: "",
			description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
		},
		{
			key: "possum",
			display_name: "Bethic Promoters",
			units: '% of sampled area',
			scale: 'linear',
			domain: [5, 15, 29.9, 59.9, 60],
			beneficial: true,
			group: "Benthos",
			top_level: true,
			children: ["cca"],
			image: "",
			description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
		},
		{
			key: "negsum",
			display_name: "Bethic Detractors",
			units: '% of sampled area',
			scale: 'linear',
			domain: [60, 59.9, 29.9, 15, 5],
			beneficial: false,
			group: "Benthos",
			top_level: true,
			children: ["ma"],
			image: "",
			description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
		}
	];

	/*
	* List of all the scientific keys and their metadata
	* Still questioning whether this should be a map or an array, but may be too small to matter right now
	**/
	var communityFilterGroups = [
		{
			name: "Coral",
			selected: false,
			open: false,
			filters: [
				{
					key: "taxon_family_name",
					value: "Agariciidae",
					value_common_name: null,
					checked: true
				},
				{
					key: "taxon_family_name",
					value: "Astrocoeniidae",
					value_common_name: null,
					checked: true
				},
				{
					key: "taxon_family_name",
					value: "Meandrinidae",
					value_common_name: null,
					checked: true
				},
				{
					key: "taxon_family_name",
					value: "Merulinidae",
					value_common_name: null,
					checked: true
				},
				{
					key: "taxon_family_name",
					value: "Milleporidae",
					value_common_name: "Fire Corals",
					checked: true
				},
				{
					key: "taxon_family_name",
					value: "Montastraeidae",
					value_common_name: null,
					checked: true
				},
				{
					key: "taxon_family_name",
					value: "Faviidae",
					value_common_name: null,
					checked: true
				},
				{
					key: "taxon_family_name",
					value: "Oculinidae",
					value_common_name: null,
					checked: true
				},
				{
					key: "taxon_family_name",
					value: "Poritidae",
					value_common_name: null,
					checked: true
				},
				{
					key: "taxon_family_name",
					value: "Siderastreidae",
					value_common_name: null,
					checked: true
				},
				{
					key: "taxon_genus_name",
					value: "Acropora",
					value_common_name: "Table, Elkhorn, and Staghorn Corals",
					checked: true
				},
			]
		},
		{
			name: "Herbivorous Fish",
			selected: false,
			open: false,
			filters: [
				{
					key: "taxon_family_name",
					value: "Scaridae",
					value_common_name: "Parrotfishes",
					checked: true
				},
				{
					key: "taxon_family_name",
					value: "Acanthuridae",
					value_common_name: "Surgeonfishes, Tangs, and Unicornfishes",
					checked: true
				}
			]
		},
		{
			name: "Piscivorous Fish",
			selected: false,
			open: false,
			filters: [
				{
					key: "taxon_family_name",
					value: "Serranidae",
					value_common_name: "Groupers",
					checked: true
				},
				{
					key: "taxon_family_name",
					value: "Haemulidae",
					value_common_name: "Grunts",
					checked: true
				},
				{
					key: "taxon_family_name",
					value: "Lutjanidae",
					value_common_name: "Snappers",
					checked: true
				}
			]
		},
		{
			name: "Benthic Promoters",
			selected: true,
			open: false,
			filters: [
				{
					key: "taxon_order_name",
					value: "Corallinales",
					value_common_name: "Coralline Algae",
					checked: true
				}
			]
		},
		{
			name: "Benthic Detractors",
			selected: false,
			open: false,
			filters: [
				{
					key: "taxon_order_name",
					value: "Nostoc",
					value_common_name: "Cyanobacteria",
					checked: true
				},
				{
					key: "taxon_genus_name",
					value: "Halimeda",
					value_common_name: null,
					checked: true
				},
				{
					key: "taxon_genus_name",
					value: "Galaxaura",
					value_common_name: null,
					checked: true
				},
				{
					key: "taxon_genus_name",
					value: "Dictyota",
					value_common_name: "Y-branched Algae",
					checked: true
				},
				{
					key: "taxon_genus_name",
					value: "Caulerpa",
					value_common_name: null,
					checked: true
				},
				{
					key: "taxon_genus_name",
					value: "Cliona",
					value_common_name: null,
					checked: true
				},
				{
					key: "taxon_genus_name",
					value: "Peyssonnelia",
					value_common_name: null,
					checked: true
				}
			]
		}
	];

	var getFiltersByGroup = function(group) {
		var item = communityFilterGroups.find(function(g) {
			return g.name === group;
		});
		return item.filters;
	};

	var getFilterDisplayName = function(filter) {
		var taxonType = capitalize(filter.key.split('_')[1]);
		if(filter.value_common_name) {
			return filter.value_common_name + ' (' + taxonType + ' ' + filter.value + ')';
		} else {
			return taxonType + ' ' + filter.value;
		}
	};

	var setInitialFiltersGroup = function(group) {
		communityFilterGroups.forEach(function(g) {
			g.selected = g.name === group ? true : false;
		});
		return getFiltersByGroup(group);
	};

	var assignFilterGroupToItem = function(d) {
		var filterGroup = null;
		communityFilterGroups.forEach(function(g) {
			g.filters.forEach(function(f) {
				if(d[f.key] === f.value) {
					return d.filter_group = g.name;
				}
			});
		});
	};

	function capitalize(s) {
		if (typeof s !== 'string') return '';
		return s.charAt(0).toUpperCase() + s.slice(1);
	}

	return {
		scienceKeys: scienceKeys,
		communityFilterGroups: communityFilterGroups,
		getFiltersByGroup: getFiltersByGroup,
		getFilterDisplayName: getFilterDisplayName,
		setInitialFiltersGroup: setInitialFiltersGroup,
		assignFilterGroupToItem: assignFilterGroupToItem,
	}
});