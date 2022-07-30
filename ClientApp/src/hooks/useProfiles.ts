import { useEffect } from "react";
import { useSessionStorage } from "usehooks-ts";

export const useProfiles = () => {
    const [profiles, setProfiles] = useSessionStorage<any[] | undefined>('profiles', undefined);

    useEffect(() => {
        if (profiles == null) {
            fetch('/api/profiles')
                .then(resp => resp.json())
                .then(resp => setProfiles(resp))
        }
    }, [profiles, setProfiles])

    return profiles;
}