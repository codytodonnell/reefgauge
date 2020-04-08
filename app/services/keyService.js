angular.module('reef')

.factory('keyService', function() {
	/*
	* List of all the scientific keys and their metadata
	* Still questioning whether this should be a map or an array, but may be too small to matter right now
	**/
	

	/*
	* List of all the scientific keys and their metadata
	* Still questioning whether this should be a map or an array, but may be too small to matter right now
	**/
	var keys = [
		{
			group: "Coral",
			selected: true,
			icon: "coral-white.svg",
			scienceKeys: [
				{
					key: "slcavg",
					display_name: "Live Coral Cover",
					units: '% of sampled area',
					short_units: '%',
					scale: 'linear',
					domain: [5, 10, 20, 40],
					positive: true,
					group: "Coral",
					selected: true,
					primary_indicator: true,
					image: "images/live-coral-cover.jpg",
					description: "Abundant living coral is one of the best indicators of a healthy reef. To measure this, researchers sample an area of the reef and measure how much of that area is covered by coral."
				},
				{
					key: "rmax",
					display_name: "Reef Height",
					units: 'centimeters',
					short_units: 'cm',
					scale: 'linear',
					domain: [15, 33, 66, 100],
					positive: true,
					group: "Coral",
					selected: false,
					primary_indicator: false,
					image: "",
					description: "Coral reefs provide habitat for fish and other reef organisms. The structural relief is a measure of a coral reef’s vertical height and is a proxy for reef complexity (holes and crevices). Reefs with higher relief and/or complexity often provide more habitat for of fish and reef biota."
				}
			],
			communityKeys: [
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
			group: "Fish",
			selected: false,
			icon: "fish-white.svg",
			scienceKeys: [
				{
					key: "havg",
					display_name: "Herbivorous Fish",
					units: 'biomass (grams/100m2)',
					short_units: 'g/100m2',
					scale: 'linear',
					domain: [960, 1919, 2879, 3479],
					positive: true,
					group: "Fish",
					selected: true,
					primary_indicator: true,
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
					selected: false,
					primary_indicator: true,
					image: "images/grouper.jpg",
					description: "Piscivorous fish, fish that feed on other fish, are important members of reef systems because they keep populations of coral-preying organisms in check. Look out for piscivorous fish like Groupers and Snappers — these are indicators of a healthy reef."
				}
			],	
			communityKeys: [
				{
					key: "taxon_family_name",
					value: "Scaridae",
					value_common_name: "Parrotfishes",
					subgroup: 'Herbivorous',
					checked: true
				},
				{
					key: "taxon_family_name",
					value: "Acanthuridae",
					value_common_name: "Surgeonfishes, Tangs, and Unicornfishes",
					subgroup: 'Herbivorous',
					checked: true
				},
				{
					key: "taxon_family_name",
					value: "Serranidae",
					value_common_name: "Groupers",
					subgroup: 'Piscivorous',
					checked: true
				},
				{
					key: "taxon_family_name",
					value: "Haemulidae",
					value_common_name: "Grunts",
					subgroup: 'Piscivorous',
					checked: true
				},
				{
					key: "taxon_family_name",
					value: "Lutjanidae",
					value_common_name: "Snappers",
					subgroup: 'Piscivorous',
					checked: true
				}
			]
		},
		{
			group: "Benthos",
			selected: false,
			icon: "benthos-white.svg",
			scienceKeys: [
				{
					key: "bi",
					display_name: "Benthic Index",
					display_name_alt: "Benthic Index",
					units: 'index from 1-4',
					short_units: '',
					scale: 'index',
					domain: [2, 3, 4, null],
					positive: true,
					group: "Benthos",
					selected: true,
					primary_indicator: true,
					image: "images/macroalgae.jpg",
					description: "This benthic index is a number from 1-4 that represents a reef’s ratio of benthic promoters to benthic detractors. A higher index value indicates a greater majority of promoters."
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
					selected: false,
					image: "",
					description: "Benthic promoters are all of the organisms that help promote coral growth in a reef system. These are things like crustose coralline algae and young living coral."
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
					selected: false,
					image: "",
					description: "Benthic detractors are all of the organisms that prevent coral growth in a reef system. Macroalgae, cyanobacteria, and certain types of sponges are examples of species that compete with coral to grow in the same spots of a reef. Too much of these detractor species is an indicator of poor health for a reef."
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
					selected: false,
					image: "",
					description: "Crustose coralline algae is a benthic promoter that helps cement reefs together and provide surface for coral larvae."
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
					selected: false,
					image: "",
					description: "Macroalgae is a benthic detractor that can outcompete coral and completely cover sections of reef. Many types of macroalgae are commonly referred to as seaweed."
				}
			],
			communityKeys: [
				{
					key: "taxon_order_name",
					value: "Corallinales",
					value_common_name: "Coralline Algae",
					checked: true,
					promoter: true
				},
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
		// {
		// 	name: "Benthic Detractors",
		// 	selected: false,
		// 	open: false,
		// 	filters: [
		// 		{
		// 			key: "taxon_order_name",
		// 			value: "Nostoc",
		// 			value_common_name: "Cyanobacteria",
		// 			checked: true
		// 		},
		// 		{
		// 			key: "taxon_genus_name",
		// 			value: "Halimeda",
		// 			value_common_name: null,
		// 			checked: true
		// 		},
		// 		{
		// 			key: "taxon_genus_name",
		// 			value: "Galaxaura",
		// 			value_common_name: null,
		// 			checked: true
		// 		},
		// 		{
		// 			key: "taxon_genus_name",
		// 			value: "Dictyota",
		// 			value_common_name: "Y-branched Algae",
		// 			checked: true
		// 		},
		// 		{
		// 			key: "taxon_genus_name",
		// 			value: "Caulerpa",
		// 			value_common_name: null,
		// 			checked: true
		// 		},
		// 		{
		// 			key: "taxon_genus_name",
		// 			value: "Cliona",
		// 			value_common_name: null,
		// 			checked: true
		// 		},
		// 		{
		// 			key: "taxon_genus_name",
		// 			value: "Peyssonnelia",
		// 			value_common_name: null,
		// 			checked: true
		// 		}
		// 	]
		// }
	];

	var getFiltersByGroupName = function(groupName) {
		var group = keys.find(function(k) {
			return k.group === groupName;
		});

		var communityKeys = group.communityKeys.filter(function(f) { 
			return f.checked === true; 
		});

		return communityKeys;
	};

	var getFilterDisplayName = function(communityKey) {
		var taxonType = capitalize(communityKey.key.split('_')[1]);
		if(communityKey.value_common_name) {
			return communityKey.value_common_name + ' (' + taxonType + ' ' + communityKey.value + ')';
		} else {
			return taxonType + ' ' + communityKey.value;
		}
	};

	var setInitialFiltersByGroup = function(groupName) {
		keys.forEach(function(k) {
			k.selected = k.group === groupName ? true : false;
		});
		return getFiltersByGroupName(groupName);
	};

	var assignFilterGroupToItem = function(d) {
		var filterGroup = null;
		keys.forEach(function(k) {
			k.communityKeys.forEach(function(f) {
				if(d[f.key] === f.value) {
					return d.filter_group = k.group;
				}
			});
		});
	};

	var getScienceKeyByName = function(keyName) {
		var key = null;
		keys.forEach(function(g) {
			g.scienceKeys.forEach(function(k) {
				if(k.key === keyName) {
					return key = k;
				}
			});
		});
		return key;
	};

	var getKeyGroupByName = function(groupName) {
		return keys.find(function(k) {
			return k.group === groupName;
		});
	};

	var getActiveKeyGroup = function() {
		return keys.find(function(k) {
			return k.selected === true;
		});
	};

	function capitalize(s) {
		if (typeof s !== 'string') return '';
		return s.charAt(0).toUpperCase() + s.slice(1);
	}

	return {
		keys: keys,
		getFiltersByGroupName: getFiltersByGroupName,
		getFilterDisplayName: getFilterDisplayName,
		setInitialFiltersByGroup: setInitialFiltersByGroup,
		assignFilterGroupToItem: assignFilterGroupToItem,
		getScienceKeyByName: getScienceKeyByName,
		getKeyGroupByName: getKeyGroupByName,
		getActiveKeyGroup: getActiveKeyGroup,
		capitalize: capitalize
	}
});