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
			short_units: '%',
			scale: 'linear',
			domain: [5, 10, 20, 40],
			positive: true,
			group: "Coral",
			top_level: true,
			selected: true,
			children: ["t_all", "perclargeam", "percsmallam"],
			image: "images/live-coral-cover.jpg",
			description: "Corals are the basic building blocks of reefs, providing habitat for a diverse range of underwater organisms, and ensuring a healthy ecosystem. Looking at how much of a reef is covered by living coral helps us gauge how healthy a reef is. Over the past decade, live coral cover has been notably low across most of the Caribbean."
		},
		{
			key: "rmax",
			display_name: "Reef Height",
			units: 'centimeters',
			short_units: 'cm',
			scale: 'linear',
			domain: [5, 10, 20, 40],
			positive: true,
			group: "Coral",
			image: "",
			description: "Coral reefs provide habitat for fish and other reef organisms. The structural relief is a measure of a coral reef’s vertical height and is a proxy for reef complexity (holes and crevices). Reefs with higher relief and/or complexity often provide more habitat for of fish and reef biota."
		},
		{
			key: "havg",
			display_name: "Herbivorous Fish",
			units: 'biomass (grams/100m2)',
			short_units: 'g/100m2',
			scale: 'linear',
			domain: [960, 1919, 2879, 3479],
			positive: true,
			group: "Fish",
			top_level: true,
			children: ["parravg"],
			image: "images/parrotfish.jpg",
			description: "Herbivorous fish such as Parrotfishes and Surgeonfishes keep corals healthy by feeding on a seaweed known as macroalgae that can compete with and overgrow corals. An abundant population of herbivorous fish can graze on macroalgae and help maintain space for coral larvae and young coral to thrive."
		},
		{
			key: "pavg",
			display_name: "Piscivorous Fish",
			units: 'biomass (grams/100m2)',
			short_units: 'g/100m2',
			scale: 'linear',
			domain: [500, 1000, 2999, 6999],
			positive: true,
			group: "Fish",
			top_level: true,
			children: ["grouavg"],
			image: "images/grouper.jpg",
			description: "Piscivorous fish, fish that feed on other fish, are important members of reef systems because they keep populations of coral-preying organisms in check. Look out for piscivorous fish like Groupers and Snappers — these are indicators of a healthy reef."
		},
		{
			key: "bi",
			display_name: "Benthos",
			display_name_alt: "Benthic Index",
			units: 'index from 1-4',
			short_units: '',
			scale: 'index',
			domain: [2, 3, 4],
			positive: true,
			group: "Benthos",
			top_level: true,
			children: ["ma"],
			image: "",
			description: "Benthos refers to the small organisms that inhabit reef structures and the ocean floor and play a key role in coral growth or mortality. A reef’s benthic community is made up of promoters that help promote coral growth and detractors that prevent corals from surviving. Crustose coralline algae, a benthic promoter, helps cement reefs together and provide surface for coral larvae. Macroalgae, a benthic detractor, can outcompete coral and completely cover sections of reef. AGRRA uses a benthic index from 1-4 to represent a reef’s ratio of benthic promoters to benthic detractors with a higher index indicating a greater majority of promoters."
		},
		{
			key: "cca",
			display_name: "Crustose Coralline Algae",
			units: '% of sampled area',
			short_units: '%',
			scale: 'linear',
			domain: [1, 5.1, 12.1, 25],
			positive: true,
			group: "Benthos",
			top_level: false,
			image: "",
			description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
		},
		{
			key: "ma",
			display_name: "Macroalgae",
			units: '% of sampled area',
			short_units: '%',
			scale: 'linear',
			domain: [1, 5.1, 12.1, 25],
			positive: false,
			group: "Benthos",
			top_level: false,
			image: "",
			description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
		},
		{
			key: "possum",
			display_name: "Bethic Promoters",
			units: '% of sampled area',
			short_units: '%',
			scale: 'linear',
			domain: [5, 15, 29.9, 59.9],
			positive: true,
			group: "Benthos",
			top_level: false,
			children: ["cca"],
			image: "",
			description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
		},
		{
			key: "negsum",
			display_name: "Bethic Detractors",
			units: '% of sampled area',
			short_units: '%',
			scale: 'linear',
			domain: [5, 15, 29.9, 59.9],
			positive: false,
			group: "Benthos",
			top_level: false,
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

	var getFiltersByGroup = function(groupName) {
		var group = communityFilterGroups.find(function(g) {
			return g.name === groupName;
		});

		var filters = group.filters.filter(function(f) { 
			return f.checked === true; 
		});

		return filters;
	};

	var getFilterDisplayName = function(filter) {
		var taxonType = capitalize(filter.key.split('_')[1]);
		if(filter.value_common_name) {
			return filter.value_common_name + ' (' + taxonType + ' ' + filter.value + ')';
		} else {
			return taxonType + ' ' + filter.value;
		}
	};

	var setInitialFiltersByGroup = function(groupName) {
		communityFilterGroups.forEach(function(g) {
			g.selected = g.name === groupName ? true : false;
		});
		return getFiltersByGroup(groupName);
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

	var getScienceKeyByName = function(keyName) {
		return scienceKeys.find(function(k) {
			return k.key === keyName;
		});
	}

	function capitalize(s) {
		if (typeof s !== 'string') return '';
		return s.charAt(0).toUpperCase() + s.slice(1);
	}

	return {
		scienceKeys: scienceKeys,
		communityFilterGroups: communityFilterGroups,
		getFiltersByGroup: getFiltersByGroup,
		getFilterDisplayName: getFilterDisplayName,
		setInitialFiltersByGroup: setInitialFiltersByGroup,
		assignFilterGroupToItem: assignFilterGroupToItem,
		getScienceKeyByName: getScienceKeyByName
	}
});