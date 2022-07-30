import { TabList, Tab, Link, SelectTabEvent, SelectTabData, makeStyles, Spinner } from "@fluentui/react-components";
import { ListRegular, CodeRegular, MusicNote2Regular, BookOpenRegular } from "@fluentui/react-icons";
import { useCallback, useState, FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { useActivities } from "../hooks/useActivities";
import { ItemCard } from "../components/ItemCard";
import { Activity } from "../components/Activity";
import { Duolingo, GitHub, IActivity, Lastfm, LinkedIn, Twitter, WakaTime } from '../config/types';

const useStyles = makeStyles({
    container: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        paddingBottom: "16px"
    }
})


export interface IFilteredActivities {
    activities: IActivity[] | undefined
    sources: string[]
    numberOfItems: number
}

export const FilteredActivities: FunctionComponent<IFilteredActivities> = (props) => {
    const activities = props.activities?.filter(a => props.sources.indexOf(a.network) > -1)
        .slice(0, props.numberOfItems)
        .map((a: any) => <Activity key={a.id} {...a} />);

    return <>
        {activities}
    </>
}

const chunkSize = 10;
const allNetworks = `${Duolingo},${GitHub},${Lastfm},${LinkedIn},${Twitter},${WakaTime}`

export const Activities: FunctionComponent = () => {
    const [visibleChunks, setVisibleChunks] = useState<number>(1);
    const [sources, setSources] = useState<string>(allNetworks);
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
                        value={allNetworks}>
                        {t("All")}
                    </Tab>
                    <Tab icon={<CodeRegular />}
                        value={`${WakaTime},${GitHub}`}>
                        {t("Coding")}
                    </Tab>
                    <Tab icon={<MusicNote2Regular />}
                        value={`${Lastfm}`}>
                        {t("Listening")}
                    </Tab>
                    <Tab icon={<BookOpenRegular />}
                        value={`${Duolingo}`}>
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

            {!activities &&
               <Spinner />
            }
        </div>
    </ItemCard>
}