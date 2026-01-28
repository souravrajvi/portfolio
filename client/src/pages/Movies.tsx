import { useState, useEffect } from "react";
import { useMovieRecs } from "@/hooks/use-portfolio";
import { EditableCodeBlock } from "@/components/EditableCodeBlock";
import { Loader2, Code, Film, Clapperboard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEditorMode } from "@/context/EditorModeContext";

type ViewMode = "visual" | "editor";

export default function Movies() {
  const { data: movies, isLoading } = useMovieRecs();
  const [viewMode, setViewMode] = useState<ViewMode>("visual");
  const { setEditorMode } = useEditorMode();

  useEffect(() => {
    setEditorMode(viewMode === "editor");
    return () => setEditorMode(false);
  }, [viewMode, setEditorMode]);

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center text-[#528bff]">
        <Loader2 className="animate-spin w-8 h-8" data-testid="loader-movies" />
      </div>
    );
  }

  const formattedMovies = movies?.map(m => ({
    title: m.title,
    director: m.director,
    year: m.year,
    genre: m.genre,
    note: m.note
  }));

  const codeString = JSON.stringify(formattedMovies, null, 2);

  const genreColors: Record<string, string> = {
    "Action": "#e06c75",
    "Drama": "#61afef",
    "Comedy": "#98c379",
    "Sci-Fi": "#c678dd",
    "Thriller": "#d19a66",
    "Horror": "#e5c07b",
    "Romance": "#e06c75",
    "Crime": "#56b6c2",
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
          <h2 className="text-2xl font-bold text-[#c678dd] flex items-center gap-3">
            <Film size={24} />
            Movie Recommendations
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
                {movies?.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-[#282c34] rounded-lg overflow-hidden border border-[#3e4451] hover:border-[#c678dd] transition-all group hover:shadow-2xl hover:-translate-y-1"
                  >
                    <div className="h-64 bg-gradient-to-br from-[#c678dd]/20 to-[#61afef]/20 flex items-center justify-center relative overflow-hidden shadow-inner">
                      {item.imageUrl ? (
                        <>
                          <img 
                            src={item.imageUrl} 
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#282c34]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </>
                      ) : (
                        <Clapperboard size={48} className="text-[#c678dd]/40" />
                      )}
                      {item.genre && (
                        <span 
                          className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm"
                          style={{ 
                            backgroundColor: `${genreColors[item.genre] || '#c678dd'}30`,
                            color: genreColors[item.genre] || '#c678dd',
                            border: `1px solid ${genreColors[item.genre] || '#c678dd'}60`
                          }}
                        >
                          {item.genre}
                        </span>
                      )}
                    </div>
                    
                    <div className="p-5 bg-gradient-to-b from-[#282c34] to-[#21252b]">
                      <h3 className="text-[#d4d4d4] font-bold text-base mb-1 group-hover:text-[#c678dd] transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-[#61afef] text-xs font-medium mb-1 opacity-90">Directed by {item.director}</p>
                      <p className="text-[#d19a66] text-xs font-medium mb-3 opacity-75">{item.year}</p>
                      {item.note && (
                        <p className="text-[#5c6370] text-xs italic leading-relaxed">
                          {item.note}
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
