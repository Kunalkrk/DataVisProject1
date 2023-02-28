class tabless {

    constructor(_config, _data) {
        this.config = {
            parentElement: _config.parentElement,
            containerWidth: _config.containerWidth || 500,
            containerHeight: _config.containerHeight || 140,
            margin: { top: 100, bottom: 100, right: 100, left: 100 }
        }
        this.data = _data;

        // Call a class function
        this.initVis();
    }

    initVis() {
        let vis = this;

        vis.width = vis.config.containerWidth - vis.config.margin.left - vis.config.margin.right;
        vis.height = vis.config.containerHeight - vis.config.margin.top - vis.config.margin.bottom;

        // Define size of SVG drawing area
        vis.svg = d3.select(vis.config.parentElement)
            .attr('width', vis.config.containerWidth)
            .attr('height', vis.config.containerHeight);

        function tabulate(data, columns) {
            var table = d3.select(vis.config.parentElement).append('table')
            var thead = table.append('thead')
            var	tbody = table.append('tbody');
        
            // append the header row
            thead.append('tr')
              .selectAll('th')
              .data(columns).enter()
              .append('th')
                .text(function (column) { return column; });
        
            // create a row for each object in the data
            var rows = tbody.selectAll('tr')
              .data(data)
              .enter()
              .append('tr');
        
            // create a cell in each row for each column
            var cells = rows.selectAll('td')
              .data(function (row) {
                return columns.map(function (column) {
                  return {column: column, value: row[column]};
                });
              })
              .enter()
              .append('td')
                .text(function (d) { return d.value; });
        
          return table;
        }

        vis.svg.append(tabulate(vis.data, ['pl_name']));
    }
}