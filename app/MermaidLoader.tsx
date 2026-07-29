'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    mermaid?: {
      initialize: (config: unknown) => void;
      contentLoaded: () => Promise<void>;
    };
  }
}

export default function MermaidLoader() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js';
    script.async = true;
    script.onload = () => {
      if (window.mermaid) {
        window.mermaid.initialize({
          startOnLoad: true,
          theme: 'light',
          securityLevel: 'loose',
          flowchart: { useMaxWidth: true }
        });
        window.mermaid.contentLoaded();
      }
    };
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return null;
}
