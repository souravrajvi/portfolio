import { useState, ReactNode } from 'react';
import { Columns, X } from 'lucide-react';

interface SplitEditorViewProps {
  children: ReactNode;
  secondaryContent?: ReactNode;
}

export function SplitEditorView({ children, secondaryContent }: SplitEditorViewProps) {
  const [isSplit, setIsSplit] = useState(false);
  const [splitRatio, setSplitRatio] = useState(50);

  return (
    <div className="relative h-full">
      <button
        onClick={() => setIsSplit(!isSplit)}
        className="absolute top-2 right-2 z-10 p-2 bg-[#252526] hover:bg-[#3e4451] rounded transition-colors"
        title={isSplit ? "Close split view" : "Split editor"}
        data-testid="button-toggle-split"
      >
        {isSplit ? <X size={16} /> : <Columns size={16} />}
      </button>

      {isSplit ? (
        <div className="flex h-full gap-1">
          <div style={{ width: `${splitRatio}%` }} className="overflow-auto">
            {children}
          </div>
          <div 
            className="w-1 bg-[#3e4451] cursor-col-resize hover:bg-[#007acc] transition-colors"
            onMouseDown={(e) => {
              const startX = e.clientX;
              const startRatio = splitRatio;
              
              const onMouseMove = (moveEvent: MouseEvent) => {
                const delta = moveEvent.clientX - startX;
                const containerWidth = e.currentTarget.parentElement?.clientWidth || 1;
                const newRatio = startRatio + (delta / containerWidth) * 100;
                setSplitRatio(Math.min(80, Math.max(20, newRatio)));
              };
              
              const onMouseUp = () => {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
              };
              
              document.addEventListener('mousemove', onMouseMove);
              document.addEventListener('mouseup', onMouseUp);
            }}
          />
          <div style={{ width: `${100 - splitRatio}%` }} className="overflow-auto">
            {secondaryContent || (
              <div className="h-full flex items-center justify-center text-[#5c6370]">
                <p>Select another file to view side by side</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        children
      )}
    </div>
  );
}
