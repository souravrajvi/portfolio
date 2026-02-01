import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'wouter';
import { ActivityBar } from './ActivityBar';
import { Sidebar } from './Sidebar';
import { TabHeader } from './TabHeader';
import { StatusBar } from './StatusBar';
import { MobileNav } from './MobileNav';
import { CommandPalette } from './CommandPalette';
import { KeyboardShortcuts } from './KeyboardShortcuts';
import { FindDialog } from './FindDialog';
import { Terminal } from './Terminal';
import { ThemeSwitcher } from './ThemeSwitcher';
import { ContactForm } from './ContactForm';
import { ScratchFileViewer } from './ScratchFileViewer';
import { useScratchFiles } from '@/context/ScratchFilesContext';

const pathToFile: Record<string, { name: string; folder: string }> = {
  "/": { name: "bio.ts", folder: "about" },
  "/experience": { name: "experience.json", folder: "career" },
  "/projects": { name: "projects.ts", folder: "career" },
  "/skills": { name: "skills.json", folder: "about" },
  "/education": { name: "education.md", folder: "about" },
  "/music": { name: "music.json", folder: "personal" },
  "/books": { name: "books.json", folder: "personal" },
  "/achievements": { name: "achievements.json", folder: "career" },
  "/blog": { name: "blog.md", folder: "publications" },
  "/writings": { name: "writings.md", folder: "publications" },
};

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [commandOpen, setCommandOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const [findOpen, setFindOpen] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [activeView, setActiveView] = useState("explorer");
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const { selectedFile: selectedScratchFile, selectFile } = useScratchFiles();

  useEffect(() => {
    selectFile(null);
  }, [location]);

  const currentFile = selectedScratchFile 
    ? { name: selectedScratchFile, folder: "scratch" }
    : pathToFile[location] || { name: "unknown", folder: "src" };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const modifier = isMac ? e.metaKey : e.ctrlKey;

    if (modifier && e.key === 'k') {
      e.preventDefault();
      setCommandOpen(true);
    }
    if (modifier && e.key === 'b') {
      e.preventDefault();
      setSidebarVisible(prev => !prev);
    }
    if (modifier && e.key === '/') {
      e.preventDefault();
      setShortcutsOpen(true);
    }
    if (modifier && e.key === 'f') {
      e.preventDefault();
      setFindOpen(true);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="flex h-screen bg-[var(--theme-bg)] text-[var(--theme-text)] flex-col md:flex-row overflow-hidden">
      <ActivityBar activeView={activeView} onViewChange={setActiveView} />
      {sidebarVisible && <Sidebar />}
      <div className="flex-1 flex flex-col h-full min-w-0">
        <TabHeader 
          onToggleSidebar={() => setSidebarVisible(prev => !prev)} 
          sidebarVisible={sidebarVisible}
          onOpenCommandPalette={() => setCommandOpen(true)}
        />
        
        <div className="hidden md:flex items-center justify-between px-4 py-1 text-xs text-[var(--theme-text)]/60 border-b border-[var(--theme-border)] bg-[var(--theme-bg)]">
          <div className="flex items-center">
            <span className="hover:text-[var(--theme-text)] cursor-pointer transition-colors">src</span>
            <span className="mx-1 opacity-50">/</span>
            <span className="hover:text-[var(--theme-text)] cursor-pointer transition-colors">{currentFile.folder}</span>
            <span className="mx-1 opacity-50">/</span>
            <span className="text-[var(--theme-text)]">{currentFile.name}</span>
          </div>
          <ThemeSwitcher />
        </div>

        <main className="flex-1 overflow-auto bg-[var(--theme-bg)] p-6">
          {selectedScratchFile ? <ScratchFileViewer /> : children}
        </main>
        
        {terminalOpen && <Terminal isOpen={terminalOpen} onToggle={() => setTerminalOpen(false)} />}
        
        <StatusBar currentFile={currentFile.name} onOpenContact={() => setContactOpen(true)} />
        <MobileNav />
        
        {!terminalOpen && (
          <Terminal isOpen={false} onToggle={() => setTerminalOpen(true)} />
        )}
      </div>

      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
      <KeyboardShortcuts open={shortcutsOpen} onOpenChange={setShortcutsOpen} />
      <FindDialog open={findOpen} onOpenChange={setFindOpen} />
      <ContactForm isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}
