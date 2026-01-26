import { useState } from 'react';
import { X, FileCode, FileJson, FileText } from 'lucide-react';

interface NewFileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateFile: (filename: string, content: string) => void;
}

const fileTemplates: Record<string, { icon: typeof FileJson; color: string; template: string }> = {
  '.json': { icon: FileJson, color: 'text-[#cbcb41]', template: '{\n  \n}' },
  '.ts': { icon: FileCode, color: 'text-[#519aba]', template: '// New TypeScript file\n\n' },
  '.md': { icon: FileText, color: 'text-[#519aba]', template: '# New Document\n\n' },
};

export function NewFileDialog({ isOpen, onClose, onCreateFile }: NewFileDialogProps) {
  const [filename, setFilename] = useState('untitled');

  if (!isOpen) return null;

  const getExtension = (name: string) => {
    if (name.endsWith('.json')) return '.json';
    if (name.endsWith('.ts')) return '.ts';
    if (name.endsWith('.md')) return '.md';
    return '.ts';
  };

  const handleCreate = () => {
    if (filename.trim()) {
      let finalName = filename.trim();
      if (!finalName.includes('.')) {
        finalName += '.ts';
      }
      const ext = getExtension(finalName);
      const template = fileTemplates[ext]?.template || '';
      onCreateFile(finalName, template);
      setFilename('untitled');
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCreate();
    }
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-[var(--theme-sidebar)] border border-[var(--theme-border)] rounded shadow-2xl w-full max-w-md overflow-hidden">
        <div className="flex items-center px-3 py-2 border-b border-[var(--theme-border)]">
          <FileCode size={14} className="text-[var(--theme-accent)] mr-2" />
          <input
            type="text"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter file name (e.g., myfile.ts)"
            className="flex-1 bg-transparent text-sm text-[var(--theme-text)] outline-none"
            autoFocus
            data-testid="input-new-filename"
          />
          <button
            onClick={onClose}
            className="p-1 hover:bg-[var(--theme-border)] rounded transition-colors ml-2"
            data-testid="button-close-new-file"
          >
            <X size={14} className="text-[var(--theme-text)]/50" />
          </button>
        </div>
        <div className="px-3 py-2 text-xs text-[var(--theme-text)]/50">
          Press Enter to create • Supports .ts, .json, .md
        </div>
      </div>
    </div>
  );
}
