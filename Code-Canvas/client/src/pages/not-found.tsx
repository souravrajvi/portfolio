import { Link } from "wouter";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#1e1e1e] text-[#d4d4d4]">
      <AlertTriangle className="h-16 w-16 text-[#e06c75] mb-4" />
      <h1 className="text-4xl font-bold text-[#e06c75] mb-2">404 Error</h1>
      <p className="text-xl mb-8 text-[#abb2bf]">Module not found: Can't resolve 'page'</p>

      <div className="bg-[#282c34] p-6 rounded-lg shadow-xl border border-[#3e4451] max-w-md w-full">
        <code className="text-[#e5c07b] block mb-2">
          throw new Error("Page not found");
        </code>
        <div className="text-[#5c6370] text-sm mb-4">
          at Router (client/src/App.tsx:14:7)
        </div>
        
        <Link href="/">
          <button className="w-full bg-[#61afef] hover:bg-[#61afef]/90 text-white font-bold py-2 px-4 rounded transition-colors">
            Return Home
          </button>
        </Link>
      </div>
    </div>
  );
}
