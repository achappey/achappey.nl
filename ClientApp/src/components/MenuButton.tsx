import { DirectionalHint, IconButton, IIconProps, TooltipDelay, TooltipHost } from "@fluentui/react"
import { useId } from '@fluentui/react-hooks';

export interface IMenuButton {
    toggle: () => void
}

export const MenuButton: React.FunctionComponent<IMenuButton> = (props) => {
    const menuButtonId = useId("menu_button");

    const menuIcon: IIconProps = {
        iconName: "CollapseMenu"
    }

    return <TooltipHost
        content={"Toggle menu"}
        id={menuButtonId}
        delay={TooltipDelay.long}
        directionalHint={DirectionalHint.leftTopEdge}>
        <IconButton onClick={props.toggle} iconProps={menuIcon} />
    </TooltipHost>
}
