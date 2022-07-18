import { useEffect } from "react";
import { useSessionStorage } from "usehooks-ts";
import { Image, ImageFit, Label, mergeStyleSets, Pivot, PivotItem, Shimmer } from '@fluentui/react';
import { useTranslation } from "react-i18next";

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

    const topArtists = albums?.splice(0, 20).map(t => <Image imageFit={ImageFit.contain} className={styles.album} src={t.image} key={t.id} />)

    return <>
        <Label>
            {t('Favorite music')}
        </Label>
        <Pivot>
            <PivotItem headerText={t("All")}>
                <div className={styles.albums}>
                    {topArtists ? topArtists : <Shimmer width={250} />}
                </div>
            </PivotItem>
            <PivotItem headerText={t("This year")}>
            </PivotItem>
            <PivotItem headerText={t("This month")}>
            </PivotItem>
        </Pivot>
    </>
}
