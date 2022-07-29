import { TabList, Tab, Link, SelectTabEvent, SelectTabData, makeStyles } from "@fluentui/react-components";
import { ListRegular, CodeRegular, MusicNote2Regular, BookOpenRegular } from "@fluentui/react-icons";
import { useCallback, useState, FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import ReactTimeAgo from "react-time-ago";
import { useActivities } from "../hooks/useActivities";
import { ItemCard } from "../components/ItemCard";


const useStyles = makeStyles({
    socialLogo: {
        paddingTop: "8px",
        paddingRight: "8px"
    },
    container: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        paddingBottom: "16px"
    },
    activity: {
        display: "flex",
        flexDirection: "row",
    },
    activityIcon: {
        paddingRight: "8px"
    }
})

interface ISourceIcon {
    source: string
}

const SourceIcon: FunctionComponent<ISourceIcon> = (props) => {
    switch (props.source) {
        case "GITHUB":
            return <CodeRegular fontSize={28} />
        case "DUOLINGO":
            return <BookOpenRegular fontSize={28} />
        case "WAKATIME":
            return <CodeRegular fontSize={28} />
        case "LASTFM":
            return <MusicNote2Regular fontSize={28} />
        default:
            return <></>;
    }
}

export interface IActivity {
    activity: any

}

export const Activity: React.FunctionComponent<IActivity> = (props) => {
    const classes = useStyles()

    return <div className={classes.activity}>
        <div className={classes.activityIcon}>
            <SourceIcon source={props.activity.source} />
            {props.activity.icon}
        </div>
        <div>
            <div>
                {props.activity.title}
            </div>
            <div>
                <ReactTimeAgo date={new Date(props.activity.createdAt)} />
            </div>
        </div>
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
        {activities}
    </>
}

const chunkSize = 10;

export const Activities: React.FunctionComponent = () => {
    const [visibleChunks, setVisibleChunks] = useState<number>(1);
    const [sources, setSources] = useState<string>("GITHUB,WAKATIME,LASTFM,DUOLINGO");
    const { t } = useTranslation();
    const activities = useActivities();
    const classes = useStyles()

    const showMore = useCallback(() => setVisibleChunks(visibleChunks + 1), [setVisibleChunks, visibleChunks]);

    const listProps = {
        activities: activities,
        numberOfItems: chunkSize * visibleChunks
    }

    const setActivities = useCallback((_event: SelectTabEvent, data: SelectTabData) => {
        setSources(data.value as string)
    }, [setSources])

    return <ItemCard title={t("Activity")}>
        <div>
            <div className={classes.container}>
                <TabList onTabSelect={setActivities} selectedValue={sources} vertical={false}>
                    <Tab icon={<ListRegular />}
                        value={"GITHUB,WAKATIME,LASTFM,DUOLINGO"}>
                        {t("All")}
                    </Tab>
                    <Tab icon={<CodeRegular />}
                        value={"GITHUB,WAKATIME"}>
                        {t("Coding")}
                    </Tab>
                    <Tab icon={<MusicNote2Regular />}
                        value={"LASTFM"}>
                        {t("Listening")}
                    </Tab>
                    <Tab icon={<BookOpenRegular />}
                        value={"DUOLINGO"}>
                        {t("Learning")}
                    </Tab>
                </TabList>
            </div>

            <FilteredActivities sources={sources.split(",")}
                {...listProps} />

            {activities &&
                <Link onClick={showMore}>
                    {t("Show more")}
                </Link>
            }
        </div>
    </ItemCard>
}