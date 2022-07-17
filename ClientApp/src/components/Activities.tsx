import { ActionButton, ActivityItem, Icon, Pivot, PivotItem, Shimmer } from "@fluentui/react";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import ReactTimeAgo from "react-time-ago";
import { useActivities } from "../hooks/useActivities";

const sourceToIcon = (source: string) => {
    switch (source) {
        case "GITHUB":
            return "ProductRelease";
        case "DUOLINGO":
            return "Education";
        case "WAKATIME":
            return "Code";
        case "LASTFM":
            return "MusicNote";
        default:
            return "";
    }
}

export interface IActivity {
    activity: any
}

export const Activity: React.FunctionComponent<IActivity> = (props) => {
    const activityDescription = [
        <span key={props.activity.id}> {props.activity.title} </span>
    ];

    return <div key={props.activity.id}>
        <ActivityItem activityDescription={activityDescription}
            timeStamp={<ReactTimeAgo date={props.activity.createdAt} />}
            activityIcon={<Icon iconName={sourceToIcon(props.activity.source)} />} />
    </div>
}


export interface IFilteredActivities {
    activities: any[] | undefined
    sources: string[]
    numberOfItems: number
}

export const FilteredActivities: React.FunctionComponent<IFilteredActivities> = (props) => {
    const activities = props.activities?.filter(a => props.sources.indexOf(a.source) > -1)
        .slice(0, props.numberOfItems)
        .map((a: any) => <Activity key={a.id} activity={a} />);

    return <>
        {activities ? activities : <Shimmer width={150} />}
    </>
}

const chunkSize = 10;

export const Activities: React.FunctionComponent = () => {
    const [visibleChunks, setVisibleChunks] = useState<number>(1);
    const activities = useActivities();
    const { t } = useTranslation();
    
    const showMore = useCallback(() => setVisibleChunks(visibleChunks + 1), [setVisibleChunks, visibleChunks]);
    const pivotStyle = { paddingTop: 16 }

    const listProps = {
        activities: activities,
        numberOfItems: chunkSize * visibleChunks
    }

    return <>
        <h4>{t("Activity")}</h4>

        <Pivot>
            <PivotItem headerText={t("All")}
                style={pivotStyle}>
                <FilteredActivities sources={["GITHUB", "WAKATIME", "LASTFM", "DUOLINGO"]}
                    {...listProps} />
            </PivotItem>
            <PivotItem headerText={t("Coding")}
                style={pivotStyle}>
                <FilteredActivities sources={["GITHUB", "WAKATIME"]}
                    {...listProps} />
            </PivotItem>
            <PivotItem headerText={t("Listening")}
                style={pivotStyle}>
                <FilteredActivities sources={["LASTFM"]}
                    {...listProps} />
            </PivotItem>
            <PivotItem headerText={t("Learning")}
                style={pivotStyle}>
                <FilteredActivities sources={["DUOLINGO"]}
                    {...listProps} />
            </PivotItem>
        </Pivot>

        {activities && <ActionButton onClick={showMore}>{t("Show more")}</ActionButton>}

    </>
}