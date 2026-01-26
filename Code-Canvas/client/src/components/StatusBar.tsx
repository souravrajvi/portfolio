import { GitBranch, Check, Bell, AlertCircle, Wifi, Mail } from "lucide-react";

interface StatusBarProps {
  currentFile?: string;
  onOpenContact?: () => void;
}

export function StatusBar({ currentFile = "bio.ts", onOpenContact }: StatusBarProps) {
  const getFileType = (filename: string) => {
    if (filename.endsWith('.ts') || filename.endsWith('.tsx')) return 'TypeScript React';
    if (filename.endsWith('.json')) return 'JSON';
    if (filename.endsWith('.md')) return 'Markdown';
    return 'Plain Text';
  };

  const getLineInfo = (filename: string = "bio.ts") => {
    const hash = (filename || "bio.ts").split('').reduce((a, b) => ((a << 5) - a) + b.charCodeAt(0), 0);
    const lines = Math.abs(hash % 50) + 10;
    const col = Math.abs(hash % 40) + 1;
    return `Ln ${lines}, Col ${col}`;
  };

  return (
    <footer className="h-6 bg-[#007acc] text-white flex items-center justify-between px-3 text-xs select-none fixed bottom-0 w-full z-40 md:relative">
      <div className="flex items-center space-x-3">
        <div 
          className="flex items-center hover:bg-white/20 px-2 py-0.5 rounded cursor-pointer transition-colors"
          title="Current branch"
        >
          <GitBranch size={12} className="mr-1" />
          <span>main</span>
        </div>
        <div 
          className="flex items-center hover:bg-white/20 px-2 py-0.5 rounded cursor-pointer transition-colors hidden sm:flex"
          title="No problems"
        >
          <Check size={12} className="mr-1" />
          <span>0</span>
          <AlertCircle size={12} className="ml-2 mr-1" />
          <span>0</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <div className="hidden sm:flex items-center space-x-3">
          <span className="hover:bg-white/20 px-2 py-0.5 rounded cursor-pointer transition-colors">
            {getLineInfo(currentFile)}
          </span>
          <span className="hover:bg-white/20 px-2 py-0.5 rounded cursor-pointer transition-colors">
            Spaces: 2
          </span>
          <span className="hover:bg-white/20 px-2 py-0.5 rounded cursor-pointer transition-colors">
            UTF-8
          </span>
          <span className="hover:bg-white/20 px-2 py-0.5 rounded cursor-pointer transition-colors">
            {getFileType(currentFile)}
          </span>
        </div>
        <div 
          className="flex items-center hover:bg-white/20 px-2 py-0.5 rounded cursor-pointer transition-colors"
          title="Prettier"
        >
          <Check size={12} className="mr-1" />
          <span className="hidden sm:inline">Prettier</span>
        </div>
        <div 
          className="hover:bg-white/20 px-1 py-0.5 rounded cursor-pointer transition-colors"
          title="Connected"
        >
          <Wifi size={12} />
        </div>
        <div 
          className="hover:bg-white/20 px-1 py-0.5 rounded cursor-pointer transition-colors"
          title="Notifications"
        >
          <Bell size={12} />
        </div>
        {onOpenContact && (
          <button
            onClick={onOpenContact}
            className="hover:bg-white/20 px-1 py-0.5 rounded cursor-pointer transition-colors"
            title="Contact"
            data-testid="button-contact"
          >
            <Mail size={12} />
          </button>
        )}
      </div>
    </footer>
  );
}
