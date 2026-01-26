import { AlertCircle, AlertTriangle, Info, Check } from 'lucide-react';

interface ProblemsPanelProps {
  isVisible: boolean;
}

export function ProblemsPanel({ isVisible }: ProblemsPanelProps) {
  if (!isVisible) return null;

  return (
    <div className="bg-[#1e1e1e] border-t border-[var(--theme-border)] p-4">
      <div className="flex items-center gap-6 text-sm">
        <div className="flex items-center gap-2 text-[#f14c4c]">
          <AlertCircle size={14} />
          <span>0 Errors</span>
        </div>
        <div className="flex items-center gap-2 text-[#cca700]">
          <AlertTriangle size={14} />
          <span>0 Warnings</span>
        </div>
        <div className="flex items-center gap-2 text-[#3794ff]">
          <Info size={14} />
          <span>0 Infos</span>
        </div>
      </div>
      
      <div className="mt-4 flex items-center justify-center py-8 text-[#5c6370]">
        <div className="flex flex-col items-center gap-2">
          <Check size={32} className="text-[#98c379]" />
          <p className="text-sm">No problems detected in this workspace</p>
          <p className="text-xs">Your code is clean and ready to ship!</p>
        </div>
      </div>
    </div>
  );
}
