import { ItemCard } from "../components/ItemCard"
import { Button, Image, Link } from '@fluentui/react-components'
import { OpenRegular } from "@fluentui/react-icons"
import { ISocialProfile } from "../config/types"
import { useTranslation } from "react-i18next"

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
        image={<Image src={props.logo} height={24} />}>
        <Link href={props.url} target={"_blank"}>{props.url}</Link>
    </ItemCard>
}
