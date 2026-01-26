import { useState } from "react";
import { useExperiences } from "@/hooks/use-portfolio";
import { EditableCodeBlock } from "@/components/EditableCodeBlock";
import { Loader2, Code, Briefcase, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type ViewMode = "visual" | "editor";

export default function Experiences() {
  const { data: experiences, isLoading } = useExperiences();
  const [viewMode, setViewMode] = useState<ViewMode>("visual");

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center text-[#528bff]">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );
  }

  const formattedExperiences = experiences?.map(exp => ({
    company: exp.company,
    role: exp.role,
    period: exp.duration,
    description: exp.description
  }));

  const codeString = JSON.stringify(formattedExperiences, null, 2);

  return (
    <div className="h-full flex flex-col">
      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.3 }}
        className="flex-1 flex flex-col"
      >
        <div className="flex items-center justify-between mb-8 px-2">
          <h2 className="text-2xl font-bold text-[#e5c07b] flex items-center gap-3">
            <Briefcase size={24} />
            Experience
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
                {experiences?.map((exp, index) => (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative pl-8 before:absolute before:left-3 before:top-8 before:bottom-0 before:w-px before:bg-[#3e4451] last:before:hidden"
                  >
                    <div className="absolute left-0 top-2 w-6 h-6 rounded-full bg-[#e5c07b]/20 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#e5c07b]" />
                    </div>
                    
                    <div className="bg-[#282c34] rounded-xl p-6 border border-[#3e4451] hover:border-[#e5c07b] transition-all group">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="px-3 py-1 bg-[#e5c07b]/20 text-[#e5c07b] text-xs rounded-full font-medium">
                          {exp.role}
                        </span>
                        <span className="flex items-center gap-1 text-[#5c6370] text-xs">
                          <Calendar size={12} />
                          {exp.duration}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-[#d4d4d4] mb-3 group-hover:text-[#e5c07b] transition-colors">
                        {exp.company}
                      </h3>
                      
                      <p className="text-[#abb2bf] text-sm leading-relaxed">
                        {exp.description}
                      </p>
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
