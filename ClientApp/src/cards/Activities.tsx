import { TabList, Tab, SelectTabEvent, SelectTabData, makeStyles, Spinner, Button, Tooltip } from "@fluentui/react-components";
import { ListRegular, CodeRegular, MusicNote2Regular, BookOpenRegular, NextRegular, PreviousRegular } from "@fluentui/react-icons";
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
    startFrom: number
}

export const FilteredActivities: FunctionComponent<IFilteredActivities> = (props) => {
    const activities = props.activities?.filter(a => props.sources.indexOf(a.network) > -1)
        .slice(props.startFrom, props.startFrom + props.numberOfItems)
        .map((a: any) => <Activity key={a.id} {...a} />);

    return <>
        {activities}
    </>
}

const chunkSize = 10;
const allNetworks = `${Duolingo},${GitHub},${Lastfm},${LinkedIn},${Twitter},${WakaTime}`

export const Activities: FunctionComponent = () => {
    const [currentChunk, setCurrentChunk] = useState<number>(0);
    const [sources, setSources] = useState<string>(allNetworks);
    const { t } = useTranslation();
    const activities = useActivities();
    const classes = useStyles()

    const showMore = useCallback(() => setCurrentChunk(currentChunk + 1), [setCurrentChunk, currentChunk]);
    const showLess = useCallback(() => setCurrentChunk(currentChunk - 1), [setCurrentChunk, currentChunk]);

    const listProps = {
        activities: activities,
        numberOfItems: chunkSize
    }

    const setActivities = useCallback((_event: SelectTabEvent, data: SelectTabData) => {
        setCurrentChunk(0)
        setSources(data.value as string)
    }, [setSources])

    const previousButton = <Tooltip
        relationship="label"
        key="previous"
        content={t('Previous')}>
        <Button appearance="subtle"
            onClick={showLess}
            disabled={currentChunk === 0}
            icon={<PreviousRegular />} />
    </Tooltip>

    const nextButton = <Tooltip
        relationship="label"
        key="next"
        content={t('Next')}>
        <Button appearance="subtle"
            onClick={showMore}
            icon={<NextRegular />} />
    </Tooltip>

    const buttons = activities ? [
        previousButton,
        nextButton
    ] : []

    return <ItemCard title={t("Activity")} buttons={buttons}>
        <div>
            <div className={classes.container}>
                <TabList onTabSelect={setActivities}
                    selectedValue={sources}
                    vertical={false}>
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

            <FilteredActivities startFrom={currentChunk * chunkSize}
                sources={sources.split(",")}
                {...listProps}
            />

            {!activities &&
                <Spinner />
            }
        </div>
    </ItemCard>
}