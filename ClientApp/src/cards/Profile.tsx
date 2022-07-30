import { ItemCard } from "../components/ItemCard"
import { Button, Link } from '@fluentui/react-components'
import { OpenRegular } from "@fluentui/react-icons"
import { IProfile } from "../config/types"
import { useTranslation } from "react-i18next"
import { SocialLogo } from "../components/SocialLogo"
import ReactTimeAgo from "react-time-ago"

export const Profile: React.FunctionComponent<IProfile> = (props) => {
    const { t } = useTranslation()

    const buttons = [
        <Button appearance="subtle" key="profiles"
            onClick={() => window.open(props.url, "_blank")}
            icon={<OpenRegular />}>
            {t("Open")}
        </Button>
    ]

    const description = props.createdAt ? <>{t('Since')} <ReactTimeAgo date={new Date(props.createdAt)} /> </>: undefined

    return <ItemCard title={props.username}
        buttons={buttons}
        description={description}
        image={<SocialLogo {...props} height={24} />}>
        <Link href={props.url} target={"_blank"}>{props.url}</Link>
    </ItemCard>
}
