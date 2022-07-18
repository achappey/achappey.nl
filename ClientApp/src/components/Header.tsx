import { Breadcrumb, IBreadcrumbItem, IconButton, IIconProps, mergeStyleSets, Stack, StackItem } from "@fluentui/react"
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";
import { useMediaQuery } from "usehooks-ts";
import { navigation } from "../config/navigation";
import { brandName } from "../config/profile";
import { SelectLanguage } from "./SelectLanguage";

export interface IHeader {
    toggleMenu: () => void
}

const menuIcon: IIconProps = {
    iconName: "CollapseMenu"
}

const styles = mergeStyleSets({
    menuIcon: {
        paddingTop: 16
    },
    mobileMenuIcon: {
        paddingTop: 16,
        paddingLeft: 8
    },
    languageSelector: {
        paddingTop: 16
    },
})

export const Header: React.FunctionComponent<IHeader> = (props) => {
    const largeScreen = useMediaQuery('(min-width: 768px)')
    const { pathname } = useLocation();
    const { t } = useTranslation();

    const items = useMemo(() => {
        const result: IBreadcrumbItem[] = [{
            key: "root",
            text: brandName,
            href: pathname.length > 1 ? "/" : undefined
        }];

        if (pathname.length > 1) {
            const page = navigation.find(t => t.url === pathname);

            if (page !== undefined) {
                result.push({ key: pathname, text: t(page.name) });
            }
        }

        return result;
    }, [pathname, t]);


    return <Stack horizontal={true}>
        {largeScreen && <StackItem className={styles.menuIcon}>
            <IconButton
                onClick={props.toggleMenu}
                iconProps={menuIcon}
            />
        </StackItem>
        }
        <StackItem grow={1}>
            <Breadcrumb items={items} />
        </StackItem>
        <StackItem className={styles.languageSelector}>
            <SelectLanguage />
        </StackItem>
        {!largeScreen && <StackItem className={styles.mobileMenuIcon}>
            <IconButton
                onClick={props.toggleMenu}
                iconProps={menuIcon} />
        </StackItem>}
    </Stack>
}
