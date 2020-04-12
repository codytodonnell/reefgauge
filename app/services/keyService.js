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
					value_display_name: "Agariciidae",
					subgroup: null,
					checked: true,
					image: 'images/agariciidae.jpg',
					image_credit: 'By Fernándo Herranz Martín - <a rel="nofollow" class="external free" href="http://animalandia.educa.madrid.org/imagen.php?id=7593" target="_blank">http://animalandia.educa.madrid.org/imagen.php?id=7593</a>, <a href="http://www.gnu.org/licenses/gpl.html" target="_blank" title="GNU General Public License">GPL</a>, <a href="https://commons.wikimedia.org/w/index.php?curid=52497141" target="_blank">Link</a>',
					description: 'The Agariciidae are a family of reef-building stony corals that includes cactus corals, plate corals, and lettuce corals. Members of this family are colonial, hermatypic (reef-building) corals. The corals form massive structures, often of a laminar or foliate form. The corallites are linked by the closely packed septa which have smooth or finely toothed margins and do not fuse together. The corallites do not stand out from the surface of the coral and have ill-defined walls formed by a thickening of the septa.',
					description_credit: 'Wikipedia contributors. (2019, July 5). Agariciidae. In Wikipedia, The Free Encyclopedia. Retrieved 21:14, April 11, 2020, from <a href="https://en.wikipedia.org/w/index.php?title=Agariciidae&oldid=904851993" target="_blank">Link</a>',
					description_credit_show: false
				},
				{
					key: "taxon_family_name",
					value: "Astrocoeniidae",
					value_display_name: "Astrocoeniidae",
					subgroup: null,
					checked: true,
					image: 'images/astrocoeniidae.jpg',
					image_credit: 'By NOAA - Joyce and Frank Burek - <a rel="nofollow" class="external free" href="http://flowergarden.noaa.gov/image_library/coral/sintersepta_burek.jpg" target="_blank">http://flowergarden.noaa.gov/image_library/coral/sintersepta_burek.jpg</a>, Public Domain, <a href="https://commons.wikimedia.org/w/index.php?curid=36859645" target="_blank">Link</a>',
					description: 'The Astrocoeniidae are a family of stony corals that includes blushing star corals. The family is distributed across the tropical and subtropical oceans worldwide. Astrocoeniids include both hermatypic and ahermatypic (reef-building) colonial corals, both with and without symbiotic zooxanthellae. The family is made up of both branching and encrusting species which can range in size from less than 5 cm (2.0 in) to more than 30 m (98 ft) across.',
					description_credit: 'Wikipedia contributors. (2019, April 22). Astrocoeniidae. In Wikipedia, The Free Encyclopedia. Retrieved 21:19, April 11, 2020, from <a href="https://en.wikipedia.org/w/index.php?title=Astrocoeniidae&oldid=893589027" target="_blank">Link</a>',
				},
				{
					key: "taxon_family_name",
					value: "Meandrinidae",
					value_display_name: "Meandrinidae",
					subgroup: null,
					checked: true,
					image: 'images/meandrinidae.jpg',
					image_credit: 'By Thomas Shahan - <a rel="nofollow" class="external free" href="https://www.flickr.com/photos/49580580@N02/23014570839/in/album-72157658249929820/" target="_blank">https://www.flickr.com/photos/49580580@N02/23014570839/in/album-72157658249929820/</a>, <a href="https://creativecommons.org/licenses/by/2.0" target="_blank" title="Creative Commons Attribution 2.0">CC BY 2.0</a>, <a href="https://commons.wikimedia.org/w/index.php?curid=45565745" target="_blank">Link</a>',
					description: 'The Meandrinidae are a family of stony corals that includes pillar corals, elliptical star corals, smooth flower corals, and maze corals. The name comes from the Greek, maiandros meaning "meandering", referring to the miniature, winding valleys found between the corallites. The Meandrinidae are colonial corals and form part of the reef- building community. They contain zooxanthellae, microscopic algae symbionts that provide them with energy. They occur in various different shapes, including massive, encrusting, columnar, and phaceloid (with tubular corallites united at the base).',
					description_credit: 'Wikipedia contributors. (2018, August 5). Meandrinidae. In Wikipedia, The Free Encyclopedia. Retrieved 21:31, April 11, 2020, from <a href=“https://en.wikipedia.org/w/index.php?title=Meandrinidae&oldid=853530028" target="_blank">Link</a>',
				},
				{
					key: "taxon_family_name",
					value: "Merulinidae",
					value_display_name: "Merulinidae",
					subgroup: null,
					checked: true,
					image: 'images/merulinidae.jpg',
					image_credit: 'By NOAA - <a rel="nofollow" class="external free" href="http://flowergarden.noaa.gov/about/cnidarianlist.html" target="_blank">http://flowergarden.noaa.gov/about/cnidarianlist.html</a>, Public Domain, <a href="https://commons.wikimedia.org/w/index.php?curid=36858615" target="_blank">Link</a>',
					description: 'The Merulinidae are a family of colonial, reef-building corals that includes corals such as lobed star corals and mountainous star corals. Skeletal structures are similar to those of Faviidae but are highly fused, without paliform lobes. The valleys are superficial or may be indistinct because of fan-like spreading or contortions in the ridges. Faviidae and Trachyphylliidae are the most closely related families.',
					description_credit: 'Wikipedia contributors. (2019, March 30). Merulinidae. In Wikipedia, The Free Encyclopedia. Retrieved 21:38, April 11, 2020, from <a href=“https://en.wikipedia.org/w/index.php?title=Merulinidae&oldid=890117837" target="_blank">Link</a>',
				},
				{
					key: "taxon_family_name",
					value: "Milleporidae",
					value_display_name: "Fire Corals",
					subgroup: null,
					checked: true,
					image: 'images/milleporidae.jpg',
					image_credit: 'By Julian Choquette - <span class="int-own-work" lang="en">Own work</span>, <a href="https://creativecommons.org/licenses/by/3.0" target="_blank" title="Creative Commons Attribution 3.0">CC BY 3.0</a>, <a href="https://commons.wikimedia.org/w/index.php?curid=23297133" target="_blank">Link</a>',
					description: 'Fire corals (Millepora) are a genus of colonial marine organisms that exhibit physical characteristics similar to that of coral. The name coral is somewhat misleading, as fire corals are not true corals but are instead more closely related to Hydra and other hydrozoans, making them hydrocorals. They make up the only genus in the monotypic family Milleporidae.',
					description_credit: 'Wikipedia contributors. (2019, December 18). Fire coral. In Wikipedia, The Free Encyclopedia. Retrieved 21:42, April 11, 2020, from <a href=“https://en.wikipedia.org/w/index.php?title=Fire_coral&oldid=931360638" target="_blank">Link</a>',
				},
				{
					key: "taxon_family_name",
					value: "Montastraeidae",
					value_display_name: "Montastraeidae",
					subgroup: null,
					checked: true,
					image: 'images/montastraeidae.jpg',
					image_credit: 'Public Domain, <a href="https://commons.wikimedia.org/w/index.php?curid=1377892" target="_blank">Link</a>',
					description: 'Montastraea is a genus of colonial stony coral found in the Caribbean seas. It is the only genus in the monotypic family Montastraeidae. One common species, Montastraea cavernosa, is known as great star coral. It forms into massive boulders and sometimes develops into plates. Its polyps are the size of a human thumb and fully extend at night.',
					description_credit: 'Wikipedia contributors. (2020, April 7). Montastraea. In Wikipedia, The Free Encyclopedia. Retrieved 21:45, April 11, 2020, from <a href=“https://en.wikipedia.org/w/index.php?title=Montastraea&oldid=949644114" target="_blank">Link</a>',
				},
				{
					key: "taxon_family_name",
					value: "Faviidae",
					value_display_name: "Faviidae",
					subgroup: null,
					checked: true,
					image: 'images/faviidae.jpg',
					image_credit: 'By <a href="//commons.wikimedia.org/wiki/User:Albert_kok" target="_blank" title="User:Albert kok">Albert kok</a> - <span class="int-own-work" lang="en">Own work</span>, <a href="https://creativecommons.org/licenses/by-sa/3.0" target="_blank" title="Creative Commons Attribution-Share Alike 3.0">CC BY-SA 3.0</a>, <a href="https://commons.wikimedia.org/w/index.php?curid=3543827" target="_blank">Link</a>',
					description: 'Favidae (or Mussidae) is a family of stony coral in the order Scleractinia. Following a taxonomic revision in 2012, the family is now restricted to species found in the Atlantic Ocean, with Pacific species transferred to the new family Lobophylliidae. Many species are referred to as brain coral because their generally spheroid form and grooved surface resembles the convolutions of a brain.',
					description_credit: 'Wikipedia contributors. (2020, March 24). Mussidae. In Wikipedia, The Free Encyclopedia. Retrieved 21:51, April 11, 2020, from <a href=“https://en.wikipedia.org/w/index.php?title=Mussidae&oldid=947066903" target="_blank">Link</a>',
				},
				{
					key: "taxon_family_name",
					value: "Oculinidae",
					value_display_name: "Oculinidae",
					subgroup: null,
					checked: true,
					image: 'images/oculinidae.jpg',
					image_credit: 'By NOAA - <a rel="nofollow" class="external free" href="https://www.flickr.com/photos/40322276@N04/7222547154/" target="_blank">https://www.flickr.com/photos/40322276@N04/7222547154/</a>, Public Domain, <a href="https://commons.wikimedia.org/w/index.php?curid=45581093" target="_blank">Link</a>',
					description: 'Members of the family Oculinidae are characterised by having the walls of the corallites (the cups which house the polyps) being composed of solid walled though rather fragile tubes connected by a smooth skeletal material called coenosteum. The corallites are widely spaced and robust. The septa (ridges on the corallite walls) curve noticeably outward giving the coral a spiky appearance. Many species in this family form a symbiotic relationship with the flagellate protozoa zooxanthellae which live within the tissues of the polyps. These are photosynthetic algae that provide nutrients for the polyps while themselves benefiting from a safe environment and an elevated, sunny position.',
					description_credit: 'Wikipedia contributors. (2020, March 8). Oculinidae. In Wikipedia, The Free Encyclopedia. Retrieved 21:56, April 11, 2020, from <a href=“https://en.wikipedia.org/w/index.php?title=Oculinidae&oldid=944570516 target="_blank">Link</a>',
				},
				{
					key: "taxon_family_name",
					value: "Poritidae",
					value_display_name: "Poritidae",
					subgroup: null,
					checked: true,
					image: 'images/poritidae.jpg',
					image_credit: 'By <a rel="nofollow" class="external text" href="https://www.flickr.com/people/47445767@N05" target="_blank">James St. John</a> - <a rel="nofollow" class="external text" href="https://www.flickr.com/photos/jsjgeology/16066417536/">Porites porites porites (clubbed finger coral) (San Salvador Island, Bahamas) 5</a>, <a href="https://creativecommons.org/licenses/by/2.0" target="_blank" title="Creative Commons Attribution 2.0">CC BY 2.0</a>, <a href="https://commons.wikimedia.org/w/index.php?curid=39945547" target="_blank">Link</a>',
					description: 'Poritidae is a family of stony corals such as finger corals and mustard hill corals. Members of the family are colonial hermatypic (reef-building) corals. They are variable in size and form but most are massive, laminar or ramose as well as branching and encrusting. The corallites are compact with very little coenosteum covering the skeleton. The walls of the corallites and the septa are porous.',
					description_credit: 'Wikipedia contributors. (2018, August 23). Poritidae. In Wikipedia, The Free Encyclopedia. Retrieved 22:01, April 11, 2020, from <a href=“https://en.wikipedia.org/w/index.php?title=Poritidae&oldid=856241638" target="_blank">Link</a>',
				},
				{
					key: "taxon_family_name",
					value: "Siderastreidae",
					value_display_name: "Siderastreidae",
					subgroup: null,
					checked: true,
					image: 'images/siderastreidae.jpg',
					image_credit: 'By Ryan McMinds - <a rel="nofollow" class="external free" href="https://www.flickr.com/photos/131967103@N02/27526590183/in/pool-gcmp/" target="_blank">https://www.flickr.com/photos/131967103@N02/27526590183/in/pool-gcmp/</a>, <a href="https://creativecommons.org/licenses/by/2.0" target="_blank" title="Creative Commons Attribution 2.0">CC BY 2.0</a>, <a href="https://commons.wikimedia.org/w/index.php?curid=51873282" target="_blank">Link</a>',
					description: 'Siderastreidae is a family of reef building stony corals that include species such as massive starlet corals. Members of this family are colonial, hermatypic (reef-building) corals. The corals vary in form and include massive, thickly encrusting, columnar, and irregular forms. The corallites are linked by flowing septa that have granular margins and that are fused in the centre to give fan-shaped or star-shaped groupings. The corallites do not project from the surface of the coral and have ill-defined walls formed from thickened septa.',
					description_credit: 'Wikipedia contributors. (2019, October 29). Siderastreidae. In Wikipedia, The Free Encyclopedia. Retrieved 22:07, April 11, 2020, from <a href=“https://en.wikipedia.org/w/index.php?title=Siderastreidae&oldid=923598075" target="_blank">Link</a>',
				},
				{
					key: "taxon_genus_name",
					value: "Acropora",
					// value_display_name: "Table, Elkhorn, and Staghorn Corals",
					value_display_name: "Acropora",
					subgroup: null,
					checked: true,
					image: 'images/acropora.jpg',
					image_credit: 'By <a href="//commons.wikimedia.org/wiki/User:Tisquesusa" target="_blank" title="User:Tisquesusa">Tisquesusa</a> - <span class="int-own-work" lang="en">Own work</span>, <a href="https://creativecommons.org/licenses/by/4.0" target="_blank" title="Creative Commons Attribution 4.0">CC BY 4.0</a>, <a href="https://commons.wikimedia.org/w/index.php?curid=71274985" target="_blank">Link</a>',
					description: 'Acropora is a genus of small polyp stony coral in the phylum Cnidaria. Some of its species are known as table coral, elkhorn coral, and staghorn coral. Over 149 species are described. Acropora species are some of the major reef corals responsible for building the immense calcium carbonate substructure that supports the thin living skin of a reef. Environmental destruction has led to a dwindling of populations of Acropora, along with other coral species. Acropora is especially susceptible to bleaching when stressed. Bleaching is due to the loss of the coral\'s zooxanthellae, which are a golden-brown color. Bleached corals are stark white and may die if new Symbiodinium cells cannot be assimilated.',
					description_credit: 'Wikipedia contributors. (2020, March 6). Acropora. In Wikipedia, The Free Encyclopedia. Retrieved 22:10, April 11, 2020, from <a href=“https://en.wikipedia.org/w/index.php?title=Acropora&oldid=944170383" target="_blank">Link</a>',
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
					value_display_name: "Parrotfishes",
					subgroup: 'Herbivorous',
					checked: true,
					image: 'images/parrotfish.jpg',
					image_credit: 'By <a rel="nofollow" class="external text" href="https://www.flickr.com/people/39136124@N00">Paul Asman and Jill Lenoble</a> - <a rel="nofollow" class="external text" href="https://www.flickr.com/photos/pauljill/4686630424/">rainbow parrotfish Scarus guacamaia</a>Uploaded by <a href="//commons.wikimedia.org/wiki/User:Amada44" title="User:Amada44">Amada44</a>, <a href="https://creativecommons.org/licenses/by/2.0" title="Creative Commons Attribution 2.0">CC BY 2.0</a>, <a href="https://commons.wikimedia.org/w/index.php?curid=25257260">Link</a>',
					description: 'Parrotfishes are heribivorous fish that feed on harmful benthic detractors like macroalgae. They are named for their dentition, which is distinct from other fish, including other labrids. Their numerous teeth are arranged in a tightly packed mosaic on the external surface of their jaw bones, forming a parrot-like beak with which they rasp algae from coral and other rocky substrates (which contributes to the process of bioerosion).',
					description_credit: 'Wikipedia contributors. (2020, February 25). Parrotfish. In Wikipedia, The Free Encyclopedia. Retrieved 00:03, April 12, 2020, from https://en.wikipedia.org/w/index.php?title=Parrotfish&oldid=942548038">Link</a>'
				},
				{
					key: "taxon_family_name",
					value: "Acanthuridae",
					value_display_name: "Surgeonfishes, Tangs, Unicornfishes",
					subgroup: 'Herbivorous',
					checked: true,
					image: 'images/acanthuridae.jpg',
					image_credit: 'By <a href="//commons.wikimedia.org/wiki/User:Holleday" title="User:Holleday">H. Krisp</a> - <span class="int-own-work" lang="en">Own work</span>, <a href="https://creativecommons.org/licenses/by/3.0" title="Creative Commons Attribution 3.0">CC BY 3.0</a>, <a href="https://commons.wikimedia.org/w/index.php?curid=15477882">Link</a>',
					description: 'Acanthuridae are the family of surgeonfishes, tangs, and unicornfishes. The family includes about 86 extant species of herbivorous marine fish living in tropical seas, usually around coral reefs. The distinctive characteristic of the family is that they have scalpel-like modified scales, one or more on either side of the peduncle of the tail. The spines are dangerously sharp and may seriously injure anyone who carelessly handles such a fish. The dorsal, anal, and caudal fins are large, extending for most of the length of the body. The mouths are small and have a single row of teeth adapted to grazing on algae.',
					description_credit: 'Wikipedia contributors. (2019, December 12). Acanthuridae. In Wikipedia, The Free Encyclopedia. Retrieved 00:08, April 12, 2020, from https://en.wikipedia.org/w/index.php?title=Acanthuridae&oldid=930429476">Link</a>'
				},
				{
					key: "taxon_family_name",
					value: "Serranidae",
					value_display_name: "Groupers",
					subgroup: 'Piscivorous',
					checked: true,
					image: 'images/grouper.jpg',
					image_credit: 'By <a href="//commons.wikimedia.org/wiki/User:Albert_kok" title="User:Albert kok">Albert kok</a> - <span class="int-own-work" lang="en">Own work</span>, <a href="https://creativecommons.org/licenses/by-sa/4.0" title="Creative Commons Attribution-Share Alike 4.0">CC BY-SA 4.0</a>, <a href="https://commons.wikimedia.org/w/index.php?curid=76645257">Link</a>',
					description: 'Groupers are piscivorous reef-dwelling fish and are one of the most important species in a reef’s ecosystem. They habitually eat fish, octopuses, and crustaceans, some of which are harmful to corals. This means they play an important role in controlling populations of species that inhibit coral growth. They typically having a stout body and a large mouth. They swallow prey rather than biting pieces off it. They do not have many teeth on the edges of their jaws, but they have heavy crushing tooth plates inside the pharynx.',
					description_credit: 'Wikipedia contributors. (2020, February 2). Grouper. In Wikipedia, The Free Encyclopedia. Retrieved 23:55, April 11, 2020, from https://en.wikipedia.org/w/index.php?title=Grouper&oldid=938796445">Link</a>',
				},
				{
					key: "taxon_family_name",
					value: "Haemulidae",
					value_display_name: "Grunts",
					subgroup: 'Piscivorous',
					checked: true,
					image: 'images/grunt.jpg',
					image_credit: 'By <a rel="nofollow" class="external text" href="https://www.flickr.com/people/39136124@N00">Paul Asman and Jill Lenoble</a> - <a rel="nofollow" class="external text" href="https://www.flickr.com/photos/pauljill/3475244764/">french and smallmouth grunt Haemulon flavolineatum and chrysargyreum</a>Uploaded by <a href="//commons.wikimedia.org/wiki/User:Amada44" title="User:Amada44">Amada44</a>, <a href="https://creativecommons.org/licenses/by/2.0" title="Creative Commons Attribution 2.0">CC BY 2.0</a>, <a href="https://commons.wikimedia.org/w/index.php?curid=25298536">Link</a>',
					description: 'Haemulidae is a family of piscivorous fishes in the order Perciformes known commonly as grunts. There are about 133 species in 19 genera. These fish are found in tropical fresh, brackish, and saltwaters around the world. They are bottom-feeding predators, named for their ability to produce sound by grinding their teeth. They also engage in mutualistic relationship with cleaner gobies of genus Elacatinus, allowing them to feed on ectoparasites on their bodies.',
					description_credit: 'Wikipedia contributors. (2019, December 3). Haemulidae. In Wikipedia, The Free Encyclopedia. Retrieved 00:11, April 12, 2020, from https://en.wikipedia.org/w/index.php?title=Haemulidae&oldid=929029473">Link</a>'
				},
				{
					key: "taxon_family_name",
					value: "Lutjanidae",
					value_display_name: "Snappers",
					subgroup: 'Piscivorous',
					checked: true,
					image: 'images/snapper.jpg',
					image_credit: 'By <a href="//commons.wikimedia.org/wiki/User:Albert_kok" title="User:Albert kok">Albert kok</a> - <span class="int-own-work" lang="en">Own work</span>, <a href="https://creativecommons.org/licenses/by-sa/3.0" title="Creative Commons Attribution-Share Alike 3.0">CC BY-SA 3.0</a>, <a href="https://commons.wikimedia.org/w/index.php?curid=3489462">Link</a>',
					description: 'Snappers inhabit tropical and subtropical regions of all oceans and are important piscorovous predators in reef systems. Some snappers grow up to about 1 m (3.3 ft) in length however one specific Snapper, the Cubera Snapper, grows up to 5 ft in length. Most are active carnivores, feeding on crustaceans or other fish, though a few are plankton-feeders.',
					description_credit: 'Wikipedia contributors. (2020, March 20). Lutjanidae. In Wikipedia, The Free Encyclopedia. Retrieved 00:25, April 12, 2020, from https://en.wikipedia.org/w/index.php?title=Lutjanidae&oldid=946436630">Link</a>'
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
					value_display_name: "Coralline Algae",
					subgroup: 'Promoter',
					checked: true,
					image: 'images/corallinales.jpg',
					image_credit: 'By <a href="//commons.wikimedia.org/wiki/User:Pbsouthwood" title="User:Pbsouthwood">Pbsouthwood</a> - <span class="int-own-work" lang="en">Own work</span>, <a href="https://creativecommons.org/licenses/by-sa/3.0" title="Creative Commons Attribution-Share Alike 3.0">CC BY-SA 3.0</a>, <a href="https://commons.wikimedia.org/w/index.php?curid=26279827">Link</a>',
					description: 'Coralline algae are red algae in the order Corallinales. They are characterized by a thallus that is hard because of calcareous deposits contained within the cell walls. The colors of these algae are most typically pink, or some other shade of red, but some species can be purple, yellow, blue, white, or gray-green. Coralline algae play an important role in the ecology of coral reefs. A close look at almost any intertidal rocky shore or coral reef will reveal an abundance of pink to pinkish-grey patches, distributed throughout the rock surfaces. These patches of pink "paint" are actually living crustose coralline red algae.',
					description_credit: 'Wikipedia contributors. (2020, February 22). Coralline algae. In Wikipedia, The Free Encyclopedia. Retrieved 01:49, April 12, 2020, from https://en.wikipedia.org/w/index.php?title=Coralline_algae&oldid=942125566">Link</a>'
				},
				{
					key: "taxon_order_name",
					value: "Nostoc",
					value_display_name: "Cyanobacteria",
					subgroup: 'Detractor',
					checked: true,
					image: 'images/cyanobacteria.jpg',
					image_credit: 'By <a rel="nofollow" class="external text" href="https://www.flickr.com/people/93242958@N00">Derek Keats</a> from Johannesburg, South Africa - <a rel="nofollow" class="external text" href="https://www.flickr.com/photos/dkeats/6165864891/">Red cyanobacteria on dead gorgonian</a>, <a href="https://creativecommons.org/licenses/by/2.0" title="Creative Commons Attribution 2.0">CC BY 2.0</a>, <a href="https://commons.wikimedia.org/w/index.php?curid=24230008">Link</a>',
					description: 'Aquatic cyanobacteria are known for their extensive and highly visible blooms that can form in both freshwater and marine environments. In coral reef environments, corals can become overgrown by cyanobacteria which prevents coral reproduction and growth. The blooms can have the appearance of blue-green paint or scum. These blooms can be toxic, and frequently lead to the closure of recreational waters when spotted.',
					description_credit: 'Wikipedia contributors. (2020, April 11). Cyanobacteria. In Wikipedia, The Free Encyclopedia. Retrieved 00:42, April 12, 2020, from https://en.wikipedia.org/w/index.php?title=Cyanobacteria&oldid=950337193">Link</a>'
				},
				{
					key: "taxon_genus_name",
					value: "Halimeda",
					value_display_name: 'Halimeda',
					subgroup: 'Detractor',
					checked: true,
					image: 'images/halimeda.jpg',
					image_credit: 'By Philippe Bourjon - The uploader on Wikimedia Commons received this from the author/copyright holder., <a href="https://creativecommons.org/licenses/by-sa/4.0" title="Creative Commons Attribution-Share Alike 4.0">CC BY-SA 4.0</a>, <a href="https://commons.wikimedia.org/w/index.php?curid=35081064">Link</a>',
					description: 'Halimeda is a genus of green macroalgae. The algal body (thallus) is composed of calcified green segments. Calcium carbonate is deposited in its tissues, making it inedible to most herbivores.',
					description_credit: 'Wikipedia contributors. (2019, November 1). Halimeda. In Wikipedia, The Free Encyclopedia. Retrieved 01:51, April 12, 2020, from https://en.wikipedia.org/w/index.php?title=Halimeda&oldid=924116832">Link</a>'
				},
				{
					key: "taxon_genus_name",
					value: "Caulerpa",
					value_display_name: "Caulerpa",
					subgroup: 'Detractor',
					checked: true,
					image: 'images/caulerpa.jpg',
					image_credit: 'By Dr. Robert Ricker, NOAA/NOS/ORR - <a rel="nofollow" class="external free" href="http://www.photolib.noaa.gov/bigs/rikr0034.jpg">http://www.photolib.noaa.gov/bigs/rikr0034.jpg</a>, Public Domain, <a href="https://commons.wikimedia.org/w/index.php?curid=16457639">Link</a>',
					description: 'Caulerpa is a genus of seaweeds in the family Caulerpaceae (among the green algae) and includes species such as green feather algae and sea grapes. Most Caulerpa species evolved in tropical waters, where herbivores have immunity to toxic compounds within the alga. Temperate water herbivores have no natural immunity to these toxins, allowing Caulerpa to grow unchecked if introduced to temperate waters.',
					description_credit: 'Wikipedia contributors. (2019, December 18). Caulerpa. In Wikipedia, The Free Encyclopedia. Retrieved 01:11, April 12, 2020, from https://en.wikipedia.org/w/index.php?title=Caulerpa&oldid=931439253">Link</a>'
				},
				{
					key: "taxon_genus_name",
					value: "Cliona",
					value_display_name: "Cliona",
					subgroup: 'Detractor',
					checked: true,
					image: 'images/cliona.jpg',
					image_credit: 'By The original uploader was <a href="https://en.wikipedia.org/wiki/fr:User:Elapied" class="extiw" title="w:fr:User:Elapied">Elapied</a> at <a href="https://en.wikipedia.org/wiki/fr:" class="extiw" title="w:fr:">French Wikipedia</a>. - Transferred from <span class="plainlinks"><a class="external text" href="https://fr.wikipedia.org">fr.wikipedia</a></span> to Commons., <a href="https://creativecommons.org/licenses/by-sa/2.0/fr/deed.en" title="Creative Commons Attribution-Share Alike 2.0 fr">CC BY-SA 2.0 fr</a>, <a href="https://commons.wikimedia.org/w/index.php?curid=1931236">Link</a>',
					description: 'Cliona is a genus of demosponges that includes species of burrowing sponges such as cliona delitrix. This sponge is found in shallow water in the Caribbean Sea and the Gulf of Mexico. It usually grows on a massive coral, not only covering its surface but also burrowing into its interior, but is sometimes found on some other calcareous substrate such as a shell or a limestone rock. It does not normally grow on branching corals.',
					description_credit: 'Wikipedia contributors. (2019, December 18). Cliona delitrix. In Wikipedia, The Free Encyclopedia. Retrieved 01:18, April 12, 2020, from https://en.wikipedia.org/w/index.php?title=Cliona_delitrix&oldid=931427566">Link</a>'
				},
				{
					key: "taxon_class_name",
					value: "Phaeophyceae",
					value_display_name: "Brown Algae",
					subgroup: 'Detractor',
					checked: true,
					image: 'images/phaeophyceae.jpg',
					image_credit: 'By <a href="//commons.wikimedia.org/wiki/User:JanRehschuh" title="User:JanRehschuh">JanRehschuh</a> - <span class="int-own-work" lang="en">Own work</span>, <a href="https://creativecommons.org/licenses/by-sa/3.0" title="Creative Commons Attribution-Share Alike 3.0">CC BY-SA 3.0</a>, <a href="https://commons.wikimedia.org/w/index.php?curid=20541235">Link</a>',
					description: 'The brown algae, comprising the class Phaeophyceae, are a large group of multicellular algae, including many seaweeds located in colder waters within the Northern Hemisphere. Most brown algae live in marine environments, where they play an important role both as food and as a potential habitat. Particularly after mass coral mortality, macroalgae such as brown algae can overgrow areas of reef this dominating the ecosystem and detracting from coral growth.',
					description_credit: 'Wikipedia contributors. (2020, March 20). Brown algae. In Wikipedia, The Free Encyclopedia. Retrieved 01:31, April 12, 2020, from https://en.wikipedia.org/w/index.php?title=Brown_algae&oldid=946528121">Link</a>'
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
		// 			value_display_name: "Cyanobacteria",
		// 			checked: true
		// 		},
		// 		{
		// 			key: "taxon_genus_name",
		// 			value: "Halimeda",
		// 			value_display_name: null,
		// 			checked: true
		// 		},
		// 		{
		// 			key: "taxon_genus_name",
		// 			value: "Galaxaura",
		// 			value_display_name: null,
		// 			checked: true
		// 		},
		// 		{
		// 			key: "taxon_genus_name",
		// 			value: "Dictyota",
		// 			value_display_name: "Y-branched Algae",
		// 			checked: true
		// 		},
		// 		{
		// 			key: "taxon_genus_name",
		// 			value: "Caulerpa",
		// 			value_display_name: null,
		// 			checked: true
		// 		},
		// 		{
		// 			key: "taxon_genus_name",
		// 			value: "Cliona",
		// 			value_display_name: null,
		// 			checked: true
		// 		},
		// 		{
		// 			key: "taxon_genus_name",
		// 			value: "Peyssonnelia",
		// 			value_display_name: null,
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
		if(communityKey.value_display_name) {
			return communityKey.value_display_name + ' (' + taxonType + ' ' + communityKey.value + ')';
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