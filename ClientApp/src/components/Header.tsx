import { Breadcrumb, IBreadcrumbItem, IconButton, IIconProps, Stack, StackItem } from "@fluentui/react"
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";
import { useMediaQuery } from "usehooks-ts";
import { navigation } from "../config/navigation";
import { SelectLanguage } from "./SelectLanguage";

export interface IHeader {
    toggleMenu: () => void
}

export const Header: React.FunctionComponent<IHeader> = (props) => {
    const largeScreen = useMediaQuery('(min-width: 768px)')
    const { pathname } = useLocation();
    const { t } = useTranslation();
    
    const items = useMemo(() => {
        const result: IBreadcrumbItem[] = [{ key: "root", text: "achappey", href: pathname.length > 1 ? "/" : undefined }];

        if (pathname.length > 1) {
            const page = navigation.find(t => t.url === pathname);

            if (page !== undefined) {
                result.push({ key: pathname, text: t(page.name) });
            }
        }

        return result;
    }, [pathname, t]);

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
            <SelectLanguage />
        </StackItem>
        {!largeScreen && <StackItem style={{ paddingLeft: 8, paddingTop: 16 }}>
            <IconButton
                onClick={props.toggleMenu}
                iconProps={menuIcon} />
        </StackItem>}
    </Stack>
}
