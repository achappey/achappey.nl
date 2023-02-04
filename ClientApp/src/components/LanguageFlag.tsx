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

export const LanguageFlag: React.FunctionComponent<ILanguageFlag> = ({ code, name, description }) => {
    const flagProps = {
        height: 24
    }

    return (
        <Tooltip key={code} content={<div>{name}<br />{description}</div>} relationship="label">
            <Flag code={code}
                {...flagProps}
                fallback={<Flag code={fallBacks[code]} {...flagProps} />}
            />
        </Tooltip>
    )
}