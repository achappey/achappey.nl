import { Spinner } from "@fluentui/react-components";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { useActivities } from "../hooks/useActivities";
import { ItemCard } from "../components/ItemCard";
import { Activity } from "../components/Activity";
import { Duolingo } from "../config/types";

export const LanguageActivities: FunctionComponent = () => {
    const { t } = useTranslation();
    const activities = useActivities();

    const activity = activities?.filter(a => a.network === Duolingo)
        .map((a: any) => <Activity key={a.id} {...a} />);

    return <ItemCard title={t("Activity")}>
        <div>
            {activity}

            {!activities &&
                <Spinner />
            }
        </div>
    </ItemCard>
}