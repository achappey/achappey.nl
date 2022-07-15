import { useEffect } from "react";
import { useSessionStorage } from "usehooks-ts";

export const useLanguages = () => {
    const [languages, setLanguages] = useSessionStorage<any[] | undefined>('languages', undefined);
    const [activeLanguage, setActiveLanguage] = useSessionStorage<any | undefined>('activeLanguage', undefined);
  
    useEffect(() => {
        if(languages == null) {
            fetch('/api/languages')
            .then(resp => resp.json())
            .then(resp => setLanguages(resp))
        }
    }, [languages, setLanguages])

    useEffect(() => {
        if(activeLanguage == null) {
            fetch('/api/activeLanguage')
            .then(resp => resp.json())
            .then(resp => setActiveLanguage(resp))
        }
    }, [activeLanguage, setActiveLanguage])

    return { languages, activeLanguage };
}