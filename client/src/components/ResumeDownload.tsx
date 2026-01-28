import { Download, FileText } from 'lucide-react';

export function ResumeDownload() {
  const handleDownload = () => {
    const resumeContent = `
SOURAV RAJVI
Node.js Developer

CONTACT
Email: sourav@example.com
GitHub: github.com/souravrajvi
LinkedIn: linkedin.com/in/souravrajvi

SKILLS
- JavaScript/TypeScript
- Node.js, Express, Fastify
- React, Next.js, Vue.js
- PostgreSQL, MongoDB, Redis
- Docker, Kubernetes, AWS

EXPERIENCE
Senior Node.js Developer | Tech Corp (2022-Present)
- Led development of microservices architecture
- Improved API performance by 40%
- Mentored junior developers

Full Stack Developer | StartupXYZ (2020-2022)
- Built real-time collaboration features
- Implemented CI/CD pipelines
- Developed mobile-responsive dashboards

EDUCATION
Bachelor of Science in Computer Science
University of Technology (2020)

CERTIFICATIONS
- AWS Certified Developer
- MongoDB Certified Developer
    `.trim();

    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Sourav_Rajvi_Resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleDownload}
      className="flex items-center gap-2 px-4 py-2 bg-[#007acc] hover:bg-[#0066b8] text-white rounded transition-colors text-sm"
      data-testid="button-download-resume"
    >
      <Download size={16} />
      <span>Download Resume</span>
    </button>
  );
}

export function ResumeCard() {
  return (
    <div className="bg-[#282c34] rounded-lg p-4 border border-[#3e4451] hover:border-[#007acc] transition-colors">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-[#3e4451] rounded">
          <FileText size={24} className="text-[#61afef]" />
        </div>
        <div>
          <h3 className="font-semibold text-[#d4d4d4]">Resume</h3>
          <p className="text-xs text-[#858585]">PDF / TXT Format</p>
        </div>
      </div>
      <ResumeDownload />
    </div>
  );
}
