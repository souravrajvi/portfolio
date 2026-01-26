import { useState, useRef, useEffect } from 'react';

interface EditableCodeBlockProps {
  initialCode: string;
  language?: string;
  onContentChange?: (content: string) => void;
}

export function EditableCodeBlock({ initialCode, language = 'json', onContentChange }: EditableCodeBlockProps) {
  const [code, setCode] = useState(initialCode);
  const [lineCount, setLineCount] = useState(1);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lines = code.split('\n').length;
    setLineCount(lines);
  }, [code]);

  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  const handleScroll = () => {
    if (textareaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const newCode = code.substring(0, start) + '  ' + code.substring(end);
      setCode(newCode);
      onContentChange?.(newCode);
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 2;
        }
      }, 0);
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const lineStart = code.lastIndexOf('\n', start - 1) + 1;
      const currentLine = code.substring(lineStart, start);
      const indent = currentLine.match(/^\s*/)?.[0] || '';
      const newCode = code.substring(0, start) + '\n' + indent + code.substring(start);
      setCode(newCode);
      onContentChange?.(newCode);
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 1 + indent.length;
        }
      }, 0);
    }
  };

  return (
    <div className="h-full flex bg-[var(--theme-bg)]">
      <div 
        ref={lineNumbersRef}
        className="select-none text-right pr-4 pl-4 py-0 text-[var(--theme-text)]/30 leading-[21px] overflow-hidden bg-[var(--theme-sidebar)] border-r border-[var(--theme-border)]"
        style={{ fontFamily: 'Consolas, Monaco, "Courier New", monospace', fontSize: '14px' }}
      >
        {Array.from({ length: lineCount }, (_, i) => (
          <div key={i + 1} className="h-[21px]">{i + 1}</div>
        ))}
      </div>
      <div className="flex-1 relative">
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            onContentChange?.(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          onScroll={handleScroll}
          className="w-full h-full bg-transparent text-[var(--theme-text)] resize-none outline-none leading-[21px] p-0 pl-4 overflow-auto"
          style={{ 
            fontFamily: 'Consolas, Monaco, "Courier New", monospace',
            fontSize: '14px',
            tabSize: 2,
            caretColor: 'var(--theme-accent)',
          }}
          spellCheck={false}
          data-testid="editable-code-area"
        />
      </div>
    </div>
  );
}
