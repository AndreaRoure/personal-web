'use client';

import { useEffect } from 'react';

export default function MermaidLoader() {
  useEffect(() => {
    const loadMermaid = async () => {
      const mermaid = (await import('mermaid')).default;
      mermaid.initialize({
        startOnLoad: true,
        theme: 'light',
        securityLevel: 'loose',
        flowchart: { useMaxWidth: true }
      });
      await mermaid.contentLoaded();
    };

    loadMermaid().catch(err => console.error('Error loading mermaid:', err));
  }, []);

  return null;
}
