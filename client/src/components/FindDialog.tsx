import { useState, useEffect, useCallback } from "react";
import { X, ChevronDown, ChevronUp, Replace } from "lucide-react";

interface FindDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FindDialog({ open, onOpenChange }: FindDialogProps) {
  const [searchText, setSearchText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [matchCount, setMatchCount] = useState(0);
  const [currentMatch, setCurrentMatch] = useState(0);
  const [showReplace, setShowReplace] = useState(false);

  const escapeRegExp = (str: string) => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  const handleSearch = useCallback(() => {
    if (!searchText.trim()) {
      setMatchCount(0);
      setCurrentMatch(0);
      return;
    }

    try {
      const content = document.body.innerText;
      const escapedSearch = escapeRegExp(searchText);
      const regex = new RegExp(escapedSearch, 'gi');
      const matches = content.match(regex);
      setMatchCount(matches?.length || 0);
      setCurrentMatch(matches?.length ? 1 : 0);
    } catch {
      setMatchCount(0);
      setCurrentMatch(0);
    }
  }, [searchText]);

  useEffect(() => {
    if (open) {
      handleSearch();
    }
  }, [open, searchText, handleSearch]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onOpenChange(false);
    }
    if (e.key === 'Enter') {
      if (currentMatch < matchCount) {
        setCurrentMatch(prev => prev + 1);
      } else {
        setCurrentMatch(1);
      }
    }
  }, [onOpenChange, currentMatch, matchCount]);

  if (!open) return null;

  return (
    <div 
      className="fixed top-12 right-4 bg-[#252526] border border-[#3e4451] rounded shadow-2xl z-50 min-w-[320px]"
      onKeyDown={handleKeyDown}
    >
      <div className="flex items-center gap-1 p-1">
        <button
          onClick={() => setShowReplace(!showReplace)}
          className="p-1 text-[#858585] hover:text-white hover:bg-[#3e4451] rounded transition-colors"
          title="Toggle Replace"
          data-testid="button-toggle-replace"
        >
          {showReplace ? <ChevronDown size={14} /> : <ChevronDown size={14} className="rotate-[-90deg]" />}
        </button>
        
        <div className="flex-1 flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Find"
              className="flex-1 bg-[#3c3c3c] border border-[#3e4451] rounded px-2 py-1 text-sm text-[#d4d4d4] placeholder:text-[#5c6370] focus:border-[#007acc] focus:outline-none"
              autoFocus
              data-testid="input-find"
            />
            <span className="text-xs text-[#858585] min-w-[60px] text-right">
              {matchCount > 0 ? `${currentMatch} of ${matchCount}` : "No results"}
            </span>
          </div>
          
          {showReplace && (
            <div className="flex items-center gap-1">
              <input
                type="text"
                value={replaceText}
                onChange={(e) => setReplaceText(e.target.value)}
                placeholder="Replace (read-only view)"
                className="flex-1 bg-[#3c3c3c] border border-[#3e4451] rounded px-2 py-1 text-sm text-[#d4d4d4] placeholder:text-[#5c6370] focus:border-[#007acc] focus:outline-none opacity-50"
                disabled
                data-testid="input-replace"
              />
              <button
                className="p-1 text-[#858585] opacity-50 cursor-not-allowed rounded"
                title="Replace (disabled in read-only view)"
                disabled
              >
                <Replace size={14} />
              </button>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-0.5">
          <button
            onClick={() => setCurrentMatch(prev => prev > 1 ? prev - 1 : matchCount)}
            className="p-1 text-[#858585] hover:text-white hover:bg-[#3e4451] rounded transition-colors"
            title="Previous Match (Shift+Enter)"
            data-testid="button-prev-match"
          >
            <ChevronUp size={14} />
          </button>
          <button
            onClick={() => setCurrentMatch(prev => prev < matchCount ? prev + 1 : 1)}
            className="p-1 text-[#858585] hover:text-white hover:bg-[#3e4451] rounded transition-colors"
            title="Next Match (Enter)"
            data-testid="button-next-match"
          >
            <ChevronDown size={14} />
          </button>
          <button
            onClick={() => onOpenChange(false)}
            className="p-1 text-[#858585] hover:text-white hover:bg-[#3e4451] rounded transition-colors ml-1"
            title="Close (Escape)"
            data-testid="button-close-find"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
