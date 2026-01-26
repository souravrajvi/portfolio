import { useWritings } from "@/hooks/use-portfolio";
import { Loader2, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export default function Writings() {
  const { data: writings, isLoading } = useWritings();

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center text-[#528bff]">
        <Loader2 className="animate-spin w-8 h-8" data-testid="loader-writings" />
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
            <h2 className="text-2xl font-bold text-[#98c379] mb-8">
        Writings
      </h2>

      <div className="space-y-6">
        {writings?.map((writing, idx) => (
          <motion.div
            key={writing.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-[#282c34] rounded-lg p-5 border border-[#3e4451] hover:border-[#98c379] transition-colors"
            data-testid={`writing-${writing.id}`}
          >
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[#61afef] mb-2">
                  {writing.title}
                </h3>
                <p className="text-[#abb2bf] text-sm leading-relaxed">
                  {writing.description}
                </p>
                {writing.publishedAt && (
                  <span className="inline-block mt-3 text-xs text-[#5c6370] bg-[#21252b] px-2 py-1 rounded">
                    Published: {writing.publishedAt}
                  </span>
                )}
              </div>
              {writing.link && (
                <a
                  href={writing.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#abb2bf] hover:text-[#98c379] transition-colors p-2"
                  data-testid={`link-writing-${writing.id}`}
                >
                  <ExternalLink size={18} />
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {(!writings || writings.length === 0) && (
        <div className="text-[#5c6370] text-center py-12">
          <p>No publications yet</p>
        </div>
      )}
    </motion.div>
  );
}
