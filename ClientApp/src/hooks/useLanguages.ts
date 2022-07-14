import { useEffect } from "react";
import { useSessionStorage } from "usehooks-ts";

export const useLanguages = () => {
    const [languages, setLanguages] = useSessionStorage<any[] | undefined>('languages', undefined);
  
    useEffect(() => {
        if(languages == null) {
            fetch('/api/languages')
            .then(resp => resp.json())
            .then(resp => setLanguages(resp))
        }
    }, [languages, setLanguages])

    return { languages };
}