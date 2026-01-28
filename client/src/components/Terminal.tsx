import { useState, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Minus, Maximize2, ChevronUp, ChevronDown } from 'lucide-react';

interface TerminalProps {
  isOpen: boolean;
  onToggle: () => void;
}

const terminalLines = [
  { type: 'command', text: '$ npm run build' },
  { type: 'output', text: '> portfolio@1.0.0 build' },
  { type: 'output', text: '> vite build' },
  { type: 'success', text: 'vite v5.0.0 building for production...' },
  { type: 'output', text: 'transforming...' },
  { type: 'success', text: 'Build completed in 2.3s' },
  { type: 'output', text: '' },
  { type: 'command', text: '$ echo "Welcome to my portfolio!"' },
  { type: 'output', text: 'Welcome to my portfolio!' },
  { type: 'output', text: '' },
  { type: 'command', text: '$ git status' },
  { type: 'success', text: 'On branch main' },
  { type: 'output', text: 'nothing to commit, working tree clean' },
  { type: 'output', text: '' },
  { type: 'command', text: '$ _' },
];

export function Terminal({ isOpen, onToggle }: TerminalProps) {
  const [visibleLines, setVisibleLines] = useState<typeof terminalLines>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen && visibleLines.length === 0) {
      setIsAnimating(true);
      let index = 0;
      const interval = setInterval(() => {
        if (index < terminalLines.length) {
          const lineToAdd = terminalLines[index];
          if (lineToAdd) {
            setVisibleLines(prev => [...prev, lineToAdd]);
          }
          index++;
        } else {
          clearInterval(interval);
          setIsAnimating(false);
        }
      }, 150);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="fixed bottom-8 right-4 md:bottom-8 bg-[var(--theme-sidebar)] border border-[var(--theme-border)] rounded px-3 py-1.5 flex items-center gap-2 text-xs text-[#858585] hover:text-white hover:bg-[#3e4451] transition-colors z-30"
        data-testid="button-open-terminal"
      >
        <TerminalIcon size={14} />
        <span>Terminal</span>
        <ChevronUp size={12} />
      </button>
    );
  }

  return (
    <div className="bg-[var(--theme-bg)] border-t border-[var(--theme-border)] h-48 flex flex-col z-30">
      <div className="flex items-center justify-between px-3 py-1 bg-[var(--theme-sidebar)] border-b border-[var(--theme-border)]">
        <div className="flex items-center gap-4">
          <button className="text-xs text-white border-b-2 border-[var(--theme-accent)] pb-1 px-2">
            TERMINAL
          </button>
          <button className="text-xs text-[#858585] hover:text-white pb-1 px-2">
            PROBLEMS
          </button>
          <button className="text-xs text-[#858585] hover:text-white pb-1 px-2">
            OUTPUT
          </button>
        </div>
        <div className="flex items-center gap-1">
          <button 
            className="p-1 text-[#858585] hover:text-white hover:bg-[#3e4451] rounded transition-colors"
            title="Minimize"
          >
            <Minus size={14} />
          </button>
          <button 
            className="p-1 text-[#858585] hover:text-white hover:bg-[#3e4451] rounded transition-colors"
            title="Maximize"
          >
            <Maximize2 size={14} />
          </button>
          <button 
            onClick={onToggle}
            className="p-1 text-[#858585] hover:text-white hover:bg-[#3e4451] rounded transition-colors"
            title="Close"
            data-testid="button-close-terminal"
          >
            <X size={14} />
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-3 font-mono text-sm">
        {visibleLines.map((line, i) => {
          if (!line) return null;
          return (
            <div 
              key={i} 
              className={`leading-relaxed ${
                line.type === 'command' ? 'text-[#98c379]' : 
                line.type === 'success' ? 'text-[#61afef]' : 
                'text-[#abb2bf]'
              }`}
            >
              {line.text || '\u00A0'}
            </div>
          );
        })}
        {isAnimating && (
          <span className="inline-block w-2 h-4 bg-[#528bff] animate-pulse" />
        )}
      </div>
    </div>
  );
}
