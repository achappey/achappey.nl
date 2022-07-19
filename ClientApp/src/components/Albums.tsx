import { useCallback, useEffect } from "react";
import { useSessionStorage } from "usehooks-ts";
import { Image, ImageFit, Label, Link, mergeStyleSets, Pivot, PivotItem, Shimmer, TooltipHost } from '@fluentui/react';
import { useTranslation } from "react-i18next";
import { useId } from '@fluentui/react-hooks';

const styles = mergeStyleSets({
    albums: {
        paddingTop: 16,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap"
    },
    album: {
        width: 100
    }
})

interface IAlbum {
    album: any
}

const Album: React.FunctionComponent<IAlbum> = (props) => {
    const tooltipId = useId(props.album.id);

    return <TooltipHost
        content={`${props.album.artist} - ${props.album.name}`}
        id={tooltipId} >
        <Link href={props.album.url} target="_blank">
            <Image imageFit={ImageFit.contain} className={styles.album} src={props.album.image} key={props.album.id} />
        </Link>
    </TooltipHost>
}
export const Albums: React.FunctionComponent = () => {
    const [albums, setAlbums] = useSessionStorage<any[] | undefined>('albums', undefined);
    const { t } = useTranslation();

    useEffect(() => {
        if (albums === undefined) {
            fetch('/api/albums')
                .then(resp => resp.json())
                .then(resp => setAlbums(resp))
        }
    }, [albums, setAlbums])

    const topArtists = albums?.map(t => <Album album={t} />)

    const getArtists = useCallback((item?: PivotItem) => {
        fetch(`/api/albums?period=${item?.props.id}`)
            .then(resp => resp.json())
            .then(resp => setAlbums(resp))
    }, [setAlbums])

    return <>
        <Label>
            {t('Favorite music')}
        </Label>
        <Pivot onLinkClick={getArtists} headersOnly>
            <PivotItem headerText={t("All")} id={"overall"} >
            </PivotItem>
            <PivotItem headerText={t("This year")} id={"12month"}>
            </PivotItem>
            <PivotItem headerText={t("This month")} id={"1month"}>
            </PivotItem>
        </Pivot>
        <div className={styles.albums}>
            {topArtists ? topArtists : <Shimmer width={250} />}
        </div>

    </>
}