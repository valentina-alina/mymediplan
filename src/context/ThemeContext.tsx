import { createContext, useEffect, useState, ReactNode } from 'react';

interface ThemeContextType {
    darkMode: boolean;
    toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('dark-mode') === 'true';
    });

    useEffect(() => {
        if (darkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('dark-mode', 'true');
        } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('dark-mode', 'false');
        }
    }, [darkMode]);

    const toggleDarkMode = () => setDarkMode((prev) => !prev);

    return (
        <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
        {children}
        </ThemeContext.Provider>
    );
}

export default ThemeContext;