import { useState } from "react";
import { useBookRecs } from "@/hooks/use-portfolio";
import { EditableCodeBlock } from "@/components/EditableCodeBlock";
import { Loader2, Code, BookOpen, Book } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type ViewMode = "visual" | "editor";

export default function Books() {
  const { data: books, isLoading } = useBookRecs();
  const [viewMode, setViewMode] = useState<ViewMode>("visual");

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center text-[#528bff]">
        <Loader2 className="animate-spin w-8 h-8" data-testid="loader-books" />
      </div>
    );
  }

  const formattedBooks = books?.map(b => ({
    title: b.title,
    author: b.author,
    genre: b.genre,
    note: b.note
  }));

  const codeString = JSON.stringify(formattedBooks, null, 2);

  const genreColors: Record<string, string> = {
    "Fiction": "#e06c75",
    "Non-Fiction": "#61afef",
    "Self-Help": "#98c379",
    "Technology": "#c678dd",
    "Business": "#d19a66",
    "Science": "#56b6c2",
    "Philosophy": "#e5c07b",
    "Biography": "#abb2bf",
  };

  return (
    <div className="h-full flex flex-col">
      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.3 }}
        className="flex-1 flex flex-col"
      >
        <div className="flex items-center justify-between mb-8 px-2">
          <h2 className="text-2xl font-bold text-[#98c379] flex items-center gap-3">
            <BookOpen size={24} />
            Book Recommendations
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-2">
                {books?.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-[#282c34] rounded-xl overflow-hidden border border-[#3e4451] hover:border-[#98c379] transition-all group hover:shadow-lg"
                  >
                    <div className="h-32 bg-gradient-to-br from-[#98c379]/20 to-[#d19a66]/20 flex items-center justify-center relative">
                      <Book size={40} className="text-[#98c379]/60" />
                      {item.genre && (
                        <span 
                          className="absolute top-3 right-3 px-2 py-0.5 rounded text-xs"
                          style={{ 
                            backgroundColor: `${genreColors[item.genre] || '#98c379'}20`,
                            color: genreColors[item.genre] || '#98c379'
                          }}
                        >
                          {item.genre}
                        </span>
                      )}
                    </div>
                    
                    <div className="p-5">
                      <h3 className="text-[#d4d4d4] font-semibold text-lg mb-1 group-hover:text-[#98c379] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-[#d19a66] text-sm mb-3">by {item.author}</p>
                      {item.note && (
                        <p className="text-[#5c6370] text-xs italic leading-relaxed">
                          "{item.note}"
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
