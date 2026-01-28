import { Link, useLocation } from "wouter";
import { FileJson, FileCode, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const files = [
  { name: "Bio", path: "/", icon: FileCode },
  { name: "Exp", path: "/experience", icon: FileJson },
  { name: "Proj", path: "/projects", icon: FileCode },
  { name: "Skill", path: "/skills", icon: FileJson },
  { name: "Edu", path: "/education", icon: FileText },
  { name: "Music", path: "/music", icon: FileJson },
  { name: "Books", path: "/books", icon: FileJson },
  { name: "Write", path: "/writings", icon: FileText },
];

export function MobileNav() {
  const [location] = useLocation();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#252526] border-t border-[#1e1e1e] z-50 overflow-x-auto">
      <div className="flex p-2 min-w-max">
        {files.map((file) => (
          <Link key={file.path} href={file.path} className="flex flex-col items-center justify-center px-3 py-1">
            <div 
              className={cn(
                "flex flex-col items-center justify-center text-xs transition-colors",
                location === file.path ? "text-white" : "text-[#858585]"
              )}
            >
              <file.icon size={18} className="mb-1" />
              <span>{file.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </nav>
  );
}
