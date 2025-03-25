import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

type BubbleData = {
  label: string;
  count: number;
};

type SimulationBubbleNode = BubbleData & d3.SimulationNodeDatum;

type Props = {
  data: BubbleData[];
  onBubbleClick?: (label: string) => void;
};

const PackedBubbleChart: React.FC<Props> = ({ data, onBubbleClick }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!data.length || !svgRef.current) return;

    const container = svgRef.current?.parentElement;
    const width = container?.clientWidth ?? 800;
    const height = Math.min(width * 1.6, 800);

    const radiusScale = d3
      .scaleSqrt()
      .domain([0, d3.max(data, (d: BubbleData) => d.count)!])
      .range([10, 60]);

    d3.select(svgRef.current).selectAll('*').remove();

    const simulation = d3
      .forceSimulation<SimulationBubbleNode>(data)
      .force('charge', d3.forceManyBody().strength(5))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force(
        'collision',
        d3.forceCollide((d) => radiusScale(d.count) + 5)
      )
      .stop();

    for (let i = 0; i < 300; ++i) simulation.tick();

    // Clamp bubbles inside the viewBox
    (data as SimulationBubbleNode[]).forEach((d) => {
      const r = radiusScale(d.count);
      d.x = Math.max(r, Math.min(width - r, d.x ?? width / 2));
      d.y = Math.max(r, Math.min(height - r, d.y ?? height / 2));
    });

    const svg = d3.select(svgRef.current);

    const node = svg
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .append('g');

    const bubbles = node
      .selectAll('g')
      .data(data as SimulationBubbleNode[])
      .enter()
      .append('g')
      .attr('transform', (d) => `translate(${d.x},${d.y})`)
      .on('click', (event, d) => {
        if (onBubbleClick) onBubbleClick(d.label);
      });

    bubbles
      .append('circle')
      .attr('r', (d) => radiusScale(d.count))
      .attr('fill', 'rgba(54, 162, 235, 0.6)')
      .attr('stroke', '#333');

    // Add wrapped and centered text
    bubbles.each(function (d) {
      const words = d.label.split(' ');
      const maxLineLength = 10;
      const lines: string[] = [];
      let currentLine = '';

      words.forEach((word) => {
        if ((currentLine + ' ' + word).trim().length <= maxLineLength) {
          currentLine += ` ${word}`;
        } else {
          lines.push(currentLine.trim());
          currentLine = word;
        }
      });
      lines.push(currentLine.trim());

      // Remove any existing text
      d3.select(this).selectAll('text').remove();

      const text = d3
        .select(this)
        .append('text')
        .attr('text-anchor', 'middle')
        .style('font-size', '10px')
        .style('fill', '#000')
        .style('pointer-events', 'none');

      const lineHeight = 1.2; // em
      const startDy =
        (-((lines.length - 1) / 2) * lineHeight).toFixed(2) + 'em';

      lines.forEach((line, i) => {
        text
          .append('tspan')
          .text(line)
          .attr('x', 0)
          .attr('dy', i === 0 ? startDy : lineHeight + 'em');
      });
    });
  }, [data, onBubbleClick]);

  return (
    <svg
      ref={svgRef}
      style={{ width: '100%', height: '100%', minHeight: '300px' }}
    />
  );
};

export default PackedBubbleChart;
