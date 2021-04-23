import * as d3 from 'd3';
import moment from 'moment';

export function heatMap(data) {
  const rectHeight = 25;

  const daysLabels = Array.from(new Set(data.map((d) => moment(d.timestamp).format('DD.MM'))));
  const hourLabels = Array.from(new Set(data.map((d) => moment(d.timestamp).format('HH'))));
  const minValue = d3.min(data.map((d) => d.value['PM2.5']));
  const maxValue = d3.max(data.map((d) => d.value['PM2.5']));
  const formatted = data.map((d) => {
    return {
      date: moment(d.timestamp).format('DD.MM'),
      hour: moment(d.timestamp).format('HH'),
      value: d.value['PM2.5'],
    }
  });

  const svgHeight = rectHeight * hourLabels.length + 80;

  d3.select('.svg-box').remove();
  d3.select('.tooltip_box').remove();

  const svg = d3.select(`.p-tabview-panels`)
    .append('svg')
    .classed('svg-box', true)
    .attr('height', svgHeight);

  svg.append('text')
    .classed('label_text_left', true)
    .text('Y label')
    .attr('x', -svgHeight / 2)
    .attr('y', 20);
    
  svg.append('text')
    .classed('label_text_bottom', true)
    .text('X label')
    .attr('x', 500)
    .attr('y', svgHeight - 10);

  // x ax scale and rendering
  var x = d3.scaleBand()
    .range([ 0, 940 ])
    .domain(daysLabels)
    .padding(0.05);

  svg.append('g')
    .style('font-size', 12)
    .style('color', 'blue')
    .style('font-weight', 'bold')
    .attr('transform', `translate(45, ${svgHeight - 40})`)
    .call(d3.axisBottom(x).tickSize(0))
    .select('.domain').remove();

  // y ax scale and rendering
  const y = d3.scaleBand()
    .range([ svgHeight - 55, 0 ])
    .domain(hourLabels)
    .padding(0.05);

  svg.append('g')
    .style('font-size', 12)
    .style('color', 'blue')
    .style('font-weight', 'bold')
    .attr('transform', `translate(45, 15)`)
    .call(d3.axisLeft(y).tickSize(0))
    .select('.domain').remove();

// Tooltip
const tooltip = d3.select('.p-tabview-panels')
  .append('div')
    .classed('tooltip_box hidden', true);

tooltip.append('span')
  .classed('tooltip_span', true); 

  //Colors
  const colors = d3.scaleSequential()
    .interpolator(d3.interpolateBlues)
    .domain([minValue, maxValue]);
  // Mouse events functions
  const mouseover = (e) => {
    tooltip
      .classed('hidden', false)
      .html(`<p>Date: ${e.target.dataset.x}</p>
             <p>Hour: ${e.target.dataset.y}</p>
             <p>Value: ${e.target.dataset.value}</p>`)
      .transition().duration(500)
      .style("left", +d3.select(e.target).attr('x') + 95 + "px")
      .style("top", +d3.select(e.target).attr('y') - 5 + "px");
    d3.select(e.target)
      .style('stroke', 'black')
      .style('opacity', 1);
  }

  const mouseleave = (e) => {
    tooltip
      .classed('hidden', true)
    d3.select(e.target)
      .style('stroke', 'none')
      .style('opacity', 0.8);
  }
  
  // Grids
  svg.append('g')
  .attr('transform', 'translate(47, 12)')
  .selectAll('rect')
  .data(formatted, (d) => d.date+':'+d.hour)
  .enter()
  .append('rect')
    .attr('x', (d) => x(d.date))
    .attr('y', (d) => y(d.hour))
    .attr('rx', 4)
    .attr('ry', 4)
    .attr('width', x.bandwidth())
    .attr('height', y.bandwidth())
    .attr('data-x', (d) => d.date)
    .attr('data-y', (d) => d.hour)
    .attr('data-value', (d) => d.value)
    .style('fill', 'gray')
    .style('stroke-width', 4)
    .style('stroke', 'none')
    .style('opacity', 0.8)
    .style('cursor', 'pointer')
    
  .on('mouseover', mouseover)
  //.on('mousemove', mousemove)
  .on('mouseleave', mouseleave)
  .transition().duration(1000)
    .style('fill', (d)=> colors(d.value))
}

export function f1(index) {
  d3.select('.svg-box').remove();
  d3.select(`.p-tabview-panels`)
    .append('svg')
    .classed('svg-box', true);
}

export function f2(index) {
  d3.select('.svg-box').remove();
  d3.select(`.p-tabview-panels`)
    .append('svg')
    .classed('svg-box', true);
}
