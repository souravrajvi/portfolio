import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Loader2, ArrowLeft, Calendar, Tag, Clock } from "lucide-react";
import { motion } from "framer-motion";
import type { BlogPost } from "@shared/schema";

export default function BlogPostPage() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug;

  const { data: post, isLoading } = useQuery<BlogPost>({
    queryKey: ["/api/blog", slug],
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center text-[#528bff]">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-12 text-[#5c6370]">
        <p>Post not found</p>
        <Link href="/blog">
          <a className="text-[#c678dd] hover:underline mt-2 inline-block">
            Back to blog
          </a>
        </Link>
      </div>
    );
  }

  const readingTime = Math.ceil(post.content.split(' ').length / 200);

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-3xl"
    >
      <Link href="/blog">
        <a className="inline-flex items-center gap-2 text-[#858585] hover:text-[#c678dd] transition-colors mb-6">
          <ArrowLeft size={16} />
          <span>Back to blog</span>
        </a>
      </Link>

      <header className="mb-8">
        <h1 className="text-3xl font-bold text-[#d4d4d4] mb-4">
          {post.title}
        </h1>
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-[#5c6370]">
          {post.publishedAt && (
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {post.publishedAt}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Clock size={14} />
            {readingTime} min read
          </span>
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map((tag, i) => (
              <span
                key={i}
                className="px-2 py-1 text-xs bg-[#3e4451] text-[#abb2bf] rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className="prose prose-invert max-w-none">
        <div className="bg-[#282c34] rounded-lg p-6 border border-[#3e4451]">
          <div className="text-[#abb2bf] leading-relaxed whitespace-pre-wrap">
            {post.content}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
