import { useTheme } from './ThemeProvider';
import { Palette, Check } from 'lucide-react';
import { useState } from 'react';

export function ThemeSwitcher() {
  const { theme, setTheme, themes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-[var(--theme-border)] rounded transition-colors"
        title="Change Theme"
        data-testid="button-theme-switcher"
      >
        <Palette size={16} className="text-[var(--theme-text)]" />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-1 bg-[var(--theme-sidebar)] border border-[var(--theme-border)] rounded shadow-xl z-50 min-w-[180px] py-1">
            <div className="px-3 py-2 text-xs text-[#858585] uppercase tracking-wider border-b border-[var(--theme-border)]">
              Color Theme
            </div>
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setTheme(t.id);
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[var(--theme-text)] hover:bg-[var(--theme-border)] transition-colors"
                data-testid={`theme-${t.id}`}
              >
                <div 
                  className="w-4 h-4 rounded-sm border border-[var(--theme-border)]"
                  style={{ backgroundColor: t.colors.accent }}
                />
                <span className="flex-1 text-left">{t.name}</span>
                {theme === t.id && <Check size={14} className="text-[var(--theme-accent)]" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
