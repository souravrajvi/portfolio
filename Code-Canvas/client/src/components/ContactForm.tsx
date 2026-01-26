import { useState } from 'react';
import { Send, Loader2, Check, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactForm({ isOpen, onClose }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => {
          setStatus('idle');
          onClose();
        }, 2000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-[#252526] border border-[#3e4451] rounded-lg shadow-2xl w-full max-w-md"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#3e4451]">
            <h2 className="text-lg font-semibold text-[#d4d4d4]">Contact Me</h2>
            <button
              onClick={onClose}
              className="text-[#858585] hover:text-white transition-colors"
              data-testid="button-close-contact"
            >
              &times;
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <div>
              <label className="block text-sm text-[#858585] mb-1">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full bg-[#3c3c3c] border border-[#3e4451] rounded px-3 py-2 text-[#d4d4d4] focus:border-[#007acc] focus:outline-none"
                data-testid="input-contact-name"
              />
            </div>

            <div>
              <label className="block text-sm text-[#858585] mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full bg-[#3c3c3c] border border-[#3e4451] rounded px-3 py-2 text-[#d4d4d4] focus:border-[#007acc] focus:outline-none"
                data-testid="input-contact-email"
              />
            </div>

            <div>
              <label className="block text-sm text-[#858585] mb-1">Subject</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                required
                className="w-full bg-[#3c3c3c] border border-[#3e4451] rounded px-3 py-2 text-[#d4d4d4] focus:border-[#007acc] focus:outline-none"
                data-testid="input-contact-subject"
              />
            </div>

            <div>
              <label className="block text-sm text-[#858585] mb-1">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={4}
                className="w-full bg-[#3c3c3c] border border-[#3e4451] rounded px-3 py-2 text-[#d4d4d4] focus:border-[#007acc] focus:outline-none resize-none"
                data-testid="input-contact-message"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full bg-[#007acc] hover:bg-[#0066b8] text-white py-2 px-4 rounded flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
              data-testid="button-submit-contact"
            >
              {status === 'idle' && (
                <>
                  <Send size={16} />
                  Send Message
                </>
              )}
              {status === 'sending' && (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Sending...
                </>
              )}
              {status === 'success' && (
                <>
                  <Check size={16} />
                  Message Sent!
                </>
              )}
              {status === 'error' && (
                <>
                  <AlertCircle size={16} />
                  Failed to send
                </>
              )}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
