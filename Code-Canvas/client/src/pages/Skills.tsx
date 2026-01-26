import { useState } from "react";
import { useSkills } from "@/hooks/use-portfolio";
import { EditableCodeBlock } from "@/components/EditableCodeBlock";
import { Loader2, Code } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type ViewMode = "visual" | "editor";

export default function Skills() {
  const { data: skills, isLoading } = useSkills();
  const [viewMode, setViewMode] = useState<ViewMode>("visual");

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center text-[#528bff]">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );
  }

  const skillsMap = skills?.reduce((acc, skill) => {
    acc[skill.category] = skill.items;
    return acc;
  }, {} as Record<string, string[]>);

  const codeString = JSON.stringify(skillsMap || {}, null, 2);

  const categoryColors: Record<string, string> = {
    "Languages": "#e06c75",
    "Web Development": "#61afef",
    "Cloud & Databases": "#98c379",
    "Tools": "#c678dd",
    "Frameworks": "#d19a66",
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
          <h2 className="text-2xl font-bold text-[#61afef]">
            Skills
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
              <EditableCodeBlock initialCode={codeString || "{}"} language="json" />
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2">
                {skills?.map((skillGroup, index) => (
                  <motion.div
                    key={skillGroup.category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-[#282c34] rounded-lg overflow-hidden border border-[#3e4451] hover:border-[#61afef] transition-all"
                  >
                    <div 
                      className="p-4 bg-[#21252b] border-b border-[#3e4451]"
                      style={{ borderLeft: `3px solid ${categoryColors[skillGroup.category] || '#61afef'}` }}
                    >
                      <h3 
                        className="font-semibold text-lg"
                        style={{ color: categoryColors[skillGroup.category] || '#61afef' }}
                      >
                        {skillGroup.category}
                      </h3>
                    </div>
                    
                    <div className="p-5">
                      <div className="flex flex-wrap gap-2">
                        {skillGroup.items.map((skill, i) => (
                          <span 
                            key={i}
                            className="px-3 py-1.5 text-sm bg-[#3e4451] text-[#abb2bf] rounded-md hover:bg-[#4e5666] transition-colors"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
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
