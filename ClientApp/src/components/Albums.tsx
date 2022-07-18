import { useEffect } from "react";
import { useSessionStorage } from "usehooks-ts";
import { Image, ImageFit, Pivot, PivotItem } from '@fluentui/react';
import { useTranslation } from "react-i18next";

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

    const topArtists = albums?.map(t => <div> <Image imageFit={ImageFit.contain} style={{ width: 100 }} src={t.image} key={t.id} /></div>)

    return <>
        <div style={{
            textAlign: "end",
            paddingRight: 16

        }}>
            <h4>
                {t('Favorite music')}
            </h4>
            <Pivot>
                <PivotItem headerText={t("All")}>
                    <div style={{
                        paddingTop: 16,
                        display: "flex",
                        justifyContent: "flex-end",
                        flexDirection: "row",
                        flexWrap: "wrap"
                    }}>
                        {topArtists}
                    </div>
                </PivotItem>
                <PivotItem headerText={t("This year")}>
                </PivotItem>
                <PivotItem headerText={t("This month")}>
                </PivotItem>
            </Pivot>
        </div>
    </>
}
