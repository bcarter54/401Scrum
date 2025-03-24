// PackedBubbleChart.tsx
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

// Original BubbleData shape
type BubbleData = {
  label: string;
  count: number;
};

// Extend BubbleData to include D3 simulation props
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
    const height = Math.min(width, 600); // Keep it a nice aspect ratio

    const radiusScale = d3
      .scaleSqrt()
      .domain([0, d3.max(data, (d: BubbleData) => d.count)!])
      .range([10, 60]);

    // Clear previous contents
    d3.select(svgRef.current).selectAll('*').remove();

    const simulation = d3
      .forceSimulation<SimulationBubbleNode>(data)
      .force('charge', d3.forceManyBody().strength(5))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force(
        'collision',
        d3.forceCollide((d: SimulationBubbleNode) => radiusScale(d.count) + 2)
      )
      .stop();

    for (let i = 0; i < 300; ++i) simulation.tick();

    const svg = d3.select(svgRef.current);

    const node = svg
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .append('g');

    const bubbles = node
      .selectAll('g')
      .data(data)
      .enter()
      .append('g')
      .attr(
        'transform',
        (d: SimulationBubbleNode) => `translate(${d.x},${d.y})`
      )
      .on('click', (event, d: SimulationBubbleNode) => {
        if (onBubbleClick) onBubbleClick(d.label);
      });

    bubbles
      .append('circle')
      .attr('r', (d: SimulationBubbleNode) => radiusScale(d.count))
      .attr('fill', 'rgba(54, 162, 235, 0.6)')
      .attr('stroke', '#333');

    bubbles
      .append('text')
      .text((d: SimulationBubbleNode) => d.label)
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .style('font-size', '10px')
      .style('fill', '#000')
      .style('pointer-events', 'none');
  }, [data, onBubbleClick]);

  return (
    <svg
      ref={svgRef}
      style={{ width: '100%', height: '100%', minHeight: '300px' }}
    />
  );
};

export default PackedBubbleChart;
