import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { EditableCodeBlock } from "@/components/EditableCodeBlock";
import { Loader2, BookOpen, Calendar, Code } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEditorMode } from "@/context/EditorModeContext";
import type { Writing } from "@shared/schema";

type ViewMode = "visual" | "editor";

export default function Writings() {
  const { data: writings, isLoading } = useQuery<Writing[]>({
    queryKey: ["/api/writings"],
  });
  const [viewMode, setViewMode] = useState<ViewMode>("visual");
  const { setEditorMode } = useEditorMode();

  useEffect(() => {
    setEditorMode(viewMode === "editor");
    return () => setEditorMode(false);
  }, [viewMode, setEditorMode]);

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center text-[#528bff]">
        <Loader2 className="animate-spin w-8 h-8" data-testid="loader-writings" />
      </div>
    );
  }

  const formattedWritings = writings?.map(w => ({
    title: w.title,
    description: w.description,
    url: w.url,
    publishedAt: w.publishedAt
  }));

  const codeString = JSON.stringify(formattedWritings, null, 2);

  return (
    <div className="h-full flex flex-col">
      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.3 }}
        className="flex-1 flex flex-col"
      >
        <div className="flex items-center justify-between mb-8 px-2">
          <h2 className="text-2xl font-bold text-[#c678dd] flex items-center gap-3">
            <BookOpen size={24} />
            Writings
          </h2>
          
          <button
            onClick={() => setViewMode(viewMode === "visual" ? "editor" : "visual")}
            className="flex items-center gap-2 text-sm text-[#abb2bf] hover:text-[#61afef] transition-colors"
          >
            <Code size={14} />
            <span>{viewMode === "visual" ? "Open in Editor" : "Close Editor"}</span>
          </button>
        </div>

        <AnimatePresence mode="wait">
          {viewMode === "editor" && (
            <motion.div
              key="editor"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="flex-1 font-mono text-sm border border-[#3e4451] rounded-lg overflow-hidden"
            >
              <EditableCodeBlock initialCode={codeString || "[]"} language="json" />
            </motion.div>
          )}

          {viewMode === "visual" && (
            <motion.div
              key="visual"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="flex-1 overflow-auto"
            >
              <div className="space-y-6 p-2 max-w-4xl">
                {writings && writings.length > 0 ? (
                  writings.map((writing, idx) => (
                    <motion.article
                      key={writing.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-[#282c34] rounded-xl p-6 border border-[#3e4451] hover:border-[#c678dd] transition-all group"
                      data-testid={`writing-${writing.id}`}
                    >
                      <a 
                        href={writing.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="cursor-pointer"
                      >
                        <h3 className="text-xl font-semibold text-[#d4d4d4] group-hover:text-[#c678dd] transition-colors mb-3">
                          {writing.title}
                        </h3>
                      </a>
                      
                      {writing.description && (
                        <p className="text-[#abb2bf] text-sm mb-4">
                          {writing.description}
                        </p>
                      )}
                      
                      <div className="flex items-center gap-4 text-xs text-[#abb2bf]">
                        {writing.publishedAt && (
                          <div className="flex items-center gap-2">
                            <Calendar size={12} />
                            <span>{new Date(writing.publishedAt).toLocaleDateString()}</span>
                          </div>
                        )}
                        {writing.url && (
                          <a 
                            href={writing.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[#61afef] hover:text-[#c678dd] transition-colors"
                          >
                            Read More →
                          </a>
                        )}
                      </div>
                    </motion.article>
                  ))
                ) : (
                  <div className="text-center text-[#abb2bf] py-12">
                    <p>No writings yet</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
