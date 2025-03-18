
import { createContext, useState, useEffect, useContext } from "react";

// Create Theme Context
export const ThemeContext = createContext();

// Custom Hook to Use Theme
export const useTheme = () => useContext(ThemeContext);

// Theme Provider Component
export function ThemeProvider({ children }) {
    // Get theme from localStorage or default to "light"
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    // Effect: Apply Theme on Mount/Update
    useEffect(() => {
        document.documentElement.className = theme;
        localStorage.setItem("theme", theme);
    }, [theme]);

    // Toggle Theme Function
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children} 
        </ThemeContext.Provider>
    );
}
