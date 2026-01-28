import { useProfile } from "@/hooks/use-portfolio";
import { Loader2, Terminal } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Home() {
  const { data: profile, isLoading } = useProfile();
  const [typedLines, setTypedLines] = useState<number>(0);

  const terminalLines = [
    { prompt: "souravrajvi@portfolio:~$", command: "whoami", output: "Sourav Rajvi - Software Engineer" },
    { prompt: "souravrajvi@portfolio:~$", command: "cat about.txt", output: "Backend engineer specializing in Node.js, AWS cloud infrastructure,\nand microservices architecture. Experienced in building scalable\nsystems processing 10,000+ transactions daily with 99.9% uptime." },
    { prompt: "souravrajvi@portfolio:~$", command: "ls skills/", output: "languages/    frameworks/    tools/    databases/" },
    { prompt: "souravrajvi@portfolio:~$", command: "echo $CURRENTLY_WORKING_ON", output: '"Architecting AWS middleware at AGSuite Technologies"' },
    { prompt: "souravrajvi@portfolio:~$", command: "cat contact.json", output: '{\n  "email": "souravrajvi@gmail.com",\n  "github": "https://github.com/Souravrajvi0",\n  "linkedin": "https://www.linkedin.com/in/souravrajvi/"\n}' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTypedLines(prev => {
        if (prev < terminalLines.length) {
          return prev + 1;
        }
        return prev;
      });
    }, 600);

    return () => clearInterval(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center text-[#528bff]">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );
  }

  if (!profile) return <div>Profile not found</div>;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.3 }}
      className="max-w-5xl"
    >
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-[#61afef] mb-2">{profile.name}</h1>
        <p className="text-xl text-[#98c379]">{profile.title}</p>
        <p className="text-[#abb2bf] mt-1">{profile.email}</p>
      </div>

      <div className="bg-[#1e2127] rounded-lg shadow-2xl border border-[#181a1f] overflow-hidden">
        {/* Terminal Header */}
        <div className="bg-[#21252b] px-4 py-3 flex items-center gap-2 border-b border-[#181a1f]">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#e06c75]"></div>
            <div className="w-3 h-3 rounded-full bg-[#e5c07b]"></div>
            <div className="w-3 h-3 rounded-full bg-[#98c379]"></div>
          </div>
          <div className="flex items-center gap-2 ml-4 text-[#5c6370]">
            <Terminal size={14} />
            <span className="text-sm font-mono">bash</span>
          </div>
        </div>

        {/* Terminal Content */}
        <div className="p-6 font-mono text-sm space-y-4 min-h-[500px]">
          {terminalLines.slice(0, typedLines).map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Command Line */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[#98c379]">{line.prompt}</span>
                <span className="text-[#61afef]">{line.command}</span>
              </div>
              {/* Output */}
              <div className="text-[#abb2bf] ml-0 mb-4 whitespace-pre-wrap">
                {line.output}
              </div>
            </motion.div>
          ))}
          
          {typedLines === terminalLines.length && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex items-center gap-2"
            >
              <span className="text-[#98c379]">souravrajvi@portfolio:~$</span>
              <span className="animate-pulse text-[#abb2bf]">█</span>
            </motion.div>
          )}
        </div>
      </div>

      <div className="mt-8 flex gap-4">
        {profile.githubUrl && (
          <a 
            href={profile.githubUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-6 py-3 bg-[#61afef]/10 text-[#61afef] border border-[#61afef]/20 rounded hover:bg-[#61afef]/20 transition-all font-semibold flex items-center gap-2"
          >
            GitHub
          </a>
        )}
        {profile.linkedinUrl && (
          <a 
            href={profile.linkedinUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-6 py-3 bg-[#528bff]/10 text-[#528bff] border border-[#528bff]/20 rounded hover:bg-[#528bff]/20 transition-all font-semibold flex items-center gap-2"
          >
            LinkedIn
          </a>
        )}
      </div>
    </motion.div>
  );
}
