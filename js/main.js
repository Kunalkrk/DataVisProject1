console.log("Hello world");

d3.csv('data/exoplanets.csv')
  .then(data => {
  	console.log('Data loading complete. Work with dataset.');
    console.log(data);

    //process the data - this is a forEach function.  You could also do a regular for loop....
    data.forEach(d => { //ARROW function - for each object in the array, pass it as a parameter to this function
      	d.pl_name = d.pl_name;
	    d.discoverymethod = d.discoverymethod;
		d.sy_snum = +d.sy_snum;
		d.sy_pnum = +d.sy_pnum;
		d.disc_year = +d.disc_year;
		d.pl_orbsmax = +d.pl_orbsmax;
		d.pl_rade = +d.pl_rade;
		d.pl_bmasse = +d.pl_bmasse;
		d.pl_orbeccen = +d.pl_orbeccen;
		d.st_rad = +d.st_rad;
		d.st_mass = +d.st_mass;
		d.sy_dist = +d.sy_dist;
  	});

  	let minStar = d3.min( data, d => d.sy_snum);
  	let maxStar = d3.max( data, d => d.sy_snum);

  	let numPlanetsPerStar = []; //this will be our data for the line chart
  	for(let i = minStar; i <= maxStar; i++) {

		let planetsPerStar_list = data.filter(d => d.sy_snum == i);//only include the selected year

		let planetsPerStar = d3.count(planetsPerStar_list, d => d.sy_snum); //sum over the filtered array, for the cost field

		numPlanetsPerStar.push({key: i, value: planetsPerStar});
	}

	  let minPlanet = d3.min( data, d => d.sy_pnum);
	  let maxPlanet = d3.max( data, d => d.sy_pnum);
	  let numPlanetsPerExoPlanet = []; //this will be our data for the line chart
	  for(let i = minPlanet; i <= maxPlanet; i++) {

		  let planetsPerExoPlanet_list = data.filter(d => d.sy_pnum == i);//only include the selected year

		  let planetsPerExoPlanet = d3.count(planetsPerExoPlanet_list, d => d.sy_pnum); //sum over the filtered array, for the cost field

		  numPlanetsPerExoPlanet.push({key: i, value: planetsPerExoPlanet});
	  }

	  let discovery_method = d3.map(data, function(d) { return d.discoverymethod; });
	  // let discovery_method = ["Transit Timing Variations", "Transit", "Radial Velocity", ];
	  // let test = d3.map(data, function (d) {discovery_method.push(d.discoverymethod);});
	  // console.log(Array.from(discovery_method));

	  let unique = Array.from(discovery_method);
	  let new_unique = unique.filter(function(item, pos){
		  return unique.indexOf(item)== pos;
	  });

	  let disc_methods = []; //this will be our data for the line chart
	  for(let i = 0; i < new_unique.length; i++) {

		  let discovery_method_true = data.filter(d => d.discoverymethod == new_unique[i]);//only include the selected year
		  console.log(discovery_method_true);

		  let planetsPerDiscoveryMethod = d3.count(discovery_method_true, d => d.sy_pnum); //sum over the filtered array, for the cost field

		  disc_methods.push({key: new_unique[i], value: planetsPerDiscoveryMethod});
	  }

	  let discYears = d3.map(data, function(d) { return d.disc_year; });
	  let unique_years = Array.from(discYears);
	  let new_unique_years = unique_years.filter(function(item, pos){
		  return unique_years.indexOf(item)== pos;
	  });

	  new_unique_years.sort();

	  let disc_years = []; //this will be our data for the line chart
	  for(let i = 0; i < new_unique_years.length; i++) {

		  let num_years = data.filter(d => d.disc_year == new_unique_years[i]);//only include the selected year
		  console.log(d3.timeParse("%Y-%m-%d")(new_unique_years[i]));

		  let planetsPerYear = d3.count(num_years, d => d.sy_pnum); //sum over the filtered array, for the cost field

		  disc_years.push({key: d3.timeParse("%d/%m/%Y")(new_unique_years[i]), value: planetsPerYear});
	  }

	  console.log(disc_years);

	  let radii = d3.map(data, function(d) { return d.pl_rade; });
	  radii = Array.from(radii);

	  let masses = d3.map(data, function(d) { return d.pl_bmasse; });
	  masses = Array.from(masses);

	  let scatter_data = []; //this will be our data for the line chart

	  for(let i = 0; i < 5243; i++) {

		  if(masses[i] != 239000) {
			  scatter_data.push({key: radii[i], value: masses[i]});
		  }

	  }

	  console.log(scatter_data);

  	// Create an instance (for example in main.js)
	  let barCh1 = new BarChart({
		  'parentElement': '#barchart1',
		  'containerHeight': 500,
		  'containerWidth': 600
	  }, numPlanetsPerStar, "No. of stars for each exo-planet", "No. of stars", "No. of exo-planets", 15);

	  let barCh2 = new BarChart({
		  'parentElement': '#barchart2',
		  'containerHeight': 500,
		  'containerWidth': 600
	  }, numPlanetsPerExoPlanet, "No. of planets for each exo-planet", "No. of planets", "No. of exo-planets", 15);

	  let barCh4 = new BarChart({
		  'parentElement': '#barchart4',
		  'containerHeight': 500,
		  'containerWidth': 600
	  }, disc_methods, "No. of exo-planets for each discovery method", "Discovery Method", "No. of exo-planets", 8);

	  // let lineCh = new LineChart({
		//   'parentElement': '#linechart',
		//   'containerHeight': 500,
		//   'containerWidth': 600
	  // }, disc_years, "No. of exo-planets discovered by year", "Year", "No. of exo-planets", 8);

	  let scPlot = new Scatter({
		  'parentElement': '#scatterplot',
		  'containerHeight': 500,
		  'containerWidth': 600
	  }, scatter_data, "Exo-planets Radius and Mass", "Radius", "Mass", 8);


  })
.catch(error => {
    console.error('Error loading the data');
});


/// OLD VERSION.... 
// function drawChart(data){

// 	console.log("Let's draw a chart!!");
	

// 	// Margin object with properties for the four directions
// 	const margin = {top: 40, right: 50, bottom: 10, left: 50};

// 	// Width and height as the inner dimensions of the chart area
// 	const width = 1000 - margin.left - margin.right;
// 	const height = 1100 - margin.top - margin.bottom;

// 	// Define 'svg' as a child-element (g) from the drawing area and include spaces
// 	// Add <svg> element (drawing space)
// 	const svg = d3.select('body').append('svg')
// 	    .attr('width', width + margin.left + margin.right)
// 	    .attr('height', height + margin.top + margin.bottom)
// 	    .append('g')
// 	    .attr('transform', `translate(${margin.left}, ${margin.top})`);

// 	// Initialize linear and ordinal scales (input domain and output range)
// 	const xScale = d3.scaleLinear()
// 		.domain([0, 365])
// 		.range([0, width]);

// 	console.log(d3.min(data, d => d.year) );

// 	const yScale = d3.scaleLinear()
// 		.domain([d3.max(data, d => d.year), d3.min( data, d => d.year)]) 
// 		.range([0, height]);

// 	const rScale = d3.scaleLinear()
// 		.domain(d3.extent(data, d=> d.cost))
// 		.range([5, 100]);

// 	// Construct a new ordinal scale with a range of ten categorical colours
// 	let colorPalette = d3.scaleOrdinal(d3.schemeTableau10)
// 	colorPalette.domain( "tropical-cyclone", "drought-wildfire", "severe-storm", "flooding" );

// 		// Initialize axes
// 		const xAxis = d3.axisTop(xScale);
// 		const yAxis = d3.axisLeft(yScale);

// 		// Draw the axis
// 		const xAxisGroup = svg.append('g')
// 		  .attr('class', 'axis x-axis') 
// 		  .call(xAxis);

// 		const yAxisGroup = svg.append('g')
// 		  .attr('class', 'axis y-axis')
// 		  .call(yAxis);

// 		//Add circles for each event in the data
// 	svg.selectAll('circle')
// 	    .data(data)
// 	    .enter()
// 	  .append('circle')
// 	  	.attr('fill', (d) => colorPalette(d.category) )
// 	    .attr('opacity', .8)
// 	    .attr('stroke', "gray")
// 	    .attr('stroke-width', 2)
// 	    .attr('r', (d) => rScale(d.cost) ) 
// 	    .attr('cy', (d) => yScale(d.year) ) 
// 	    .attr('cx',(d) =>  xScale(d.daysFromYrStart) );


// }

function computeDays(disasterDate){
  	let tokens = disasterDate.split("-");

  	let year = +tokens[0];
  	let month = +tokens[1];
  	let day = +tokens[2];

    return (Date.UTC(year, month-1, day) - Date.UTC(year, 0, 0)) / 24 / 60 / 60 / 1000 ;

  }