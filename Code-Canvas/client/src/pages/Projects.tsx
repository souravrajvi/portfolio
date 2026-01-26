import { useState } from "react";
import { useProjects } from "@/hooks/use-portfolio";
import { EditableCodeBlock } from "@/components/EditableCodeBlock";
import { Loader2, ExternalLink, Github, Folder, Star, GitBranch, CircleDot, Code, LayoutGrid, Image } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const statusColors: Record<string, string> = {
  "Active": "text-[#98c379]",
  "Completed": "text-[#61afef]",
  "Archived": "text-[#5c6370]",
};

type ViewMode = "code" | "cards" | "gallery";

export default function Projects() {
  const { data: projects, isLoading } = useProjects();
  const [viewMode, setViewMode] = useState<ViewMode>("cards");

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
    stars: (project.id * 7 + 15) % 50 + 10,
    branch: "main",
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
              onClick={() => setViewMode("cards")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded text-sm transition-all ${
                viewMode === "cards" 
                  ? "bg-[#3e4451] text-[#61afef]" 
                  : "text-[#abb2bf] hover:text-white"
              }`}
              title="Cards View"
            >
              <LayoutGrid size={14} />
              <span className="hidden sm:inline">Cards</span>
            </button>
            <button
              onClick={() => setViewMode("gallery")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded text-sm transition-all ${
                viewMode === "gallery" 
                  ? "bg-[#3e4451] text-[#61afef]" 
                  : "text-[#abb2bf] hover:text-white"
              }`}
              title="Gallery View"
            >
              <Image size={14} />
              <span className="hidden sm:inline">Gallery</span>
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
              <div className="h-full">
                <EditableCodeBlock initialCode={codeString} language="json" />
              </div>
            </motion.div>
          )}

          {viewMode === "cards" && (
            <motion.div
              key="cards"
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

          {viewMode === "gallery" && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="flex-1 overflow-auto"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-2">
                {projects?.map((project, index) => {
                  const status = index === 0 ? "Active" : index === projects.length - 1 ? "Completed" : "Active";
                  const gradientColors = [
                    "from-[#61afef]/20 to-[#c678dd]/20",
                    "from-[#98c379]/20 to-[#61afef]/20",
                    "from-[#e06c75]/20 to-[#d19a66]/20",
                    "from-[#c678dd]/20 to-[#56b6c2]/20",
                    "from-[#d19a66]/20 to-[#98c379]/20",
                  ];
                  const gradient = gradientColors[index % gradientColors.length];

                  return (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group cursor-pointer"
                    >
                      <div className="bg-[#282c34] rounded-xl overflow-hidden border border-[#3e4451] hover:border-[#61afef] transition-all shadow-lg hover:shadow-xl hover:scale-[1.02]">
                        <div className={`h-40 bg-gradient-to-br ${gradient} flex items-center justify-center relative`}>
                          <div className="absolute inset-0 bg-[#21252b]/30 backdrop-blur-sm" />
                          <div className="relative z-10 text-center px-4">
                            <Folder size={32} className="mx-auto mb-2 text-[#dcb67a]" />
                            <span className="text-[#61afef] font-mono text-xs block">
                              {project.title.toLowerCase().replace(/\s+/g, '-')}
                            </span>
                          </div>
                          <div className={`absolute top-3 right-3 flex items-center gap-1 text-xs ${statusColors[status]} bg-[#21252b]/80 px-2 py-1 rounded`}>
                            <CircleDot size={8} />
                            <span>{status}</span>
                          </div>
                        </div>
                        
                        <div className="p-5">
                          <h3 className="text-[#d4d4d4] font-semibold mb-2 group-hover:text-[#61afef] transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-[#5c6370] text-xs mb-4 line-clamp-2">{project.description}</p>
                          
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {project.techStack.slice(0, 3).map((tech, i) => (
                              <span 
                                key={i} 
                                className="px-2 py-0.5 text-[10px] bg-[#3e4451] text-[#abb2bf] rounded"
                              >
                                {tech}
                              </span>
                            ))}
                            {project.techStack.length > 3 && (
                              <span className="px-2 py-0.5 text-[10px] bg-[#3e4451] text-[#5c6370] rounded">
                                +{project.techStack.length - 3}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 text-xs text-[#5c6370]">
                              <div className="flex items-center gap-1">
                                <Star size={10} />
                                <span>{(project.id * 7 + 15) % 50 + 10}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {project.githubLink && (
                                <a 
                                  href={project.githubLink} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="text-[#5c6370] hover:text-[#61afef] transition-colors"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Github size={14} />
                                </a>
                              )}
                              {project.link && (
                                <a 
                                  href={project.link} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="text-[#5c6370] hover:text-[#61afef] transition-colors"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <ExternalLink size={14} />
                                </a>
                              )}
                            </div>
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
