import { useEffect } from "react";
import { useSessionStorage } from "usehooks-ts";
import { IProfile } from "../config/types";

export const useProfiles = () => {
    const [profiles, setProfiles] = useSessionStorage<IProfile[] | undefined>('profiles', undefined);

    useEffect(() => {
        if (profiles == null) {
            fetch('/api/profiles')
                .then(resp => resp.json())
                .then(resp => setProfiles(resp))
        }
    }, [profiles, setProfiles])

    return profiles;
}