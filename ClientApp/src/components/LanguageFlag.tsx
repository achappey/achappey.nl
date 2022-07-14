import { DirectionalHint, TooltipHost } from "@fluentui/react";
import Flag from "react-world-flags";
import { useId } from '@fluentui/react-hooks';

export interface ILanguageFlag {
    code: string
    name: string
}

const fallBacks: any = {
    da: "dk",
    nb: "no",
    zs: "cn",
    el: "gr",
    sw: "tz"
}

export const LanguageFlag: React.FunctionComponent<ILanguageFlag> = (props) => {
    const tooltipId = useId(props.code);

    return <TooltipHost
        content={props.name}
        id={tooltipId}
        directionalHint={DirectionalHint.leftTopEdge}>
        <Flag code={props.code}
            fallback={<Flag code={fallBacks[props.code]} />} />
    </TooltipHost>
}