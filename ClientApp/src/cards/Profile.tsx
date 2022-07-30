import { ItemCard } from "../components/ItemCard"
import { Button, Link } from '@fluentui/react-components'
import { OpenRegular } from "@fluentui/react-icons"
import { IProfile } from "../config/types"
import { useTranslation } from "react-i18next"
import { SocialLogo } from "../components/SocialLogo"
import { useCallback } from "react"
import { TimeAgo } from "../components/TimeAgo"

export const Profile: React.FunctionComponent<IProfile> = (props) => {
    const { t } = useTranslation()

    const openUrl = useCallback(() => window.open(props.url, "_blank"), [props.url]);

    const buttons = [
        <Button appearance="subtle"
            key="profiles"
            onClick={openUrl}
            icon={<OpenRegular />}>
            {t("Open")}
        </Button>
    ]

    const description = props.createdAt ?
        <TimeAgo date={new Date(props.createdAt)} />
        : <>{t('Unknown')}</>

    const logo = <Link href={props.url} target="_blank">
        <SocialLogo network={props.network}
            height={32}
        />
    </Link>

    const content = <div> {props.descriptions ? props.descriptions.join(", ") : t('Unknown') }</div>

    return <ItemCard title={props.network}
        buttons={buttons}
        description={description}
        image={logo}>
        {content}
    </ItemCard>
}
