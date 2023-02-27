class LineChart {

    constructor(_config, _data, _title, _xLabel, _yLabel, _font_size) {
        this.config = {
            parentElement: _config.parentElement,
            containerWidth: _config.containerWidth || 500,
            containerHeight: _config.containerHeight || 140,
            margin: { top: 100, bottom: 100, right: 100, left: 100 }
        }
        this.data = _data;
        this.title = _title;
        this.xLabel = _xLabel;
        this.yLabel = _yLabel;
        this.font_size = _font_size;

        // Call a class function
        this.initVis();
    }

    initVis() {
        let vis = this;

        // let tip = d3.select(".chart-container")
        //     .append("div")
        //     .attr("class", "tip")
        //     .style("position", "absolute")
        //     .style("z-index", "10")
        //     .style("visibility", "hidden");

        vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
        vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;

        // Define size of SVG drawing area
        vis.svg = d3.select(vis.config.parentElement)
            .attr('width', vis.config.containerWidth)
            .attr('height', vis.config.containerHeight);

        // vis.svg = d3.select("#test");
        // vis.margin = 200;
        // vis.width = vis.svg.attr("width") - vis.margin;
        // vis.height = vis.svg.attr("height") - vis.margin;

        console.log(vis.width);
        console.log(vis.height);

        // vis.xValue = d => d.star;
        // vis.yValue = d => d.numPlanets;

        // function(d){
        //     return {key : d3.timeParse("%d/%m/%Y")(d.key),
        //         value : d.value}
        // };

        vis.g = vis.svg.append("g")
            .attr("transform", "translate(" + 100 + "," + 100 + ")");

        vis.xScale = d3.scaleTime()
            .domain(d3.extent(vis.data, function(d) { return d.key; }))
            .range([ 0, vis.width ]);
        vis.yScale = d3.scaleLinear()
            .domain([0, d3.max(vis.data, function(d) { return d.value; })])
            .range([vis.height, 0]);



        // vis.xScale.domain(vis.data.map(function(d) { return d.key; }));
        // vis.yScale.domain([0, d3.max(vis.data, function(d) { return d.value; })]);

        vis.svg.append("text")
            .attr("transform", "translate(100,0)")
            .attr("x", vis.width/2)
            .attr("y", 75)
            .attr("text-anchor", "middle")
            .attr("font-size", "24px")
            .text(vis.title);

        vis.g.append("g")
            .attr("transform", "translate(0," + vis.height + ")")
            .call(d3.axisBottom(vis.xScale))
            .selectAll("text")
            .attr("transform", "translate(-10,10)rotate(-45)")
            .style("text-anchor", "end")
            .style("font-size", vis.font_size)
            .style("fill", "#69a3b2");

        vis.g.append("g")
            .attr("transform", "translate(0," + vis.height + ")")
            .append("text")
            .attr("y", vis.height - 236)
            .attr("x", vis.width/2)
            .attr("text-anchor", "middle")
            .attr("stroke", "black")
            .style("font-size", vis.font_size + 2)
            .text(vis.xLabel);

        vis.g.append("g")
            .call(d3.axisLeft(vis.yScale).tickFormat(function(d){
                return d;
            })
                .ticks(10))
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -vis.height/2)
            .attr("y", 15)
            .attr("dy", "-5.1em")
            .attr("text-anchor", "middle")
            .attr("stroke", "black")
            .text(vis.yLabel);

       console.log("here");

       vis.g.append("path")
            .datum(vis.data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", d3.line()
                .x(function(d) { return vis.xScale(d.key) })
                .y(function(d) { return vis.yScale(d.value) }));
            // .on("mouseover", function(event, d) {return tip.text(d.value).style("visibility", "visible").style("top", (event.pageY - 20) + 'px' ).style("left", event.pageX - 50 + 'px')})
            // .on("mouseout", function(){return tip.style("visibility", "hidden");});


        // line.append("text")
        //     .text(function(d) {
        //         return d.value;
        //     })
        //     .attr("x", function(d){
        //         return vis.xScale(d.key) + vis.xScale.bandwidth()/2;
        //     })
        //     .attr("y", function(d){
        //         return vis.yScale(d.value) - 5;
        //     })
        //     .attr("font-family" , "sans-serif")
        //     .attr("font-size" , "14px")
        //     .attr("fill" , "black")
        //     .attr("text-anchor", "middle");
    }
}