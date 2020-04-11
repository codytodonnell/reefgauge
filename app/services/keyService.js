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
					subgroup: null,
					checked: true,
					image: 'images/agariciidae.jpg',
					image_credit: 'By Fernándo Herranz Martín - <a rel="nofollow" class="external free" href="http://animalandia.educa.madrid.org/imagen.php?id=7593" target="_blank">http://animalandia.educa.madrid.org/imagen.php?id=7593</a>, <a href="http://www.gnu.org/licenses/gpl.html" target="_blank" title="GNU General Public License">GPL</a>, <a href="https://commons.wikimedia.org/w/index.php?curid=52497141" target="_blank">Link</a>',
					image_credit_show: false,
					description: 'The Agariciidae are a family of reef-building stony corals that includes cactus corals, plate corals, and lettuce corals. Members of this family are colonial, hermatypic (reef-building) corals. The corals form massive structures, often of a laminar or foliate form. The corallites are linked by the closely packed septa which have smooth or finely toothed margins and do not fuse together. The corallites do not stand out from the surface of the coral and have ill-defined walls formed by a thickening of the septa.',
					description_credit: 'Wikipedia contributors. (2019, July 5). Agariciidae. In Wikipedia, The Free Encyclopedia. Retrieved 21:14, April 11, 2020, from <a href="https://en.wikipedia.org/w/index.php?title=Agariciidae&oldid=904851993" target="_blank">Link</a>',
					description_credit_show: false
				},
				{
					key: "taxon_family_name",
					value: "Astrocoeniidae",
					value_common_name: null,
					subgroup: null,
					checked: true,
					image: 'images/astrocoeniidae.jpg',
					image_credit: 'By NOAA - Joyce and Frank Burek - <a rel="nofollow" class="external free" href="http://flowergarden.noaa.gov/image_library/coral/sintersepta_burek.jpg" target="_blank">http://flowergarden.noaa.gov/image_library/coral/sintersepta_burek.jpg</a>, Public Domain, <a href="https://commons.wikimedia.org/w/index.php?curid=36859645" target="_blank">Link</a>',
					image_credit_show: false,
					description: 'The Astrocoeniidae are a family of stony corals that includes blushing star corals. The family is distributed across the tropical and subtropical oceans worldwide. Astrocoeniids include both hermatypic and ahermatypic (reef-building) colonial corals, both with and without symbiotic zooxanthellae. The family is made up of both branching and encrusting species which can range in size from less than 5 cm (2.0 in) to more than 30 m (98 ft) across.',
					description_credit: 'Wikipedia contributors. (2019, April 22). Astrocoeniidae. In Wikipedia, The Free Encyclopedia. Retrieved 21:19, April 11, 2020, from <a href="https://en.wikipedia.org/w/index.php?title=Astrocoeniidae&oldid=893589027" target="_blank">Link</a>',
					description_credit_show: false				},
				{
					key: "taxon_family_name",
					value: "Meandrinidae",
					value_common_name: null,
					subgroup: null,
					checked: true,
					image: 'images/meandrinidae.jpg',
					image_credit: 'By Thomas Shahan - <a rel="nofollow" class="external free" href="https://www.flickr.com/photos/49580580@N02/23014570839/in/album-72157658249929820/" target="_blank">https://www.flickr.com/photos/49580580@N02/23014570839/in/album-72157658249929820/</a>, <a href="https://creativecommons.org/licenses/by/2.0" target="_blank" title="Creative Commons Attribution 2.0">CC BY 2.0</a>, <a href="https://commons.wikimedia.org/w/index.php?curid=45565745" target="_blank">Link</a>',
					image_credit_show: false,
					description: 'The Meandrinidae are a family of stony corals that includes pillar corals, elliptical star corals, smooth flower corals, and maze corals. The name comes from the Greek, maiandros meaning "meandering", referring to the miniature, winding valleys found between the corallites. The Meandrinidae are colonial corals and form part of the reef- building community. They contain zooxanthellae, microscopic algae symbionts that provide them with energy. They occur in various different shapes, including massive, encrusting, columnar, and phaceloid (with tubular corallites united at the base).',
					description_credit: 'Wikipedia contributors. (2018, August 5). Meandrinidae. In Wikipedia, The Free Encyclopedia. Retrieved 21:31, April 11, 2020, from <a href=“https://en.wikipedia.org/w/index.php?title=Meandrinidae&oldid=853530028" target="_blank">Link</a>',
					description_credit_show: false				},
				{
					key: "taxon_family_name",
					value: "Merulinidae",
					value_common_name: null,
					subgroup: null,
					checked: true,
					image: 'images/merulinidae.jpg',
					image_credit: 'By NOAA - <a rel="nofollow" class="external free" href="http://flowergarden.noaa.gov/about/cnidarianlist.html" target="_blank">http://flowergarden.noaa.gov/about/cnidarianlist.html</a>, Public Domain, <a href="https://commons.wikimedia.org/w/index.php?curid=36858615" target="_blank">Link</a>',
					image_credit_show: false,
					description: 'The Merulinidae are a family of colonial, reef-building corals that includes corals such as lobed star corals and mountainous star corals. Skeletal structures are similar to those of Faviidae but are highly fused, without paliform lobes. The valleys are superficial or may be indistinct because of fan-like spreading or contortions in the ridges. Faviidae and Trachyphylliidae are the most closely related families.',
					description_credit: 'Wikipedia contributors. (2019, March 30). Merulinidae. In Wikipedia, The Free Encyclopedia. Retrieved 21:38, April 11, 2020, from <a href=“https://en.wikipedia.org/w/index.php?title=Merulinidae&oldid=890117837" target="_blank">Link</a>',
					description_credit_show: false				},
				{
					key: "taxon_family_name",
					value: "Milleporidae",
					value_common_name: "Fire Corals",
					subgroup: null,
					checked: true,
					image: 'images/milleporidae.jpg',
					image_credit: 'By Julian Choquette - <span class="int-own-work" lang="en">Own work</span>, <a href="https://creativecommons.org/licenses/by/3.0" target="_blank" title="Creative Commons Attribution 3.0">CC BY 3.0</a>, <a href="https://commons.wikimedia.org/w/index.php?curid=23297133" target="_blank">Link</a>',
					image_credit_show: false,
					description: 'Fire corals (Millepora) are a genus of colonial marine organisms that exhibit physical characteristics similar to that of coral. The name coral is somewhat misleading, as fire corals are not true corals but are instead more closely related to Hydra and other hydrozoans, making them hydrocorals. They make up the only genus in the monotypic family Milleporidae.',
					description_credit: 'Wikipedia contributors. (2019, December 18). Fire coral. In Wikipedia, The Free Encyclopedia. Retrieved 21:42, April 11, 2020, from <a href=“https://en.wikipedia.org/w/index.php?title=Fire_coral&oldid=931360638" target="_blank">Link</a>',
					description_credit_show: false				},
				{
					key: "taxon_family_name",
					value: "Montastraeidae",
					value_common_name: null,
					subgroup: null,
					checked: true,
					image: 'images/montastraeidae.jpg',
					image_credit: 'Public Domain, <a href="https://commons.wikimedia.org/w/index.php?curid=1377892" target="_blank">Link</a>',
					image_credit_show: false,
					description: 'Montastraea is a genus of colonial stony coral found in the Caribbean seas. It is the only genus in the monotypic family Montastraeidae. One common species, Montastraea cavernosa, is known as great star coral. It forms into massive boulders and sometimes develops into plates. Its polyps are the size of a human thumb and fully extend at night.',
					description_credit: 'Wikipedia contributors. (2020, April 7). Montastraea. In Wikipedia, The Free Encyclopedia. Retrieved 21:45, April 11, 2020, from <a href=“https://en.wikipedia.org/w/index.php?title=Montastraea&oldid=949644114" target="_blank">Link</a>',
					description_credit_show: false				},
				{
					key: "taxon_family_name",
					value: "Faviidae",
					value_common_name: null,
					subgroup: null,
					checked: true,
					image: 'images/faviidae.jpg',
					image_credit: 'By <a href="//commons.wikimedia.org/wiki/User:Albert_kok" target="_blank" title="User:Albert kok">Albert kok</a> - <span class="int-own-work" lang="en">Own work</span>, <a href="https://creativecommons.org/licenses/by-sa/3.0" target="_blank" title="Creative Commons Attribution-Share Alike 3.0">CC BY-SA 3.0</a>, <a href="https://commons.wikimedia.org/w/index.php?curid=3543827" target="_blank">Link</a>',
					image_credit_show: false,
					description: 'Favidae (or Mussidae) is a family of stony coral in the order Scleractinia. Following a taxonomic revision in 2012, the family is now restricted to species found in the Atlantic Ocean, with Pacific species transferred to the new family Lobophylliidae. Many species are referred to as brain coral because their generally spheroid form and grooved surface resembles the convolutions of a brain.',
					description_credit: 'Wikipedia contributors. (2020, March 24). Mussidae. In Wikipedia, The Free Encyclopedia. Retrieved 21:51, April 11, 2020, from <a href=“https://en.wikipedia.org/w/index.php?title=Mussidae&oldid=947066903" target="_blank">Link</a>',
					description_credit_show: false				},
				{
					key: "taxon_family_name",
					value: "Oculinidae",
					value_common_name: null,
					subgroup: null,
					checked: true,
					image: 'images/oculinidae.jpg',
					image_credit: 'By NOAA - <a rel="nofollow" class="external free" href="http://flowergarden.noaa.gov/image_library/coral/diffuseivorybushcoralelh.JPG" target="_blank">http://flowergarden.noaa.gov/image_library/coral/diffuseivorybushcoralelh.JPG</a>, Public Domain, <a href="https://commons.wikimedia.org/w/index.php?curid=41964793" target="_blank">Link</a>',
					image_credit_show: false,
					description: 'Members of the family Oculinidae are characterised by having the walls of the corallites (the cups which house the polyps) being composed of solid walled though rather fragile tubes connected by a smooth skeletal material called coenosteum. The corallites are widely spaced and robust. The septa (ridges on the corallite walls) curve noticeably outward giving the coral a spiky appearance. Many species in this family form a symbiotic relationship with the flagellate protozoa zooxanthellae which live within the tissues of the polyps. These are photosynthetic algae that provide nutrients for the polyps while themselves benefiting from a safe environment and an elevated, sunny position.',
					description_credit: 'Wikipedia contributors. (2020, March 8). Oculinidae. In Wikipedia, The Free Encyclopedia. Retrieved 21:56, April 11, 2020, from <a href=“https://en.wikipedia.org/w/index.php?title=Oculinidae&oldid=944570516 target="_blank">Link</a>',
					description_credit_show: false				},
				{
					key: "taxon_family_name",
					value: "Poritidae",
					value_common_name: null,
					subgroup: null,
					checked: true,
					image: 'images/poritidae.jpg',
					image_credit: 'By <a rel="nofollow" class="external text" href="https://www.flickr.com/people/47445767@N05" target="_blank">James St. John</a> - <a rel="nofollow" class="external text" href="https://www.flickr.com/photos/jsjgeology/16066417536/">Porites porites porites (clubbed finger coral) (San Salvador Island, Bahamas) 5</a>, <a href="https://creativecommons.org/licenses/by/2.0" target="_blank" title="Creative Commons Attribution 2.0">CC BY 2.0</a>, <a href="https://commons.wikimedia.org/w/index.php?curid=39945547" target="_blank">Link</a>',
					image_credit_show: false,
					description: 'Poritidae is a family of stony corals such as finger corals and mustard hill corals. Members of the family are colonial hermatypic (reef-building) corals. They are variable in size and form but most are massive, laminar or ramose as well as branching and encrusting. The corallites are compact with very little coenosteum covering the skeleton. The walls of the corallites and the septa are porous.',
					description_credit: 'Wikipedia contributors. (2018, August 23). Poritidae. In Wikipedia, The Free Encyclopedia. Retrieved 22:01, April 11, 2020, from <a href=“https://en.wikipedia.org/w/index.php?title=Poritidae&oldid=856241638" target="_blank">Link</a>',
					description_credit_show: false				},
				{
					key: "taxon_family_name",
					value: "Siderastreidae",
					value_common_name: null,
					subgroup: null,
					checked: true,
					image: 'images/siderastreidae.jpg',
					image_credit: 'By Ryan McMinds - <a rel="nofollow" class="external free" href="https://www.flickr.com/photos/131967103@N02/27526590183/in/pool-gcmp/" target="_blank">https://www.flickr.com/photos/131967103@N02/27526590183/in/pool-gcmp/</a>, <a href="https://creativecommons.org/licenses/by/2.0" target="_blank" title="Creative Commons Attribution 2.0">CC BY 2.0</a>, <a href="https://commons.wikimedia.org/w/index.php?curid=51873282" target="_blank">Link</a>',
					image_credit_show: false,
					description: 'Siderastreidae is a family of reef building stony corals that include species such as massive starlet corals. Members of this family are colonial, hermatypic (reef-building) corals. The corals vary in form and include massive, thickly encrusting, columnar, and irregular forms. The corallites are linked by flowing septa that have granular margins and that are fused in the centre to give fan-shaped or star-shaped groupings. The corallites do not project from the surface of the coral and have ill-defined walls formed from thickened septa.',
					description_credit: 'Wikipedia contributors. (2019, October 29). Siderastreidae. In Wikipedia, The Free Encyclopedia. Retrieved 22:07, April 11, 2020, from <a href=“https://en.wikipedia.org/w/index.php?title=Siderastreidae&oldid=923598075" target="_blank">Link</a>',
					description_credit_show: false				},
				{
					key: "taxon_genus_name",
					value: "Acropora",
					// value_common_name: "Table, Elkhorn, and Staghorn Corals",
					value_common_name: null,
					subgroup: null,
					checked: true,
					image: 'images/acropora.jpg',
					image_credit: 'By <a href="//commons.wikimedia.org/wiki/User:Tisquesusa" target="_blank" title="User:Tisquesusa">Tisquesusa</a> - <span class="int-own-work" lang="en">Own work</span>, <a href="https://creativecommons.org/licenses/by/4.0" target="_blank" title="Creative Commons Attribution 4.0">CC BY 4.0</a>, <a href="https://commons.wikimedia.org/w/index.php?curid=71274985" target="_blank">Link</a>',
					image_credit_show: false,
					description: 'Acropora is a genus of small polyp stony coral in the phylum Cnidaria.[3] Some of its species are known as table coral, elkhorn coral, and staghorn coral. Over 149 species are described.[4] Acropora species are some of the major reef corals responsible for building the immense calcium carbonate substructure that supports the thin living skin of a reef. Environmental destruction has led to a dwindling of populations of Acropora, along with other coral species. Acropora is especially susceptible to bleaching when stressed. Bleaching is due to the loss of the coral\'s zooxanthellae, which are a golden-brown color. Bleached corals are stark white and may die if new Symbiodinium cells cannot be assimilated.',
					description_credit: 'Wikipedia contributors. (2020, March 6). Acropora. In Wikipedia, The Free Encyclopedia. Retrieved 22:10, April 11, 2020, from <a href=“https://en.wikipedia.org/w/index.php?title=Acropora&oldid=944170383" target="_blank">Link</a>',
					description_credit_show: false				},
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
					checked: true,
					image: 'images/.jpg',
					image_credit: '',
					image_credit_show: false,
					description: '',
					description_credit: '',
					description_credit_show: false				},
				{
					key: "taxon_family_name",
					value: "Acanthuridae",
					value_common_name: "Surgeonfishes, Tangs, Unicornfishes",
					subgroup: 'Herbivorous',
					checked: true,
					image: 'images/.jpg',
					image_credit: '',
					image_credit_show: false,
					description: '',
					description_credit: '',
					description_credit_show: false				},
				{
					key: "taxon_family_name",
					value: "Serranidae",
					value_common_name: "Groupers",
					subgroup: 'Piscivorous',
					checked: true,
					image: 'images/.jpg',
					image_credit: '',
					image_credit_show: false,
					description: '',
					description_credit: '',
					description_credit_show: false				},
				{
					key: "taxon_family_name",
					value: "Haemulidae",
					value_common_name: "Grunts",
					subgroup: 'Piscivorous',
					checked: true,
					image: 'images/.jpg',
					image_credit: '',
					image_credit_show: false,
					description: '',
					description_credit: '',
					description_credit_show: false				},
				{
					key: "taxon_family_name",
					value: "Lutjanidae",
					value_common_name: "Snappers",
					subgroup: 'Piscivorous',
					checked: true,
					image: 'images/.jpg',
					image_credit: '',
					image_credit_show: false,
					description: '',
					description_credit: '',
					description_credit_show: false				}
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
					display_name: "Benthic Promoters",
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
					display_name: "Benthic Detractors",
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
					subgroup: 'Promoter',
					checked: true,
					image: 'images/.jpg',
					image_credit: '',
					image_credit_show: false,
					description: '',
					description_credit: '',
					description_credit_show: false				},
				{
					key: "taxon_order_name",
					value: "Nostoc",
					value_common_name: "Cyanobacteria",
					subgroup: 'Detractor',
					checked: true,
					image: 'images/.jpg',
					image_credit: '',
					image_credit_show: false,
					description: '',
					description_credit: '',
					description_credit_show: false				},
				{
					key: "taxon_genus_name",
					value: "Halimeda",
					value_common_name: null,
					subgroup: 'Detractor',
					checked: true,
					image: 'images/.jpg',
					image_credit: '',
					image_credit_show: false,
					description: '',
					description_credit: '',
					description_credit_show: false				},
				{
					key: "taxon_genus_name",
					value: "Galaxaura",
					value_common_name: null,
					subgroup: 'Detractor',
					checked: true,
					image: 'images/.jpg',
					image_credit: '',
					image_credit_show: false,
					description: '',
					description_credit: '',
					description_credit_show: false				},
				{
					key: "taxon_genus_name",
					value: "Dictyota",
					value_common_name: "Y-branched Algae",
					subgroup: 'Detractor',
					checked: true,
					image: 'images/.jpg',
					image_credit: '',
					image_credit_show: false,
					description: '',
					description_credit: '',
					description_credit_show: false				},
				{
					key: "taxon_genus_name",
					value: "Caulerpa",
					value_common_name: null,
					subgroup: 'Detractor',
					checked: true,
					image: 'images/.jpg',
					image_credit: '',
					image_credit_show: false,
					description: '',
					description_credit: '',
					description_credit_show: false				},
				{
					key: "taxon_genus_name",
					value: "Cliona",
					value_common_name: null,
					subgroup: 'Detractor',
					checked: true,
					image: 'images/.jpg',
					image_credit: '',
					image_credit_show: false,
					description: '',
					description_credit: '',
					description_credit_show: false				},
				{
					key: "taxon_genus_name",
					value: "Peyssonnelia",
					value_common_name: null,
					subgroup: 'Detractor',
					checked: true,
					image: 'images/.jpg',
					image_credit: '',
					image_credit_show: false,
					description: '',
					description_credit: '',
					description_credit_show: false				}
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