import { useQuery } from "@tanstack/react-query";
import { Loader2, Award, ExternalLink, Shield, Trophy, Medal } from "lucide-react";
import { motion } from "framer-motion";
import type { Achievement } from "@shared/schema";

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

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center text-[#528bff]">
        <Loader2 className="animate-spin w-8 h-8" data-testid="loader-achievements" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl"
    >
      <h2 className="text-2xl font-bold text-[#e5c07b] mb-8 flex items-center gap-3">
        <Award className="text-[#e5c07b]" />
        Achievements & Certifications
      </h2>

      <div className="grid gap-4">
        {achievements?.map((achievement, idx) => {
          const Icon = typeIcons[achievement.type] || Award;
          const colorClass = typeColors[achievement.type] || "text-[#61afef]";
          
          return (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[#282c34] rounded-lg p-5 border border-[#3e4451] hover:border-[#e5c07b] transition-colors group"
              data-testid={`achievement-${achievement.id}`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 bg-[#21252b] rounded-lg ${colorClass}`}>
                  <Icon size={24} />
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
                        className="text-[#858585] hover:text-[#61afef] transition-colors p-2"
                        data-testid={`link-credential-${achievement.id}`}
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                  
                  {achievement.description && (
                    <p className="text-[#abb2bf] text-sm mt-3 leading-relaxed">
                      {achievement.description}
                    </p>
                  )}
                  
                  <div className="mt-3">
                    <span className={`inline-block px-2 py-1 text-xs rounded ${
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
  );
}
