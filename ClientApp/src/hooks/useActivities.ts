import { useEffect } from "react";
import { useSessionStorage } from "usehooks-ts";
import { IActivity } from "../config/types";

export const useActivities = () => {
    const [activities, setActivities] = useSessionStorage<IActivity[] | undefined>('activities', undefined);
  
    useEffect(() => {
        if(activities == null) {
            fetch('/api/activities')
            .then(resp => resp.json())
            .then(resp => setActivities(resp))
        }
    }, [activities, setActivities])

    return activities;
}