import { Button, Link, makeStyles } from "@fluentui/react-components"
import { OpenRegular } from "@fluentui/react-icons"
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useLanguages } from "../hooks/useLanguages";
import { ItemCard } from "../components/ItemCard";
import { LanguageFlag } from "../components/LanguageFlag";
import { SocialLogo } from "../components/SocialLogo";
import { Duolingo, IProfile } from "../config/types";
import { FunctionComponent, useCallback } from "react";
import { Loader } from "../components/Loader";

const useStyles = makeStyles({
    flags: {
        paddingTop: "8px",
        paddingRight: "8px"
    },
    container: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap"
    },
})
interface ILanguages {
    profile?: IProfile
}

export const Languages: FunctionComponent<ILanguages> = (props) => {
    const languages = useLanguages()
    const { t } = useTranslation()
    const classes = useStyles()
    const navigate = useNavigate()
    const openUrl = useCallback(() => window.open(props.profile?.url, "_blank"), [props.profile]);

    const flags = languages?.map(a => <div key={a.code} className={classes.flags}>
        {a.url ? <Link href={a.url}
            target="_blank">
            <LanguageFlag {...a} />
        </Link> :
            <LanguageFlag {...a} />
        }
    </div>);

    const buttons = languages ? [

        <Button appearance="subtle"
            key="duolingo"
            onClick={openUrl}
            icon={<SocialLogo width={24} network={Duolingo} />}>
            {Duolingo}
        </Button>,
        <Button appearance="subtle"
            key="more"
            onClick={() => navigate("/languages")}
            icon={<OpenRegular />}>
            {t("Show more")}
        </Button>
    ] : []

    return <ItemCard title={t("Languages")} buttons={buttons}>
        <div>
            {languages &&
                <div className={classes.container}>
                    {flags}
                </div>
            }

            {!languages &&
                <Loader />
            }

        </div>
    </ItemCard>
}
