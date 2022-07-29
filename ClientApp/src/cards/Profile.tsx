import { ItemCard } from "../components/ItemCard"
import { Button, Link } from '@fluentui/react-components'
import { OpenRegular } from "@fluentui/react-icons"
import { ISocialProfile } from "../config/types"
import { useTranslation } from "react-i18next"
import { SocialLogo } from "../components/SocialLogo"

export const Profile: React.FunctionComponent<ISocialProfile> = (props) => {
    const { t } = useTranslation()

    const buttons = [
        <Button appearance="subtle" key="profiles"
            onClick={() => window.open(props.url, "_blank")}
            icon={<OpenRegular />}>
            {t("Open")}
        </Button>
    ]

    return <ItemCard title={props.name} buttons={buttons}
        image={<SocialLogo {...props} height={24} />}>
        <Link href={props.url} target={"_blank"}>{props.url}</Link>
    </ItemCard>
}
