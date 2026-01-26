import { useProjects } from "@/hooks/use-portfolio";
import { CodeBlock } from "@/components/CodeBlock";
import { Loader2, ExternalLink, Github, Folder, Star, GitBranch, CircleDot } from "lucide-react";
import { motion } from "framer-motion";

const statusColors: Record<string, string> = {
  "Active": "text-[#98c379]",
  "Completed": "text-[#61afef]",
  "Archived": "text-[#5c6370]",
};

export default function Projects() {
  const { data: projects, isLoading } = useProjects();

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center text-[#528bff]">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.3 }}
      className="max-w-6xl"
    >
      <h2 className="text-2xl font-bold text-[#61afef] mb-6">
        Projects
      </h2>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {projects?.map((project, index) => {
          const status = index === 0 ? "Active" : index === projects.length - 1 ? "Completed" : "Active";
          
          const projectObject = {
            id: index + 1,
            title: project.title,
            stack: project.techStack,
            description: project.description,
            status: status,
          };
          
          const codeString = JSON.stringify(projectObject, null, 2)
            .replace(/"(\w+)":/g, '<span class="text-[#e06c75]">$1</span>:')
            .replace(/: "([^"]+)"/g, ': <span class="text-[#98c379]">"$1"</span>')
            .replace(/: (\d+)/g, ': <span class="text-[#d19a66]">$1</span>')
            .replace(/\[/g, '<span class="text-[#abb2bf]">[</span>')
            .replace(/\]/g, '<span class="text-[#abb2bf]">]</span>')
            .replace(/\{/g, '<span class="text-[#abb2bf]">{</span>')
            .replace(/\}/g, '<span class="text-[#abb2bf]">}</span>');

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#282c34] rounded-lg overflow-hidden border border-[#3e4451] hover:border-[#61afef] transition-all group shadow-lg"
              data-testid={`card-project-${project.id}`}
            >
              <div className="p-3 bg-[#21252b] border-b border-[#3e4451] flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Folder size={14} className="text-[#dcb67a]" />
                  <span className="text-[#61afef] font-mono text-sm">
                    {project.title.toLowerCase().replace(/\s+/g, '-')}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`flex items-center gap-1 text-xs ${statusColors[status]}`}>
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
                      <Github size={14} />
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
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-[#d4d4d4] font-semibold mb-2">{project.title}</h3>
                <p className="text-[#abb2bf] text-sm mb-4 line-clamp-2">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech, i) => (
                    <span 
                      key={i} 
                      className="px-2 py-0.5 text-xs bg-[#3e4451] text-[#abb2bf] rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-xs text-[#5c6370]">
                  <div className="flex items-center gap-1">
                    <Star size={12} />
                    <span>{(project.id * 7 + 15) % 50 + 10}</span>
                  </div>
                  <div className="flex items-center gap-1">
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
  );
}
