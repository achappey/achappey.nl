import { useEffect } from "react";
import { useSessionStorage } from "usehooks-ts";

export const useCoding = () => {
    const [coding, setCoding] = useSessionStorage<any | undefined>('coding', undefined);

    useEffect(() => {
        if (coding == null) {
            fetch('/api/coding')
                .then(resp => resp.json())
                .then(resp => setCoding(resp))
        }
    }, [coding, setCoding])

    const weeks = coding ? Object.keys(coding) : undefined 

    const languageActivity = coding && weeks ? weeks.map((a: any) => coding[a].languages.map((z: any) => { return { name: z.name, value: Math.round(z.seconds / 3600) } })).flat().reduce((a, b) => {
        const current = a.findIndex((u: any) => u.name === b.name);

        if (current < 0) {
            a.push(b);
        }
        else {
            a[current].value += b.value
        }

        return a;
    }, []) : undefined

    const editorActivity = coding && weeks ? weeks.map((a: any) => Object.assign({ name: `Week ${a}` }, ...coding[a]?.editors?.map((p: any) => { return { [p.name]: Math.round(p.seconds / 3600) } }))) : undefined
    const editors = coding && weeks ? weeks.map((a: any) => coding[a]?.editors?.map((p: any) => p.name)).flat().reduce((a, b) => {
        if (a.indexOf(b) < 0) {
            a.push(b);
        }
        return a;
    }, []) : undefined

    return { languageActivity, editorActivity, editors };
}