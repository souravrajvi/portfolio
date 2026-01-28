import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'dark' | 'light' | 'monokai' | 'dracula' | 'github';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  themes: { id: Theme; name: string; colors: Record<string, string> }[];
}

const themes = [
  {
    id: 'dark' as Theme,
    name: 'Dark+ (Default)',
    colors: {
      bg: '#1e1e1e',
      sidebar: '#252526',
      accent: '#007acc',
      text: '#d4d4d4',
      border: '#3e4451',
    }
  },
  {
    id: 'light' as Theme,
    name: 'Light+',
    colors: {
      bg: '#ffffff',
      sidebar: '#f3f3f3',
      accent: '#0066b8',
      text: '#333333',
      border: '#e0e0e0',
    }
  },
  {
    id: 'monokai' as Theme,
    name: 'Monokai',
    colors: {
      bg: '#272822',
      sidebar: '#1e1f1c',
      accent: '#f92672',
      text: '#f8f8f2',
      border: '#3e3d32',
    }
  },
  {
    id: 'dracula' as Theme,
    name: 'Dracula',
    colors: {
      bg: '#282a36',
      sidebar: '#21222c',
      accent: '#bd93f9',
      text: '#f8f8f2',
      border: '#44475a',
    }
  },
  {
    id: 'github' as Theme,
    name: 'GitHub Dark',
    colors: {
      bg: '#0d1117',
      sidebar: '#161b22',
      accent: '#58a6ff',
      text: '#c9d1d9',
      border: '#30363d',
    }
  },
];

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('portfolio-theme') as Theme) || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    localStorage.setItem('portfolio-theme', theme);
    const selectedTheme = themes.find(t => t.id === theme);
    if (selectedTheme) {
      document.documentElement.style.setProperty('--theme-bg', selectedTheme.colors.bg);
      document.documentElement.style.setProperty('--theme-sidebar', selectedTheme.colors.sidebar);
      document.documentElement.style.setProperty('--theme-accent', selectedTheme.colors.accent);
      document.documentElement.style.setProperty('--theme-text', selectedTheme.colors.text);
      document.documentElement.style.setProperty('--theme-border', selectedTheme.colors.border);
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
