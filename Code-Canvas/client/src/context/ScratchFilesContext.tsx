import { createContext, useContext, useState, ReactNode } from 'react';

interface ScratchFile {
  name: string;
  content: string;
}

interface ScratchFilesContextType {
  files: ScratchFile[];
  selectedFile: string | null;
  addFile: (name: string, content: string) => void;
  addFileAndSelect: (name: string, content: string) => void;
  selectFile: (name: string | null) => void;
  updateFileContent: (name: string, content: string) => void;
  getFileContent: (name: string) => string | undefined;
}

const ScratchFilesContext = createContext<ScratchFilesContextType | null>(null);

export function ScratchFilesProvider({ children }: { children: ReactNode }) {
  const [files, setFiles] = useState<ScratchFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const addFile = (name: string, content: string) => {
    setFiles(prev => [...prev, { name, content }]);
  };

  const addFileAndSelect = (name: string, content: string) => {
    setFiles(prev => [...prev, { name, content }]);
    setSelectedFile(name);
  };

  const selectFile = (name: string | null) => {
    setSelectedFile(name);
  };

  const updateFileContent = (name: string, content: string) => {
    setFiles(prev => prev.map(f => f.name === name ? { ...f, content } : f));
  };

  const getFileContent = (name: string) => {
    return files.find(f => f.name === name)?.content;
  };

  return (
    <ScratchFilesContext.Provider value={{ 
      files, 
      selectedFile, 
      addFile,
      addFileAndSelect,
      selectFile, 
      updateFileContent,
      getFileContent 
    }}>
      {children}
    </ScratchFilesContext.Provider>
  );
}

export function useScratchFiles() {
  const context = useContext(ScratchFilesContext);
  if (!context) {
    throw new Error('useScratchFiles must be used within a ScratchFilesProvider');
  }
  return context;
}
