import { useProfile } from "@/hooks/use-portfolio";
import { CodeBlock } from "@/components/CodeBlock";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const { data: profile, isLoading } = useProfile();

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center text-[#528bff]">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );
  }

  if (!profile) return <div>Profile not found</div>;

  const codeString = `
import { Developer } from 'world';

class Portfolio extends Developer {
  constructor() {
    super();
    this.name = "${profile.name}";
    this.title = "${profile.title}";
    this.email = "${profile.email || 'contact@example.com'}";
    this.links = {
      github: "${profile.githubUrl || '#'}",
      linkedin: "${profile.linkedinUrl || '#'}"
    };
  }

  async contactMe() {
    return await mailto(this.email);
  }
}

export default new Portfolio();
`;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.3 }}
      className="max-w-4xl"
    >
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#61afef] mb-2">{profile.name}</h1>
        <p className="text-xl text-[#98c379]">{profile.title}</p>
        <p className="text-[#5c6370] mt-1">{profile.email}</p>
      </div>

      <div className="bg-[#282c34] rounded-lg p-4 md:p-6 shadow-2xl border border-[#1e1e1e] overflow-hidden">
        <CodeBlock code={codeString.trim()} language="typescript" />
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
