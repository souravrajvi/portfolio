import { useSkills } from "@/hooks/use-portfolio";
import { EditableCodeBlock } from "@/components/EditableCodeBlock";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Skills() {
  const { data: skills, isLoading } = useSkills();

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center text-[#528bff]">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );
  }

  // Group skills by category for display
  const skillsMap = skills?.reduce((acc, skill) => {
    acc[skill.category] = skill.items;
    return acc;
  }, {} as Record<string, string[]>);

  const codeString = JSON.stringify(skillsMap || {}, null, 2);

  return (
    <div className="h-full font-mono text-sm">
      <EditableCodeBlock initialCode={codeString || "{}"} language="json" />
    </div>
  );
}
