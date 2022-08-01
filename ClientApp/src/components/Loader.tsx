import { Spinner, Tooltip } from "@fluentui/react-components"
import { FunctionComponent } from "react"
import { useTranslation } from "react-i18next"

export const Loader: FunctionComponent = () => {
    const { t } = useTranslation();

    return <Tooltip relationship="label" content={t('Loading')}>
        <Spinner />
    </Tooltip>
}
