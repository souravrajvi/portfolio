import { useExperiences } from "@/hooks/use-portfolio";
import { EditableCodeBlock } from "@/components/EditableCodeBlock";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Experiences() {
  const { data: experiences, isLoading } = useExperiences();

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center text-[#528bff]">
        <Loader2 className="animate-spin w-8 h-8" />
      </div>
    );
  }

  // Format the data as a JSON array string
  const formattedExperiences = experiences?.map(exp => ({
    company: exp.company,
    role: exp.role,
    period: exp.duration,
    description: exp.description
  }));

  const codeString = JSON.stringify(formattedExperiences, null, 2);

  return (
    <div className="h-full font-mono text-sm">
      <EditableCodeBlock initialCode={codeString || "[]"} language="json" />
    </div>
  );
}
