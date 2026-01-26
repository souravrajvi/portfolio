import { createContext, useContext, useState, ReactNode } from 'react';

interface EditorModeContextType {
  isEditorMode: boolean;
  setEditorMode: (value: boolean) => void;
}

const EditorModeContext = createContext<EditorModeContextType>({
  isEditorMode: false,
  setEditorMode: () => {},
});

export function EditorModeProvider({ children }: { children: ReactNode }) {
  const [isEditorMode, setIsEditorMode] = useState(false);

  return (
    <EditorModeContext.Provider value={{ isEditorMode, setEditorMode: setIsEditorMode }}>
      {children}
    </EditorModeContext.Provider>
  );
}

export function useEditorMode() {
  return useContext(EditorModeContext);
}
