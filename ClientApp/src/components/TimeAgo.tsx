import { Tooltip } from "@fluentui/react-components"
import { FunctionComponent } from "react"
import { useTranslation } from "react-i18next"
import ReactTimeAgo from "react-time-ago"

interface ITimeAgo {
    date: Date
}

export const TimeAgo: FunctionComponent<ITimeAgo> = (props) => {
    const { i18n } = useTranslation();

    return <ReactTimeAgo wrapperComponent={TooltipWrapper}
        tooltip={false}
        locale={i18n.language}
        {...props} />
}

export const TooltipWrapper: FunctionComponent = (props: any) => {
    return <Tooltip relationship="label" content={props.verboseDate}>
        <div>{props.children}</div>
    </Tooltip>
}
