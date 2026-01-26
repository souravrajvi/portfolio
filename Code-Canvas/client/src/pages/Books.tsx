import { useBookRecs } from "@/hooks/use-portfolio";
import { EditableCodeBlock } from "@/components/EditableCodeBlock";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Books() {
  const { data: books, isLoading } = useBookRecs();

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center text-[#528bff]">
        <Loader2 className="animate-spin w-8 h-8" data-testid="loader-books" />
      </div>
    );
  }

  const formattedBooks = books?.map(b => ({
    title: b.title,
    author: b.author,
    genre: b.genre,
    note: b.note
  }));

  const codeString = JSON.stringify(formattedBooks, null, 2);

  return (
    <div className="h-full font-mono text-sm">
      <EditableCodeBlock initialCode={codeString || "[]"} language="json" />
    </div>
  );
}
