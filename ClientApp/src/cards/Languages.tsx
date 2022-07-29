import { Button, makeStyles, Spinner } from "@fluentui/react-components"
import { OpenRegular } from "@fluentui/react-icons"
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useLanguages } from "../hooks/useLanguages";
import { ItemCard } from "../components/ItemCard";
import { LanguageFlag } from "../components/LanguageFlag";

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

export const Languages: React.FunctionComponent = () => {
    const languages = useLanguages()
    const { t } = useTranslation()
    const classes = useStyles()
    const navigate = useNavigate()

    const flags = languages?.map(a => <div key={a.code} className={classes.flags}>
        <LanguageFlag {...a} />
    </div>);

    const buttons = languages ? [
        <Button appearance="subtle" key="languages"
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
                <Spinner />
            }

        </div>
    </ItemCard>
}
