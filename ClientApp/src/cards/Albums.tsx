import { useCallback, useEffect, useState } from "react";
import { useSessionStorage } from "usehooks-ts";
import { Image, Link, makeStyles, SelectTabData, SelectTabEvent, Tab, TabList, Tooltip } from '@fluentui/react-components';
import { useTranslation } from "react-i18next";
import { ItemCard } from "../components/ItemCard";

const useStyles = makeStyles({
    albums: {
        paddingTop: "16px",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap"
    },
    album: {
        width: "100px"
    },
    selector: {
        display: "flex",
        flexDirection: "row"
    }
})

interface IAlbum {
    album: any
}

const Album: React.FunctionComponent<IAlbum> = (props) => {
    const classes = useStyles();

    return <Tooltip relationship="label"
        content={`${props.album.artist} - ${props.album.name}`}>
        <Link href={props.album.url} target="_blank">
            <Image fit="contain"
                className={classes.album}
                src={props.album.image}
                key={props.album.id}
            />
        </Link>
    </Tooltip>
}

export const Albums: React.FunctionComponent = () => {
    const [albums, setAlbums] = useSessionStorage<any[] | undefined>('albums', undefined);
    const [filter, setFilter] = useState<string>('1month');
    const { t } = useTranslation();
    const classes = useStyles();

    useEffect(() => {
        if (albums === undefined) {
            fetch('/api/albums?period=1month')
                .then(resp => resp.json())
                .then(resp => setAlbums(resp))
        }
    }, [albums, setAlbums])

    const topArtists = albums?.slice(0, 20).map(t => <Album key={t.id} album={t} />)

    const getArtists = useCallback((_event: SelectTabEvent, data: SelectTabData) => {
        setFilter(data.value as string)

        fetch(`/api/albums?period=${data.value}`)
            .then(resp => resp.json())
            .then(resp => setAlbums(resp))
    }, [setAlbums])

    return <ItemCard title={t('Favorite music')}>
        <div>
            <div className={classes.selector}>
                <TabList onTabSelect={getArtists} selectedValue={filter}>
                    <Tab value={"1month"} >
                        {t("This month")}
                    </Tab>
                    <Tab value={"12month"} >
                        {t("This year")}
                    </Tab>
                    <Tab value={"overall"} >
                        {t("All")}
                    </Tab>
                </TabList>
            </div>
            <div className={classes.albums}>
                {topArtists}
            </div>
        </div>
    </ItemCard>
}