import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { useSessionStorage } from "usehooks-ts";
import { Button, Image, Link, makeStyles, SelectTabData, SelectTabEvent, Tab, TabList, Tooltip } from '@fluentui/react-components';
import { useTranslation } from "react-i18next";
import { ItemCard } from "../components/ItemCard";
import { SocialLogo } from "../components/SocialLogo";
import { Lastfm } from "../config/types";
import { Loader } from "../components/Loader";

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

interface IAlbums {
    profile?: any
}

export const Albums: FunctionComponent<IAlbums> = (props) => {
    const [albums, setAlbums] = useSessionStorage<any[] | undefined | null>('albums', undefined);
    const [filter, setFilter] = useState<string>('7day');
    const { t } = useTranslation();
    const classes = useStyles();

    useEffect(() => {
        if (albums === undefined) {
            fetch('/api/albums?period=7day')
                .then(resp => resp.json())
                .then(resp => setAlbums(resp))
        }
    }, [albums, setAlbums])

    const topArtists = albums?.slice(0, 20).map(t => <Album key={t.id} album={t} />)

    const getArtists = useCallback((_event: SelectTabEvent, data: SelectTabData) => {
        setAlbums(null)
        setFilter(data.value as string)

        fetch(`/api/albums?period=${data.value}`)
            .then(resp => resp.json())
            .then(resp => setAlbums(resp))

    }, [setAlbums])

    const buttons = props.profile ? [<Button appearance="subtle" key="languages"
        onClick={() => window.open(props.profile.url, "_blank")}
        icon={<SocialLogo width={24} network={Lastfm} />}>
        {Lastfm}
    </Button>] : []

    return <ItemCard title={t('Favorite music')}
        buttons={buttons}>
        <div>
            <div className={classes.selector}>
                <TabList onTabSelect={getArtists} selectedValue={filter}>
                    <Tab value={"7day"} >
                        {t("This week")}
                    </Tab>
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

            {topArtists &&
                <div className={classes.albums}>
                    {topArtists}
                </div>
            }

            {!topArtists &&
                <Loader />
            }

        </div>
    </ItemCard>
}