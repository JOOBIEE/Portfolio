"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { buildGraph, GraphNode, ContentItem } from "@/lib/buildGraph";
import { useTheme } from "@/components/ThemeProvider";
import { useRouter } from "next/navigation";

const typeColors = {
  project: { light: "#0A0A0A", dark: "#4D7EFF" },
  essay: { light: "#4A4A45", dark: "#C8B8FF" },
  "case-study": { light: "#6A6A65", dark: "#7FAAFF" },
  archive: { light: "#8A8A82", dark: "#8A9BB8" },
  tag: { light: "#D0D0C8", dark: "#1E2530" },
};

const typeSizes = {
  project: 10,
  essay: 8,
  "case-study": 8,
  archive: 6,
  tag: 5,
};

interface SimNode extends GraphNode {
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

interface SimLink {
  source: SimNode | string;
  target: SimNode | string;
  strength: number;
}

interface Props {
  items: ContentItem[];
}

export default function IdentityGraph({ items }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const simulationRef = useRef<d3.Simulation<SimNode, SimLink> | null>(null);
  const { theme } = useTheme();
  const router = useRouter();
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);
  const [tooltip, setTooltip] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    if (simulationRef.current) {
      simulationRef.current.stop();
    }

    const container = containerRef.current;
    const width = container.offsetWidth;
    const height = container.offsetHeight;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    svg
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`);

    const { nodes, links } = buildGraph(items);

    const simNodes: SimNode[] = nodes.map((n) => ({ ...n }));
    const simLinks: SimLink[] = links.map((l) => ({
      source: l.source,
      target: l.target,
      strength: l.strength,
    }));

    const g = svg.append("g");

    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.2, 4])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom);

    const simulation = d3
      .forceSimulation<SimNode>(simNodes)
      .force(
        "link",
        d3
          .forceLink<SimNode, SimLink>(simLinks)
          .id((d) => d.id)
          .distance((d) => {
            const s = d.source as SimNode;
            const t = d.target as SimNode;
            if (s.type === "tag" || t.type === "tag") return 70;
            return 140;
          })
          .strength(0.4)
      )
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force(
        "collision",
        d3
          .forceCollide<SimNode>()
          .radius((d) => typeSizes[d.type] + 10)
      );

    simulationRef.current = simulation;

    const linkEl = g
      .append("g")
      .selectAll<SVGLineElement, SimLink>("line")
      .data(simLinks)
      .join("line")
      .attr("stroke", theme === "dark" ? "#1E2530" : "#E0E0D8")
      .attr("stroke-width", (d) => {
        const s = d.source as SimNode;
        const t = d.target as SimNode;
        if (s.type === "tag" || t.type === "tag") return 0.5;
        return Math.min(d.strength * 0.8, 2);
      })
      .attr("stroke-opacity", 0.7);

    const nodeEl = g
      .append("g")
      .selectAll<SVGGElement, SimNode>("g")
      .data(simNodes)
      .join("g")
      .style("cursor", (d) => (d.path ? "pointer" : "default"))
      .call(
        d3
          .drag<SVGGElement, SimNode>()
          .on("start", (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on("end", (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          })
      );

    nodeEl
      .append("circle")
      .attr("r", (d) => typeSizes[d.type])
      .attr("fill", (d) =>
        theme === "dark"
          ? typeColors[d.type].dark
          : typeColors[d.type].light
      )
      .attr("stroke", theme === "dark" ? "#070A0F" : "#F7F7F2")
      .attr("stroke-width", 2)
      .on("mouseenter", function (event, d) {
        d3.select(this)
          .transition()
          .duration(150)
          .attr("r", typeSizes[d.type] * 1.6);
        setHoveredNode(d);
        setTooltip({ x: event.offsetX, y: event.offsetY });
      })
      .on("mousemove", function (event) {
        setTooltip({ x: event.offsetX, y: event.offsetY });
      })
      .on("mouseleave", function (event, d) {
        d3.select(this)
          .transition()
          .duration(150)
          .attr("r", typeSizes[d.type]);
        setHoveredNode(null);
      })
      .on("click", (event, d) => {
        if (d.path) router.push(d.path);
      });

    nodeEl
      .filter((d) => d.type !== "tag")
      .append("text")
      .text((d) =>
        d.label.length > 28 ? d.label.slice(0, 28) + "…" : d.label
      )
      .attr("dy", (d) => -typeSizes[d.type] - 5)
      .attr("text-anchor", "middle")
      .attr("font-size", "9px")
      .attr("font-family", "var(--font-geist-sans)")
      .attr("fill", theme === "dark" ? "#4A5568" : "#8A8A82")
      .attr("pointer-events", "none");

    nodeEl
      .filter((d) => d.type === "tag")
      .append("text")
      .text((d) => d.label)
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .attr("font-size", "8px")
      .attr("font-family", "var(--font-geist-sans)")
      .attr("fill", theme === "dark" ? "#2A3545" : "#C0C0B8")
      .attr("pointer-events", "none");

    simulation.on("tick", () => {
      linkEl
        .attr("x1", (d) => (d.source as SimNode).x ?? 0)
        .attr("y1", (d) => (d.source as SimNode).y ?? 0)
        .attr("x2", (d) => (d.target as SimNode).x ?? 0)
        .attr("y2", (d) => (d.target as SimNode).y ?? 0);

      nodeEl.attr(
        "transform",
        (d) => `translate(${d.x ?? 0}, ${d.y ?? 0})`
      );
    });

    const handleResize = () => {
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      svg
        .attr("width", w)
        .attr("height", h)
        .attr("viewBox", `0 0 ${w} ${h}`);
      simulation.force("center", d3.forceCenter(w / 2, h / 2));
      simulation.alpha(0.3).restart();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      simulation.stop();
      window.removeEventListener("resize", handleResize);
    };
  }, [items, theme, router]);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "100%", position: "relative" }}
    >
      <svg ref={svgRef} style={{ width: "100%", height: "100%" }} />

      {hoveredNode && (
        <div
          style={{
            position: "absolute",
            left: tooltip.x + 14,
            top: tooltip.y - 10,
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            padding: "8px 12px",
            pointerEvents: "none",
            zIndex: 10,
            maxWidth: "220px",
          }}
        >
          <p
            className="text-label"
            style={{
              color: "var(--text-muted)",
              fontSize: "0.6rem",
              marginBottom: "3px",
            }}
          >
            {hoveredNode.type.replace("-", " ").toUpperCase()}
          </p>
          <p
            className="text-small"
            style={{ color: "var(--text-primary)", fontWeight: 500 }}
          >
            {hoveredNode.label}
          </p>
          {hoveredNode.tags.length > 0 && (
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "0.7rem",
                marginTop: "4px",
                lineHeight: 1.5,
              }}
            >
              {hoveredNode.tags.join(", ")}
            </p>
          )}
          {hoveredNode.path && (
            <p
              className="text-label"
              style={{
                color: "var(--text-muted)",
                fontSize: "0.6rem",
                marginTop: "6px",
              }}
            >
              Click to visit →
            </p>
          )}
        </div>
      )}

      {/* Legend */}
      <div
        style={{
          position: "absolute",
          bottom: "16px",
          left: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          background: "var(--background)",
          border: "1px solid var(--border)",
          borderRadius: "8px",
          padding: "12px 14px",
        }}
      >
        {(
          [
            { type: "project", label: "Project" },
            { type: "essay", label: "Essay" },
            { type: "case-study", label: "Case Study" },
            { type: "archive", label: "Archive" },
            { type: "tag", label: "Theme" },
          ] as const
        ).map(({ type, label }) => (
          <div
            key={type}
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            <div
              style={{
                width: typeSizes[type] * 2,
                height: typeSizes[type] * 2,
                borderRadius: "50%",
                background:
                  theme === "dark"
                    ? typeColors[type].dark
                    : typeColors[type].light,
                flexShrink: 0,
              }}
            />
            <span
              className="text-label"
              style={{
                color: "var(--text-muted)",
                fontSize: "0.65rem",
              }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div
        style={{
          position: "absolute",
          bottom: "16px",
          right: "16px",
          background: "var(--background)",
          border: "1px solid var(--border)",
          borderRadius: "8px",
          padding: "8px 12px",
        }}
      >
        <p
          className="text-label"
          style={{ color: "var(--text-muted)", fontSize: "0.6rem" }}
        >
          Scroll to zoom · Drag to pan · Click node to visit
        </p>
      </div>
    </div>
  );
}