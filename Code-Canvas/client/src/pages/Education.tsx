import { useEducation } from "@/hooks/use-portfolio";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Education() {
  const { data: education, isLoading } = useEducation();

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
      className="max-w-4xl font-mono"
    >
      <h2 className="text-2xl font-bold text-[#61afef] mb-8 border-b border-[#3e4451] pb-4">
        README.md
      </h2>

      <div className="prose prose-invert max-w-none">
        <h3 className="text-[#e06c75] text-xl font-bold mb-4"># Education History</h3>
        
        <div className="space-y-8">
          {education?.map((edu, idx) => (
            <div key={edu.id} className="relative pl-6 border-l-2 border-[#3e4451] hover:border-[#98c379] transition-colors">
              <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-[#282c34] border-2 border-[#98c379]"></div>
              
              <h4 className="text-lg font-semibold text-[#e5c07b] mb-1">
                ## {edu.institution}
              </h4>
              <p className="text-[#abb2bf] mb-2 font-bold">
                {">"} {edu.degree}
              </p>
              <div className="inline-block bg-[#2c313a] px-2 py-1 rounded text-xs text-[#56b6c2]">
                {edu.year}
              </div>
              
              {/* Fake markdown syntax decoration */}
              <div className="mt-2 text-[#5c6370] text-sm">
                [info]: Completed with honors
              </div>
            </div>
          ))}
        </div>

      </div>
    </motion.div>
  );
}
