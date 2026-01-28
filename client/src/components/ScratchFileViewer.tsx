import { useScratchFiles } from '@/context/ScratchFilesContext';
import { EditableCodeBlock } from './EditableCodeBlock';

export function ScratchFileViewer() {
  const { selectedFile, getFileContent, updateFileContent } = useScratchFiles();

  if (!selectedFile) return null;

  const content = getFileContent(selectedFile) || '';
  const isJson = selectedFile.endsWith('.json');
  const isTs = selectedFile.endsWith('.ts');
  const language = isJson ? 'json' : isTs ? 'typescript' : 'markdown';

  return (
    <div className="h-full">
      <EditableCodeBlock 
        initialCode={content} 
        language={language}
        onContentChange={(newContent: string) => updateFileContent(selectedFile, newContent)}
      />
    </div>
  );
}
