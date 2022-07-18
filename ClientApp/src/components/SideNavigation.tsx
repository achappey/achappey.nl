import { INavLinkGroup, Nav } from "@fluentui/react"
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";
import { navigation } from "../config/navigation";

export const navLinkGroups: INavLinkGroup[] = [
    {
        links: navigation,
    },
];

export const SideNavigation: React.FunctionComponent = () => {
    const { pathname } = useLocation();
    const { t } = useTranslation();

    const navigation = [
        {
            links: navLinkGroups[0].links.map(z => {
                return {
                    ...z,
                    name: t(z.name)
                }
            }),
        },
    ]

    return <Nav selectedKey={pathname}
        groups={navigation} />
}