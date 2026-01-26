import { motion } from 'framer-motion';
import { GitCommit, GitBranch, Star, GitPullRequest } from 'lucide-react';

const mockActivity = [
  { type: 'commit', repo: 'portfolio', message: 'Add new features', time: '2 hours ago' },
  { type: 'star', repo: 'react-query', message: 'Starred repository', time: '5 hours ago' },
  { type: 'pr', repo: 'open-source-proj', message: 'Fix bug in auth module', time: '1 day ago' },
  { type: 'commit', repo: 'side-project', message: 'Initial commit', time: '2 days ago' },
  { type: 'branch', repo: 'portfolio', message: 'Created feature/dark-mode', time: '3 days ago' },
];

const contributionGrid = Array.from({ length: 52 * 7 }, (_, i) => {
  const rand = Math.random();
  if (rand > 0.7) return 4;
  if (rand > 0.5) return 3;
  if (rand > 0.3) return 2;
  if (rand > 0.15) return 1;
  return 0;
});

const levelColors = [
  'bg-[#161b22]',
  'bg-[#0e4429]',
  'bg-[#006d32]',
  'bg-[#26a641]',
  'bg-[#39d353]',
];

export function GitHubActivity() {
  return (
    <div className="space-y-6">
      <div className="bg-[#282c34] rounded-lg p-4 border border-[#3e4451]">
        <h3 className="text-sm font-semibold text-[#d4d4d4] mb-4 flex items-center gap-2">
          <GitCommit size={16} className="text-[#98c379]" />
          Contribution Graph
        </h3>
        
        <div className="overflow-x-auto">
          <div className="grid gap-[3px]" style={{ gridTemplateColumns: 'repeat(52, 10px)', gridTemplateRows: 'repeat(7, 10px)' }}>
            {contributionGrid.map((level, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.001 }}
                className={`w-[10px] h-[10px] rounded-sm ${levelColors[level]}`}
                title={`${level} contributions`}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 mt-4 text-xs text-[#858585]">
          <span>Less</span>
          {levelColors.map((color, i) => (
            <div key={i} className={`w-[10px] h-[10px] rounded-sm ${color}`} />
          ))}
          <span>More</span>
        </div>
      </div>

      <div className="bg-[#282c34] rounded-lg p-4 border border-[#3e4451]">
        <h3 className="text-sm font-semibold text-[#d4d4d4] mb-4">Recent Activity</h3>
        
        <div className="space-y-3">
          {mockActivity.map((activity, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-3 text-sm"
            >
              <div className="mt-0.5">
                {activity.type === 'commit' && <GitCommit size={14} className="text-[#98c379]" />}
                {activity.type === 'star' && <Star size={14} className="text-[#e5c07b]" />}
                {activity.type === 'pr' && <GitPullRequest size={14} className="text-[#c678dd]" />}
                {activity.type === 'branch' && <GitBranch size={14} className="text-[#61afef]" />}
              </div>
              <div className="flex-1">
                <p className="text-[#d4d4d4]">
                  <span className="text-[#61afef]">{activity.repo}</span>
                  {' - '}
                  {activity.message}
                </p>
                <p className="text-xs text-[#5c6370]">{activity.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
