import { useCallback } from "react";
import { useLocation } from "wouter";
import { CommandDialog, CommandInput, CommandList, CommandItem, CommandEmpty, CommandGroup } from "@/components/ui/command";
import { FileCode, FileJson, FileText, X } from "lucide-react";

const files = [
  { name: "bio.ts", path: "/", icon: FileCode, description: "Personal introduction" },
  { name: "experience.json", path: "/experience", icon: FileJson, description: "Work history" },
  { name: "projects.ts", path: "/projects", icon: FileCode, description: "Portfolio projects" },
  { name: "skills.json", path: "/skills", icon: FileJson, description: "Technical skills" },
  { name: "education.md", path: "/education", icon: FileText, description: "Education" },
  { name: "music.json", path: "/music", icon: FileJson, description: "Music recommendations" },
  { name: "books.json", path: "/books", icon: FileJson, description: "Book recommendations" },
  { name: "writings.md", path: "/writings", icon: FileText, description: "Papers and articles" },
  { name: "achievements.json", path: "/achievements", icon: FileJson, description: "Certifications & awards" },
  { name: "blog.md", path: "/blog", icon: FileText, description: "Blog posts" },
];

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const [, setLocation] = useLocation();

  const handleSelect = useCallback((path: string) => {
    setLocation(path);
    onOpenChange(false);
  }, [setLocation, onOpenChange]);

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <div className="flex items-center border-b border-[#3e4451]">
        <CommandInput 
          placeholder="Search files..." 
          className="flex-1 text-[#d4d4d4] placeholder:text-[#5c6370] border-0"
          data-testid="input-command-search"
        />
        <button
          onClick={() => onOpenChange(false)}
          className="p-2 mr-2 text-[#5c6370] hover:text-[#d4d4d4] hover:bg-[#3e4451] rounded transition-colors"
          data-testid="button-close-command-palette"
          aria-label="Close"
        >
          <X size={16} />
        </button>
      </div>
      <CommandList className="max-h-80">
        <CommandEmpty className="py-6 text-center text-sm text-[#5c6370]">
          No files found.
        </CommandEmpty>
        <CommandGroup heading="Files">
          {files.map((file) => (
            <CommandItem
              key={file.path}
              value={file.name}
              onSelect={() => handleSelect(file.path)}
              className="flex items-center gap-3 cursor-pointer"
              data-testid={`command-item-${file.name}`}
            >
              <file.icon className="h-4 w-4 text-[#519aba]" />
              <div className="flex-1">
                <span className="font-medium">{file.name}</span>
                <span className="ml-3 text-xs text-[#5c6370]">{file.description}</span>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
