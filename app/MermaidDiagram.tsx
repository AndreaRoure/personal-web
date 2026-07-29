'use client';

import { useEffect } from 'react';

export default function MermaidDiagram({ children }: { children: string }) {
  useEffect(() => {
    const loadMermaid = async () => {
      const mermaid = (await import('mermaid')).default;
      mermaid.initialize({ startOnLoad: true, theme: 'light' });
      await mermaid.contentLoaded();
    };
    loadMermaid();
  }, []);

  return (
    <div className="mermaid overflow-x-auto flex justify-center py-8">
      {children}
    </div>
  );
}
