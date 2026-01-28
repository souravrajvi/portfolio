import { useState, useEffect } from "react";
import { useProjects } from "@/hooks/use-portfolio";
import { EditableCodeBlock } from "@/components/EditableCodeBlock";
import { Loader2, ExternalLink, Github, Folder, Star, GitBranch, CircleDot, Code } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEditorMode } from "@/context/EditorModeContext";

const statusColors: Record<string, string> = {
  "Active": "text-[#98c379]",
  "Completed": "text-[#61afef]",
  "Archived": "text-[#5c6370]",
};

type ViewMode = "visual" | "editor";

export default function Projects() {
  const { data: projects, isLoading } = useProjects();
  const [viewMode, setViewMode] = useState<ViewMode>("visual");
  const { setEditorMode } = useEditorMode();

  useEffect(() => {
    setEditorMode(viewMode === "editor");
    return () => setEditorMode(false);
  }, [viewMode, setEditorMode]);

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center text-[#528bff]">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );
  }

  const projectsForCode = projects?.map((project, index) => ({
    id: index + 1,
    name: project.title.toLowerCase().replace(/\s+/g, '-'),
    title: project.title,
    description: project.description,
    techStack: project.techStack,
    status: index === 0 ? "Active" : index === (projects?.length || 1) - 1 ? "Completed" : "Active",
    links: {
      github: project.githubLink || null,
      demo: project.link || null,
    }
  }));

  const codeString = JSON.stringify(projectsForCode || [], null, 2);

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
            Projects
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
              <EditableCodeBlock initialCode={codeString} language="json" />
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
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 p-2">
                {projects?.map((project, index) => {
                  const status = index === 0 ? "Active" : index === projects.length - 1 ? "Completed" : "Active";

                  return (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-[#282c34] rounded-lg overflow-hidden border border-[#3e4451] hover:border-[#61afef] transition-all group shadow-lg"
                      data-testid={`card-project-${project.id}`}
                    >
                      <div className="p-4 bg-[#21252b] border-b border-[#3e4451] flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <Folder size={16} className="text-[#dcb67a]" />
                          <span className="text-[#61afef] font-mono text-sm">
                            {project.title.toLowerCase().replace(/\s+/g, '-')}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className={`flex items-center gap-1.5 text-xs ${statusColors[status]}`}>
                            <CircleDot size={10} />
                            <span>{status}</span>
                          </div>
                          {project.githubLink && (
                            <a 
                              href={project.githubLink} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-[#abb2bf] hover:text-white transition-colors"
                              data-testid={`link-github-${project.id}`}
                            >
                              <Github size={16} />
                            </a>
                          )}
                          {project.link && (
                            <a 
                              href={project.link} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-[#abb2bf] hover:text-white transition-colors"
                              data-testid={`link-demo-${project.id}`}
                            >
                              <ExternalLink size={16} />
                            </a>
                          )}
                        </div>
                      </div>
                      
                      {project.imageUrl && (
                        <div className="h-48 overflow-hidden bg-[#21252b]">
                          <img 
                            src={project.imageUrl} 
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      
                      <div className="p-6">
                        <h3 className="text-[#d4d4d4] font-semibold text-lg mb-3">{project.title}</h3>
                        <p className="text-[#abb2bf] text-sm mb-5 leading-relaxed line-clamp-3">{project.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-5">
                          {project.techStack.map((tech, i) => (
                            <span 
                              key={i} 
                              className="px-3 py-1 text-xs bg-[#3e4451] text-[#abb2bf] rounded-md"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-5 text-xs text-[#5c6370]">
                          <div className="flex items-center gap-1.5">
                            <Star size={12} />
                            <span>{(project.id * 7 + 15) % 50 + 10}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <GitBranch size={12} />
                            <span>main</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
