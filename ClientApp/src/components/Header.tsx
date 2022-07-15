import { Breadcrumb, IBreadcrumbItem, Stack, StackItem } from "@fluentui/react"
import { useMemo } from "react";
import { useLocation } from "react-router";
import { useMediaQuery } from "usehooks-ts";
import { MenuButton } from "./MenuButton";
import { SocialLinks } from "./SocialLinks";

export interface IHeader {
    toggleMenu: () => void
}

export const Header: React.FunctionComponent<IHeader> = (props) => {
    const largeScreen = useMediaQuery('(min-width: 768px)')
    const { pathname } = useLocation();

    const items = useMemo(() => {
        const result: IBreadcrumbItem[] = [{ key: "root", text: "achappey", href: pathname.length > 1 ? "/" : undefined }];

        if (pathname.length > 1) {
            result.push({ key: pathname, text: pathname[1].toUpperCase() + pathname.substring(2) });
        }

        return result;
    }, [pathname]);

    return <Stack horizontal={true}>
        {largeScreen && <StackItem style={{ paddingTop: 16 }}>
            <MenuButton toggle={props.toggleMenu} />
        </StackItem>}
        <StackItem grow={1}>
            <Breadcrumb items={items} />
        </StackItem>
        <StackItem style={{ paddingTop: 16 }}>
            <SocialLinks />
        </StackItem>
        {!largeScreen && <StackItem style={{ paddingLeft: 8, paddingTop: 16 }}>
            <MenuButton toggle={props.toggleMenu} />
        </StackItem>}
    </Stack>
}
