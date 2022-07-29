import { makeStyles, Link, Button } from "@fluentui/react-components"
import { OpenRegular } from "@fluentui/react-icons"
import { useTranslation } from "react-i18next";
import { ItemCard } from "../components/ItemCard";
import { socials } from '../config/profile';
import { useNavigate } from "react-router";
import { SocialLogo } from "../components/SocialLogo";

const useStyles = makeStyles({
    socialLogo: {
        paddingTop: "8px",
        paddingRight: "8px"
    },
    container: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap"
    }
})

export const Socials: React.FunctionComponent = () => {
    const { t } = useTranslation()
    const classes = useStyles()
    const navigate = useNavigate()

    const profiles = socials?.map(a =>
        <div key={a.name}
            className={classes.socialLogo}>
            <Link href={a.url} target="_blank">
                <SocialLogo {...a} width={32} />
            </Link>
        </div>)

    const buttons = [
        <Button appearance="subtle" key="profiles"
            onClick={() => navigate("/profiles")}
            icon={<OpenRegular />}>
            {t("Show more")}
        </Button>
    ]

    return <ItemCard title={t("Networks")} buttons={buttons}>
        <div>
            <div className={classes.container}>
                {profiles}
            </div>
        </div>
    </ItemCard>
}
