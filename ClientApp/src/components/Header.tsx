import { Breadcrumb, IBreadcrumbItem, IconButton, IIconProps, Stack, StackItem } from "@fluentui/react"
import { useMemo } from "react";
import { useLocation } from "react-router";
import { useMediaQuery } from "usehooks-ts";
import { navigation } from "../config/navigation";

export interface IHeader {
    toggleMenu: () => void
}

export const Header: React.FunctionComponent<IHeader> = (props) => {
    const largeScreen = useMediaQuery('(min-width: 768px)')
    const { pathname } = useLocation();

    const items = useMemo(() => {
        const result: IBreadcrumbItem[] = [{ key: "root", text: "achappey", href: pathname.length > 1 ? "/" : undefined }];

        if (pathname.length > 1) {
            const page = navigation.find(t => t.url === pathname);

            if (page !== undefined) {
                result.push({ key: pathname, text: page.name });
            }
        }

        return result;
    }, [pathname]);

    const menuIcon: IIconProps = {
        iconName: "CollapseMenu"
    }

    return <Stack horizontal={true}>
        {largeScreen && <StackItem style={{ paddingTop: 16 }}>
            <IconButton
                onClick={props.toggleMenu}
                iconProps={menuIcon}
            />
        </StackItem>}
        <StackItem grow={1}>
            <Breadcrumb items={items} />
        </StackItem>
        <StackItem style={{ paddingTop: 16 }}>
        </StackItem>
        {!largeScreen && <StackItem style={{ paddingLeft: 8, paddingTop: 16 }}>
            <IconButton
                onClick={props.toggleMenu}
                iconProps={menuIcon}
            />
        </StackItem>}
    </Stack>
}
