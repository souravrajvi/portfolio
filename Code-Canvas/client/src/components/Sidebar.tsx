import { Link, useLocation } from "wouter";
import { 
  FileJson, 
  FileCode, 
  FileText, 
  FolderOpen, 
  FolderClosed,
  MoreHorizontal,
  ChevronRight,
  ChevronDown,
  Plus
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { NewFileDialog } from "./NewFileDialog";
import { useScratchFiles } from "@/context/ScratchFilesContext";

const folders = [
  {
    name: "about",
    files: [
      { name: "bio.ts", path: "/", icon: FileCode, color: "text-[#519aba]" },
      { name: "skills.json", path: "/skills", icon: FileJson, color: "text-[#cbcb41]" },
      { name: "education.md", path: "/education", icon: FileText, color: "text-[#519aba]" },
    ]
  },
  {
    name: "career",
    files: [
      { name: "experience.json", path: "/experience", icon: FileJson, color: "text-[#cbcb41]" },
      { name: "projects.ts", path: "/projects", icon: FileCode, color: "text-[#519aba]" },
      { name: "achievements.json", path: "/achievements", icon: FileJson, color: "text-[#cbcb41]" },
    ]
  },
  {
    name: "personal",
    files: [
      { name: "music.json", path: "/music", icon: FileJson, color: "text-[#cbcb41]" },
      { name: "books.json", path: "/books", icon: FileJson, color: "text-[#cbcb41]" },
    ]
  },
  {
    name: "publications",
    files: [
      { name: "writings.md", path: "/writings", icon: FileText, color: "text-[#519aba]" },
      { name: "blog.md", path: "/blog", icon: FileText, color: "text-[#519aba]" },
    ]
  }
];

export function Sidebar() {
  const [location] = useLocation();
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    about: true,
    career: true,
    personal: true,
    publications: true,
    scratch: true,
  });
  const [newFileOpen, setNewFileOpen] = useState(false);
  const { files: userFiles, selectedFile: selectedUserFile, addFileAndSelect, selectFile } = useScratchFiles();

  const handleCreateFile = (filename: string, content: string) => {
    addFileAndSelect(filename, content);
  };

  const toggleFolder = (name: string) => {
    setExpandedFolders(prev => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <aside className="w-52 bg-[var(--theme-sidebar)] border-r border-[var(--theme-border)] flex-col hidden md:flex">
      {/* Explorer */}
      <div className="flex-1 bg-[var(--theme-sidebar)] text-[var(--theme-text)] flex flex-col overflow-y-auto">
          <div className="text-xs font-bold px-4 py-3 uppercase tracking-wider text-[var(--theme-text)]/70 flex justify-between items-center">
            <span>Explorer</span>
            <MoreHorizontal size={16} className="hover:text-[var(--theme-text)] cursor-pointer" />
          </div>
          
          <div className="px-0">
            <div className="px-2 py-1 text-xs font-bold flex items-center text-[var(--theme-text)] bg-[var(--theme-border)] cursor-pointer hover:opacity-80 transition-colors">
              <ChevronDown size={14} className="mr-1" />
              <span>PORTFOLIO</span>
            </div>
            
            <div className="mt-1 pl-2">
              {folders.map((folder) => (
                <div key={folder.name}>
                  <div
                    onClick={() => toggleFolder(folder.name)}
                    className="px-2 py-1 flex items-center cursor-pointer hover:bg-[var(--theme-border)]/50 transition-colors text-sm group"
                    data-testid={`folder-${folder.name}`}
                  >
                    {expandedFolders[folder.name] ? (
                      <>
                        <ChevronDown size={14} className="mr-1 text-[var(--theme-text)]/50" />
                        <FolderOpen size={16} className="mr-2 text-[#dcb67a]" />
                      </>
                    ) : (
                      <>
                        <ChevronRight size={14} className="mr-1 text-[var(--theme-text)]/50" />
                        <FolderClosed size={16} className="mr-2 text-[#dcb67a]" />
                      </>
                    )}
                    <span className="text-[var(--theme-text)]">{folder.name}</span>
                  </div>
                  
                  {expandedFolders[folder.name] && (
                    <div className="pl-4">
                      {folder.files.map((file) => (
                        <Link key={file.path} href={file.path}>
                          <div 
                            onClick={() => selectFile(null)}
                            className={cn(
                              "px-4 py-1 flex items-center cursor-pointer transition-all text-sm group relative",
                              location === file.path && !selectedUserFile
                                ? "bg-[var(--theme-accent)] text-white" 
                                : "hover:bg-[var(--theme-border)]/50"
                            )}
                            data-testid={`file-${file.name}`}
                          >
                            {location === file.path && !selectedUserFile && (
                              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-white" />
                            )}
                            <file.icon size={16} className={cn("mr-2 shrink-0", file.color)} />
                            <span className="truncate">{file.name}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {/* Scratch folder for user-created files */}
              <div>
                <div
                  onClick={() => toggleFolder('scratch')}
                  className="px-2 py-1 flex items-center cursor-pointer hover:bg-[var(--theme-border)]/50 transition-colors text-sm group"
                  data-testid="folder-scratch"
                >
                  {expandedFolders.scratch ? (
                    <>
                      <ChevronDown size={14} className="mr-1 text-[var(--theme-text)]/50" />
                      <FolderOpen size={16} className="mr-2 text-[#98c379]" />
                    </>
                  ) : (
                    <>
                      <ChevronRight size={14} className="mr-1 text-[var(--theme-text)]/50" />
                      <FolderClosed size={16} className="mr-2 text-[#98c379]" />
                    </>
                  )}
                  <span className="text-[var(--theme-text)]">scratch</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setNewFileOpen(true);
                    }}
                    className="ml-auto opacity-0 group-hover:opacity-100 p-0.5 hover:bg-[var(--theme-border)] rounded transition-all"
                    title="New File"
                    data-testid="button-new-file"
                  >
                    <Plus size={14} className="text-[var(--theme-text)]/70" />
                  </button>
                </div>
                
                {expandedFolders.scratch && (
                  <div className="pl-4">
                    {userFiles.length === 0 ? (
                      <div 
                        className="px-4 py-1 text-xs text-[var(--theme-text)]/40 italic cursor-pointer hover:text-[var(--theme-text)]/60"
                        onClick={() => setNewFileOpen(true)}
                      >
                        Click + to create a file
                      </div>
                    ) : (
                      userFiles.map((file) => {
                        const isJson = file.name.endsWith('.json');
                        const isTs = file.name.endsWith('.ts');
                        const Icon = isJson ? FileJson : isTs ? FileCode : FileText;
                        const color = isJson ? 'text-[#cbcb41]' : 'text-[#519aba]';
                        return (
                          <div 
                            key={file.name}
                            onClick={() => selectFile(selectedUserFile === file.name ? null : file.name)}
                            className={cn(
                              "px-4 py-1 flex items-center cursor-pointer transition-all text-sm relative",
                              selectedUserFile === file.name 
                                ? "bg-[var(--theme-accent)] text-white" 
                                : "hover:bg-[var(--theme-border)]/50"
                            )}
                            data-testid={`user-file-${file.name}`}
                          >
                            {selectedUserFile === file.name && (
                              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-white" />
                            )}
                            <Icon size={16} className={cn("mr-2 shrink-0", color)} />
                            <span className="truncate">{file.name}</span>
                          </div>
                        );
                      })
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      
      <NewFileDialog 
        isOpen={newFileOpen} 
        onClose={() => setNewFileOpen(false)} 
        onCreateFile={handleCreateFile}
      />
    </aside>
  );
}
