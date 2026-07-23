'use client';

import { useEffect, useRef } from 'react';
import p5 from 'p5';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  category: 'tech' | 'people' | 'data';
  size: number;
}

const NetworkVisualization = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sketchRef = useRef<p5 | null>(null);
  const nodesRef = useRef<Node[]>([]);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const sketch = (p: p5) => {
      const categories: Array<'tech' | 'people' | 'data'> = ['tech', 'people', 'data'];
      // Colores tomados de globals.css para consistencia
      const colors = {
        tech: { r: 113, g: 193, b: 208 },    // #71C1D0 (--color-sky)
        people: { r: 168, g: 198, b: 60 },   // #A8C63C (--color-accent-dark)
        data: { r: 122, g: 146, b: 1 },      // #7A9201 (--color-accent)
      };

      p.setup = () => {
        const w = Math.max(window.innerWidth, 800);
        const h = Math.max(window.innerHeight, 600);
        p.createCanvas(w, h);

        // Crear nodos
        nodesRef.current = [];
        for (let i = 0; i < 40; i++) {
          nodesRef.current.push({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            category: categories[i % 3],
            size: 6 + Math.random() * 8,
          });
        }
      };

      p.draw = () => {
        p.background(20, 25, 30, 30);
        const nodes = nodesRef.current;
        const w = p.width;
        const h = p.height;

        nodes.forEach((node) => {
          node.vx *= 0.97;
          node.vy *= 0.97;

          // Atracción al mouse
          const dx = mousePos.current.x - node.x;
          const dy = mousePos.current.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 180 && dist > 0) {
            const angle = Math.atan2(dy, dx);
            const force = (180 - dist) / 180 * 0.25;
            node.vx += Math.cos(angle) * force;
            node.vy += Math.sin(angle) * force;
          }

          // Repulsión entre nodos
          nodes.forEach((other) => {
            if (node === other) return;
            const dx2 = node.x - other.x;
            const dy2 = node.y - other.y;
            const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

            if (dist2 < 120 && dist2 > 0) {
              const angle = Math.atan2(dy2, dx2);
              node.vx += Math.cos(angle) * 0.08;
              node.vy += Math.sin(angle) * 0.08;
            }
          });

          node.x += node.vx;
          node.y += node.vy;

          if (node.x < 0) node.vx = Math.abs(node.vx);
          if (node.x > w) node.vx = -Math.abs(node.vx);
          if (node.y < 0) node.vy = Math.abs(node.vy);
          if (node.y > h) node.vy = -Math.abs(node.vy);

          node.x = Math.max(0, Math.min(w, node.x));
          node.y = Math.max(0, Math.min(h, node.y));
        });

        // Conexiones
        p.stroke(100, 120, 140);
        p.strokeWeight(0.8);
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const d = Math.sqrt(dx * dx + dy * dy);

            if (d < 140) {
              p.stroke(100, 120, 140, (1 - d / 140) * 80);
              p.line(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
            }
          }
        }

        // Nodos
        nodes.forEach((node) => {
          const color = colors[node.category];

          // Halo
          p.fill(color.r, color.g, color.b, 15);
          p.noStroke();
          p.circle(node.x, node.y, node.size * 2.5);

          // Nodo
          p.fill(color.r, color.g, color.b);
          p.circle(node.x, node.y, node.size);
        });
      };

      p.mouseMoved = () => {
        mousePos.current = { x: p.mouseX, y: p.mouseY };
      };
    };

    sketchRef.current = new p5(sketch, containerRef.current);

    return () => {
      if (sketchRef.current) {
        sketchRef.current.remove();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
    />
  );
};

export default NetworkVisualization;
