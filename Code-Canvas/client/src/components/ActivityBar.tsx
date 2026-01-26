import { Files, Search, GitBranch, Puzzle, Settings, User, Github, Linkedin, Mail } from "lucide-react";

interface ActivityBarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const activities = [
  { id: "explorer", icon: Files, title: "Explorer", active: true },
  { id: "search", icon: Search, title: "Search", active: false },
  { id: "git", icon: GitBranch, title: "Source Control", active: false },
  { id: "extensions", icon: Puzzle, title: "Extensions", active: false },
];

export function ActivityBar({ activeView, onViewChange }: ActivityBarProps) {
  return (
    <div className="hidden md:flex flex-col w-12 bg-[var(--theme-sidebar)] border-r border-[var(--theme-border)] h-full">
      <div className="flex-1 flex flex-col items-center py-2 gap-1">
        {activities.map((activity) => (
          <button
            key={activity.id}
            onClick={() => activity.active && onViewChange(activity.id)}
            className={`w-12 h-12 flex items-center justify-center transition-colors relative group ${
              activeView === activity.id
                ? "text-[var(--theme-text)] border-l-2 border-[var(--theme-text)] bg-[var(--theme-bg)]"
                : activity.active
                ? "text-[var(--theme-text)]/50 hover:text-[var(--theme-text)] border-l-2 border-transparent"
                : "text-[var(--theme-text)]/50 opacity-50 border-l-2 border-transparent cursor-default"
            }`}
            title={activity.active ? activity.title : `${activity.title} (coming soon)`}
            data-testid={`activity-${activity.id}`}
          >
            <activity.icon size={24} />
            <span className="absolute left-14 px-2 py-1 bg-[var(--theme-sidebar)] border border-[var(--theme-border)] text-xs text-[var(--theme-text)] rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none z-50 transition-opacity">
              {activity.title} {!activity.active && "(coming soon)"}
            </span>
          </button>
        ))}
      </div>
      
      <div className="flex flex-col items-center py-2 gap-1 border-t border-[var(--theme-border)]">
        <a
          href="https://github.com/souravrajvi"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 flex items-center justify-center text-[var(--theme-text)]/50 hover:text-[var(--theme-text)] transition-colors group relative"
          title="GitHub"
          data-testid="activity-github"
        >
          <Github size={24} />
          <span className="absolute left-14 px-2 py-1 bg-[var(--theme-sidebar)] border border-[var(--theme-border)] text-xs text-[var(--theme-text)] rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none z-50 transition-opacity">
            GitHub
          </span>
        </a>
        <a
          href="https://linkedin.com/in/souravrajvi"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 flex items-center justify-center text-[var(--theme-text)]/50 hover:text-[var(--theme-text)] transition-colors group relative"
          title="LinkedIn"
          data-testid="activity-linkedin"
        >
          <Linkedin size={24} />
          <span className="absolute left-14 px-2 py-1 bg-[var(--theme-sidebar)] border border-[var(--theme-border)] text-xs text-[var(--theme-text)] rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none z-50 transition-opacity">
            LinkedIn
          </span>
        </a>
        <a
          href="mailto:souravrajvi@gmail.com"
          className="w-12 h-12 flex items-center justify-center text-[var(--theme-text)]/50 hover:text-[var(--theme-text)] transition-colors group relative"
          title="Email"
          data-testid="activity-email"
        >
          <Mail size={24} />
          <span className="absolute left-14 px-2 py-1 bg-[var(--theme-sidebar)] border border-[var(--theme-border)] text-xs text-[var(--theme-text)] rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none z-50 transition-opacity">
            Email
          </span>
        </a>
        <button
          className="w-12 h-12 flex items-center justify-center text-[var(--theme-text)]/50 hover:text-[var(--theme-text)] transition-colors group relative"
          title="Settings"
          data-testid="activity-settings"
        >
          <Settings size={24} />
          <span className="absolute left-14 px-2 py-1 bg-[var(--theme-sidebar)] border border-[var(--theme-border)] text-xs text-[var(--theme-text)] rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none z-50 transition-opacity">
            Settings
          </span>
        </button>
      </div>
    </div>
  );
}
