import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

export default function D3Graph({ workload, services, ingresses, pods }) {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();
    const width = 350, height = 300;
    svg.attr("viewBox", `0 0 ${width} ${height}`);

    // nodes
    const nodes = [];
    nodes.push({ id: workload.metadata.name, type: "workload" });
    services.forEach(s => nodes.push({ id: s.metadata.name, type: "service" }));
    ingresses.forEach(i => nodes.push({ id: i.metadata.name, type: "ingress" }));
    pods.forEach(p => nodes.push({ id: p.metadata.name, type: "pod" }));

    // links (workload -> service -> ingress; workload -> pods)
    const links = [];
    services.forEach(s => links.push({ source: workload.metadata.name, target: s.metadata.name }));
    ingresses.forEach(i => {
      const sName = services[0]?.metadata?.name;
      if (sName) links.push({ source: sName, target: i.metadata.name });
    });
    pods.forEach(p => links.push({ source: workload.metadata.name, target: p.metadata.name }));

    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id).distance(80))
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg.append("g").attr("stroke", "#999")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", 1.5);

    const node = svg.append("g")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .call(drag(simulation));

    node.append("circle")
      .attr("r", d => d.type === "workload" ? 18 : d.type === "service" ? 14 : d.type === "ingress" ? 14 : 8)
      .attr("fill", d => d.type === "workload" ? "#34d399" : d.type === "service" ? "#60a5fa" : d.type === "ingress" ? "#86efac" : "#fca5a5");

    node.append("text")
      .attr("x", 12)
      .attr("y", 4)
      .text(d => short(d.id))
      .style("font-size", "10px");

    simulation.on("tick", () => {
      link.attr("x1", d => d.source.x)
          .attr("y1", d => d.source.y)
          .attr("x2", d => d.target.x)
          .attr("y2", d => d.target.y);

      node.attr("transform", d => `translate(${d.x},${d.y})`);
    });

    function short(s){ return s.length>12 ? s.slice(0,10)+".." : s; }

    function drag(sim){
      function dragstarted(event, d){ if(!event.active) sim.alphaTarget(0.3).restart(); d.fx = d.x; d.fy = d.y; }
      function dragged(event, d){ d.fx = event.x; d.fy = event.y; }
      function dragended(event, d){ if(!event.active) sim.alphaTarget(0); d.fx = null; d.fy = null; }
      return d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended);
    }

    return () => simulation.stop();
  }, [workload, services, ingresses, pods]);

  return <svg ref={ref} width="100%" height="300" />;
}