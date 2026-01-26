import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Loader2, BookOpen, Calendar, Tag, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import type { BlogPost } from "@shared/schema";

export default function Blog() {
  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center text-[#528bff]">
        <Loader2 className="animate-spin w-8 h-8" data-testid="loader-blog" />
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
      <h2 className="text-2xl font-bold text-[#c678dd] mb-8 flex items-center gap-3">
        <BookOpen className="text-[#c678dd]" />
        Blog
      </h2>

      <div className="space-y-6">
        {posts?.map((post, idx) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-[#282c34] rounded-lg p-6 border border-[#3e4451] hover:border-[#c678dd] transition-all group"
            data-testid={`blog-post-${post.id}`}
          >
            <Link href={`/blog/${post.slug}`}>
              <div className="cursor-pointer">
                <h3 className="text-xl font-semibold text-[#d4d4d4] group-hover:text-[#c678dd] transition-colors mb-2">
                  {post.title}
                </h3>
                
                <div className="flex items-center gap-4 text-xs text-[#5c6370] mb-4">
                  {post.publishedAt && (
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {post.publishedAt}
                    </span>
                  )}
                  {post.tags && post.tags.length > 0 && (
                    <span className="flex items-center gap-1">
                      <Tag size={12} />
                      {post.tags.slice(0, 3).join(", ")}
                    </span>
                  )}
                </div>
                
                {post.excerpt && (
                  <p className="text-[#abb2bf] text-sm leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                )}
                
                <div className="flex items-center gap-2 text-[#c678dd] text-sm group-hover:gap-3 transition-all">
                  <span>Read more</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>

      {(!posts || posts.length === 0) && (
        <div className="text-[#5c6370] text-center py-12">
          <BookOpen size={48} className="mx-auto mb-4 opacity-50" />
          <p>No blog posts yet</p>
          <p className="text-xs mt-2">Check back soon for new content!</p>
        </div>
      )}
    </motion.div>
  );
}
