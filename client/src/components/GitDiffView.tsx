import { motion } from 'framer-motion';
import { Plus, Minus, GitCommit } from 'lucide-react';

interface DiffLine {
  type: 'add' | 'remove' | 'context';
  content: string;
  lineNumber: number;
}

interface GitDiffViewProps {
  oldContent: string;
  newContent: string;
  fileName?: string;
}

export function GitDiffView({ oldContent, newContent, fileName = "experience.json" }: GitDiffViewProps) {
  const oldLines = oldContent.split('\n');
  const newLines = newContent.split('\n');
  
  const diffLines: DiffLine[] = [];
  let lineNum = 1;
  
  const maxLen = Math.max(oldLines.length, newLines.length);
  for (let i = 0; i < maxLen; i++) {
    if (i < oldLines.length && i < newLines.length) {
      if (oldLines[i] !== newLines[i]) {
        if (oldLines[i]) {
          diffLines.push({ type: 'remove', content: oldLines[i], lineNumber: lineNum });
        }
        if (newLines[i]) {
          diffLines.push({ type: 'add', content: newLines[i], lineNumber: lineNum });
        }
      } else {
        diffLines.push({ type: 'context', content: oldLines[i], lineNumber: lineNum });
      }
    } else if (i >= oldLines.length) {
      diffLines.push({ type: 'add', content: newLines[i], lineNumber: lineNum });
    } else {
      diffLines.push({ type: 'remove', content: oldLines[i], lineNumber: lineNum });
    }
    lineNum++;
  }

  return (
    <div className="bg-[#1e1e1e] rounded-lg border border-[#3e4451] overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2 bg-[#252526] border-b border-[#3e4451]">
        <GitCommit size={14} className="text-[#e5c07b]" />
        <span className="text-sm text-[#d4d4d4]">{fileName}</span>
        <span className="text-xs text-[#5c6370]">+{newLines.length - oldLines.length > 0 ? newLines.length - oldLines.length : 0} -{oldLines.length - newLines.length > 0 ? oldLines.length - newLines.length : 0}</span>
      </div>
      
      <div className="font-mono text-sm overflow-x-auto">
        {diffLines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: line.type === 'add' ? 10 : line.type === 'remove' ? -10 : 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.02 }}
            className={`flex ${
              line.type === 'add' ? 'bg-[#234525]' :
              line.type === 'remove' ? 'bg-[#452325]' :
              ''
            }`}
          >
            <span className="w-12 text-right pr-2 text-[#5c6370] select-none border-r border-[#3e4451]">
              {line.lineNumber}
            </span>
            <span className="w-6 text-center select-none">
              {line.type === 'add' && <Plus size={12} className="text-[#98c379] inline" />}
              {line.type === 'remove' && <Minus size={12} className="text-[#e06c75] inline" />}
            </span>
            <span className={`flex-1 px-2 whitespace-pre ${
              line.type === 'add' ? 'text-[#98c379]' :
              line.type === 'remove' ? 'text-[#e06c75]' :
              'text-[#abb2bf]'
            }`}>
              {line.content || '\u00A0'}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function ExperienceDiffView() {
  const oldExperience = `{
  "company": "Previous Corp",
  "role": "Junior Developer",
  "duration": "2018-2020",
  "description": "Worked on legacy systems"
}`;

  const newExperience = `{
  "company": "Tech Corp",
  "role": "Senior Node.js Developer",
  "duration": "2022-Present",
  "description": "Leading development of microservices architecture",
  "highlights": ["40% performance improvement", "Mentored 5 developers"]
}`;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[#d4d4d4] flex items-center gap-2">
        <GitCommit size={18} className="text-[#e5c07b]" />
        Career Evolution (Git Diff Style)
      </h3>
      <GitDiffView oldContent={oldExperience} newContent={newExperience} />
    </div>
  );
}
