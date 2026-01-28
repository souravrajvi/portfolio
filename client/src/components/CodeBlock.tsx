import React from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  showMinimap?: boolean;
}

export function CodeBlock({ code, showLineNumbers = true, showMinimap = false }: CodeBlockProps) {
  // A simple manual highlighter for this specific aesthetic since we want full control
  // In a real production app, prismjs would be used, but for this specific "JSON/Object" look, 
  // custom rendering gives us the exact colors we want for keys vs values.
  
  const lines = code.split('\n');

  const renderLine = (line: string, index: number) => {
    // Very basic syntax highlighting heuristics for our JSON/JS object display
    
    // Comments
    if (line.trim().startsWith('//')) {
      return <span className="token-comment">{line}</span>;
    }

    // Key-Value pairs (e.g., "company": "Tech Corp",)
    const keyValueMatch = line.match(/^(\s*)(["']?[\w\s]+["']?)(:\s*)(.+)(,?)$/);
    if (keyValueMatch) {
      const [, indent, key, colon, value, comma] = keyValueMatch;
      return (
        <span>
          {indent}
          <span className="token-key">{key}</span>
          <span className="token-punctuation">{colon}</span>
          {renderValue(value)}
          <span className="token-punctuation">{comma}</span>
        </span>
      );
    }
    
    // Just indentation + braces/brackets
    return <span className="text-[#abb2bf]">{line}</span>;
  };

  const renderValue = (value: string) => {
    if (value.startsWith('"') || value.startsWith("'")) return <span className="token-string">{value}</span>;
    if (value === 'true' || value === 'false') return <span className="token-number">{value}</span>; // boolean color same as number usually
    if (!isNaN(Number(value))) return <span className="token-number">{value}</span>;
    if (value.startsWith('[')) return <span className="text-[#abb2bf]">{value}</span>; // Array start
    return <span className="token-variable">{value}</span>;
  };

  return (
    <div className="relative flex">
      <div className="font-mono text-sm md:text-base leading-relaxed overflow-x-auto flex-1">
        {lines.map((line, i) => (
          <div key={i} className="table-row">
            {showLineNumbers && (
              <span className="table-cell text-right select-none text-[#4b5263] pr-4 w-8 md:w-12 text-xs md:text-sm pt-[2px]">
                {i + 1}
              </span>
            )}
            <span className="table-cell whitespace-pre">{renderLine(line, i)}</span>
          </div>
        ))}
      </div>
      
      {showMinimap && lines.length > 5 && (
        <div className="hidden lg:block w-24 ml-4 bg-[#1e1e1e] rounded overflow-hidden opacity-60 hover:opacity-100 transition-opacity">
          <div className="p-1 text-[2px] leading-[3px] font-mono select-none overflow-hidden max-h-48">
            {lines.slice(0, 60).map((line, i) => (
              <div key={i} className="text-[#6b7280] truncate">
                {line.slice(0, 80) || '\u00A0'}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
