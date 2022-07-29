import { Tooltip } from "@fluentui/react-components";
import Flag from "react-world-flags";

interface ILanguageFlag {
    code: string
    name: string
    description: string
}

const fallBacks: any = {
    da: "dk",
    nb: "no",
    zs: "cn",
    el: "gr",
    sw: "tz"
}

export const LanguageFlag: React.FunctionComponent<ILanguageFlag> = (props) => {
    const flagProps = {
        height: 24
    }

    const tooltipContent = <div key={props.code}>
            <div>{props.name}</div>
            <div>{props.description}</div>
        </div>

    return <Tooltip content={tooltipContent}
        relationship="label">
        <div>
            <Flag code={props.code}
                {...flagProps}
                fallback={<Flag code={fallBacks[props.code]} {...flagProps} />}
            />
        </div>
    </Tooltip>
}