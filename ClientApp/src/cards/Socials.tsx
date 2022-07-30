import { makeStyles, Link, Button, Spinner, Tooltip } from "@fluentui/react-components"
import { OpenRegular } from "@fluentui/react-icons"
import { useTranslation } from "react-i18next";
import { ItemCard } from "../components/ItemCard";
import { useNavigate } from "react-router";
import { SocialLogo } from "../components/SocialLogo";
import { FunctionComponent } from "react";
import { IProfile } from "../config/types";

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

interface ISocials {
    profiles?: IProfile[]
}

export const Socials: FunctionComponent<ISocials> = (props) => {
    const { t } = useTranslation()
    const classes = useStyles()
    const navigate = useNavigate()

    const profileItems = props.profiles?.map(a =>
        <div key={a.network}
            className={classes.socialLogo}>
            <Tooltip content={a.network}
                relationship="label">
                <Link href={a.url} target="_blank">
                    <SocialLogo width={32}
                        network={a.network}
                    />
                </Link>
            </Tooltip>
        </div>)

    const buttons = [
        <Button appearance="subtle"
            key="profiles"
            onClick={() => navigate("/profiles")}
            icon={<OpenRegular />}>
            {t("Show more")}
        </Button>
    ]

    return <ItemCard title={t("Networks")}
        buttons={buttons}>
        <div>
            {profileItems &&
                <div className={classes.container}>
                    {profileItems}
                </div>
            }

            {!profileItems &&
                <Spinner />
            }
        </div>
    </ItemCard>
}
