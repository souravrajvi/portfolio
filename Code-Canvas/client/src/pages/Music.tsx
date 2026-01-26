import { useState } from "react";
import { useMusicRecs } from "@/hooks/use-portfolio";
import { EditableCodeBlock } from "@/components/EditableCodeBlock";
import { Loader2, Code, LayoutGrid, Music2, Headphones } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type ViewMode = "code" | "visual";

export default function Music() {
  const { data: music, isLoading } = useMusicRecs();
  const [viewMode, setViewMode] = useState<ViewMode>("visual");

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center text-[#528bff]">
        <Loader2 className="animate-spin w-8 h-8" data-testid="loader-music" />
      </div>
    );
  }

  const formattedMusic = music?.map(m => ({
    title: m.title,
    artist: m.artist,
    genre: m.genre,
    note: m.note
  }));

  const codeString = JSON.stringify(formattedMusic, null, 2);

  const genreColors: Record<string, string> = {
    "Rock": "#e06c75",
    "Pop": "#c678dd",
    "Electronic": "#61afef",
    "Jazz": "#d19a66",
    "Classical": "#98c379",
    "Hip-Hop": "#56b6c2",
    "R&B": "#e5c07b",
    "Indie": "#abb2bf",
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
            <Headphones size={24} />
            Music Recommendations
          </h2>
          
          <div className="flex items-center gap-1 bg-[#21252b] rounded-lg p-1 border border-[#3e4451]">
            <button
              onClick={() => setViewMode("code")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded text-sm transition-all ${
                viewMode === "code" 
                  ? "bg-[#3e4451] text-[#61afef]" 
                  : "text-[#abb2bf] hover:text-white"
              }`}
              title="Code View"
            >
              <Code size={14} />
              <span className="hidden sm:inline">Code</span>
            </button>
            <button
              onClick={() => setViewMode("visual")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded text-sm transition-all ${
                viewMode === "visual" 
                  ? "bg-[#3e4451] text-[#61afef]" 
                  : "text-[#abb2bf] hover:text-white"
              }`}
              title="Visual View"
            >
              <LayoutGrid size={14} />
              <span className="hidden sm:inline">Visual</span>
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {viewMode === "code" && (
            <motion.div
              key="code"
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
                {music?.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-[#282c34] rounded-xl overflow-hidden border border-[#3e4451] hover:border-[#c678dd] transition-all group hover:shadow-lg"
                  >
                    <div className="h-32 bg-gradient-to-br from-[#c678dd]/20 to-[#61afef]/20 flex items-center justify-center relative">
                      <Music2 size={40} className="text-[#c678dd]/60" />
                      {item.genre && (
                        <span 
                          className="absolute top-3 right-3 px-2 py-0.5 rounded text-xs"
                          style={{ 
                            backgroundColor: `${genreColors[item.genre] || '#61afef'}20`,
                            color: genreColors[item.genre] || '#61afef'
                          }}
                        >
                          {item.genre}
                        </span>
                      )}
                    </div>
                    
                    <div className="p-5">
                      <h3 className="text-[#d4d4d4] font-semibold text-lg mb-1 group-hover:text-[#c678dd] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-[#61afef] text-sm mb-3">{item.artist}</p>
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
