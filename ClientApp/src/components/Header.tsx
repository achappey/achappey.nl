import { Breadcrumb, IconButton, IIconProps, Stack, StackItem } from "@fluentui/react"
import { useMemo } from "react";
import { useLocation } from "react-router";
import { SocialLinks } from "./SocialLinks";

export interface IHeader {
    toggleMenu: () => void
}

export const Header: React.FunctionComponent<IHeader> = (props) => {
    const { pathname } = useLocation();

    const items = useMemo(() => {
        const result = [{ key: "root", text: "achappey" }];

        if (pathname.length > 1) {
            result.push({ key: pathname, text: pathname[1].toUpperCase() + pathname.substring(2) });
        }

        return result;
    }, [pathname]);

    const menuIcon: IIconProps = {
        iconName: "CollapseMenu"
    }

    return <Stack horizontal={true}>
        <StackItem style={{ paddingTop: 16 }}>
            <IconButton onClick={props.toggleMenu} iconProps={menuIcon} />
        </StackItem>
        <StackItem grow={1}>
            <Breadcrumb items={items} />
        </StackItem>
        <StackItem>
            <SocialLinks />
        </StackItem>
    </Stack>
}