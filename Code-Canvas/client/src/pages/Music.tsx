import { useMusicRecs } from "@/hooks/use-portfolio";
import { EditableCodeBlock } from "@/components/EditableCodeBlock";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Music() {
  const { data: music, isLoading } = useMusicRecs();

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center text-[#528bff]">
        <Loader2 className="animate-spin w-8 h-8" data-testid="loader-music" />
      </div>
    );
  }

  const formattedMusic = music?.map(m => ({
    title: m.title,
    artist: m.artist,
    genre: m.genre,
    note: m.note
  }));

  const codeString = JSON.stringify(formattedMusic, null, 2);

  return (
    <div className="h-full font-mono text-sm">
      <EditableCodeBlock initialCode={codeString || "[]"} language="json" />
    </div>
  );
}
