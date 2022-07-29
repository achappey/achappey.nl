import { useCallback } from "react";
import { useLocalStorage } from "usehooks-ts";

export const useTheme = () => {
    const [darkTheme, setDarkTheme] = useLocalStorage<boolean>('darkTheme', false);
  
    const toggleTheme = useCallback(() => setDarkTheme(!darkTheme), [setDarkTheme, darkTheme])

    return {darkTheme, toggleTheme};
}