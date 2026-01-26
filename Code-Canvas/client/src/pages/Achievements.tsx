import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { EditableCodeBlock } from "@/components/EditableCodeBlock";
import { Loader2, Award, ExternalLink, Shield, Trophy, Medal, Code } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Achievement } from "@shared/schema";

type ViewMode = "visual" | "editor";

const typeIcons: Record<string, typeof Award> = {
  certification: Shield,
  award: Trophy,
  badge: Medal,
};

const typeColors: Record<string, string> = {
  certification: "text-[#61afef]",
  award: "text-[#e5c07b]",
  badge: "text-[#98c379]",
};

export default function Achievements() {
  const { data: achievements, isLoading } = useQuery<Achievement[]>({
    queryKey: ["/api/achievements"],
  });
  const [viewMode, setViewMode] = useState<ViewMode>("visual");

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center text-[#528bff]">
        <Loader2 className="animate-spin w-8 h-8" data-testid="loader-achievements" />
      </div>
    );
  }

  const formattedAchievements = achievements?.map(a => ({
    title: a.title,
    type: a.type,
    issuer: a.issuer,
    date: a.date,
    description: a.description
  }));

  const codeString = JSON.stringify(formattedAchievements, null, 2);

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
            <Award size={24} />
            Achievements & Certifications
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
              <div className="grid gap-5 p-2 max-w-4xl">
                {achievements?.map((achievement, idx) => {
                  const Icon = typeIcons[achievement.type] || Award;
                  const colorClass = typeColors[achievement.type] || "text-[#61afef]";
                  
                  return (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-[#282c34] rounded-xl p-6 border border-[#3e4451] hover:border-[#e5c07b] transition-colors group"
                      data-testid={`achievement-${achievement.id}`}
                    >
                      <div className="flex items-start gap-5">
                        <div className={`p-3 bg-[#21252b] rounded-xl ${colorClass}`}>
                          <Icon size={28} />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="text-lg font-semibold text-[#d4d4d4] group-hover:text-[#e5c07b] transition-colors">
                                {achievement.title}
                              </h3>
                              <p className="text-[#858585] text-sm mt-1">
                                {achievement.issuer} • {achievement.date}
                              </p>
                            </div>
                            
                            {achievement.credentialUrl && (
                              <a
                                href={achievement.credentialUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#858585] hover:text-[#61afef] transition-colors p-2 rounded-lg hover:bg-[#3e4451]"
                                data-testid={`link-credential-${achievement.id}`}
                              >
                                <ExternalLink size={18} />
                              </a>
                            )}
                          </div>
                          
                          {achievement.description && (
                            <p className="text-[#abb2bf] text-sm mt-4 leading-relaxed">
                              {achievement.description}
                            </p>
                          )}
                          
                          <div className="mt-4">
                            <span className={`inline-block px-3 py-1 text-xs rounded-full font-medium ${
                              achievement.type === 'certification' ? 'bg-[#61afef]/20 text-[#61afef]' :
                              achievement.type === 'award' ? 'bg-[#e5c07b]/20 text-[#e5c07b]' :
                              'bg-[#98c379]/20 text-[#98c379]'
                            }`}>
                              {achievement.type.charAt(0).toUpperCase() + achievement.type.slice(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {(!achievements || achievements.length === 0) && (
                <div className="text-[#5c6370] text-center py-12">
                  <Award size={48} className="mx-auto mb-4 opacity-50" />
                  <p>No achievements yet</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
