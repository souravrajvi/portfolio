import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface KeyboardShortcutsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const shortcuts = [
  { keys: ["Ctrl", "K"], description: "Open command palette" },
  { keys: ["Ctrl", "B"], description: "Toggle sidebar" },
  { keys: ["Ctrl", "F"], description: "Find in page" },
  { keys: ["Ctrl", "/"], description: "Show keyboard shortcuts" },
];

const macShortcuts = [
  { keys: ["Cmd", "K"], description: "Open command palette" },
  { keys: ["Cmd", "B"], description: "Toggle sidebar" },
  { keys: ["Cmd", "F"], description: "Find in page" },
  { keys: ["Cmd", "/"], description: "Show keyboard shortcuts" },
];

export function KeyboardShortcuts({ open, onOpenChange }: KeyboardShortcutsProps) {
  const isMac = typeof navigator !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  const displayShortcuts = isMac ? macShortcuts : shortcuts;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#252526] border-[#3e4451] max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[#d4d4d4] text-lg font-semibold">
            Keyboard Shortcuts
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-3">
          {displayShortcuts.map((shortcut, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between py-2 border-b border-[#3e4451] last:border-0"
            >
              <span className="text-[#abb2bf] text-sm">{shortcut.description}</span>
              <div className="flex gap-1">
                {shortcut.keys.map((key, i) => (
                  <span key={i}>
                    <kbd className="px-2 py-1 bg-[#3e4451] rounded text-[#d4d4d4] text-xs font-mono">
                      {key}
                    </kbd>
                    {i < shortcut.keys.length - 1 && (
                      <span className="text-[#5c6370] mx-1">+</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-[#5c6370] text-center">
          Press <kbd className="px-1.5 py-0.5 bg-[#3e4451] rounded text-[#abb2bf]">Esc</kbd> to close
        </p>
      </DialogContent>
    </Dialog>
  );
}
