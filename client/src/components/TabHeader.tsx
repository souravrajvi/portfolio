import { Link, useLocation } from "wouter";
import { FileJson, FileCode, FileText, X, PanelLeftClose, PanelLeft, Command } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const allTabs = [
  { name: "bio.ts", path: "/", icon: FileCode, color: "text-[#519aba]" },
  { name: "experience.json", path: "/experience", icon: FileJson, color: "text-[#cbcb41]" },
  { name: "projects.ts", path: "/projects", icon: FileCode, color: "text-[#519aba]" },
  { name: "skills.json", path: "/skills", icon: FileJson, color: "text-[#cbcb41]" },
  { name: "education.md", path: "/education", icon: FileText, color: "text-[#519aba]" },
  { name: "music.json", path: "/music", icon: FileJson, color: "text-[#cbcb41]" },
  { name: "books.json", path: "/books", icon: FileJson, color: "text-[#cbcb41]" },
  { name: "writings.md", path: "/writings", icon: FileText, color: "text-[#519aba]" },
  { name: "achievements.json", path: "/achievements", icon: FileJson, color: "text-[#cbcb41]" },
  { name: "blog.md", path: "/blog", icon: FileText, color: "text-[#519aba]" },
];

interface TabHeaderProps {
  onToggleSidebar?: () => void;
  sidebarVisible?: boolean;
  onOpenCommandPalette?: () => void;
}

export function TabHeader({ onToggleSidebar, sidebarVisible = true, onOpenCommandPalette }: TabHeaderProps) {
  const [location, setLocation] = useLocation();
  const [closedTabs, setClosedTabs] = useState<Set<string>>(new Set(
    // Only show bio.ts by default, hide all other tabs
    new Set(allTabs.filter(t => t.path !== "/").map(t => t.path))
  ));
  
  const tabs = allTabs.filter(tab => !closedTabs.has(tab.path));
  
  const handleCloseTab = (e: React.MouseEvent, tabPath: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (tabs.length <= 1) return;
    
    const newClosedTabs = new Set(closedTabs);
    newClosedTabs.add(tabPath);
    setClosedTabs(newClosedTabs);
    
    if (location === tabPath) {
      const remainingTabs = allTabs.filter(t => !newClosedTabs.has(t.path));
      if (remainingTabs.length > 0) {
        setLocation(remainingTabs[0].path);
      }
    }
  };

  return (
    <div className="flex bg-[var(--theme-sidebar)] border-b border-[var(--theme-border)]">
      <button
        onClick={onToggleSidebar}
        className="hidden md:flex items-center justify-center w-10 h-full border-r border-[var(--theme-border)] text-[var(--theme-text)]/50 hover:text-[var(--theme-text)] hover:bg-[var(--theme-border)]/50 transition-colors"
        title={sidebarVisible ? "Hide sidebar (Ctrl+B)" : "Show sidebar (Ctrl+B)"}
        data-testid="button-toggle-sidebar"
      >
        {sidebarVisible ? <PanelLeftClose size={16} /> : <PanelLeft size={16} />}
      </button>
      
      <div className="flex-1 flex overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => {
          const isActive = location === tab.path;
          return (
            <Link key={tab.path} href={tab.path}>
              <div 
                className={cn(
                  "flex items-center px-3 py-2.5 min-w-[120px] max-w-[160px] border-r border-[var(--theme-border)] cursor-pointer text-sm group transition-colors",
                  isActive ? "bg-[var(--theme-bg)] text-[var(--theme-text)] border-t-2 border-t-[var(--theme-accent)]" : "bg-[var(--theme-sidebar)] text-[var(--theme-text)]/60 hover:bg-[var(--theme-border)]/50"
                )}
                data-testid={`tab-${tab.name}`}
              >
                <tab.icon size={14} className={cn("mr-2 shrink-0", tab.color)} />
                <span className="mr-2 truncate flex-1 text-xs">{tab.name}</span>
                <button
                  onClick={(e) => handleCloseTab(e, tab.path)}
                  className={cn(
                    "opacity-0 group-hover:opacity-100 hover:bg-[var(--theme-border)] rounded-sm p-0.5 transition-all shrink-0",
                    isActive && "opacity-100 text-[var(--theme-text)]"
                  )}
                  title="Close"
                  data-testid={`close-tab-${tab.name}`}
                >
                  <X size={14} />
                </button>
              </div>
            </Link>
          );
        })}
      </div>

    </div>
  );
}
