import { INavLinkGroup, Nav } from "@fluentui/react"
import { useMemo } from "react";
import { useLocation } from "react-router";

export const SideNavigation: React.FunctionComponent = () => {
    const { pathname } = useLocation();
    
    const navLinkGroups: INavLinkGroup[] = useMemo(() => [
        {
            links: [
                {
                    name: 'Home',
                    url: '/',
                    icon: 'Home',
                    key: '/'
                },
                {
                    name: 'Repositories',
                    url: '/repositories',
                    key: '/repositories',
                    icon: 'ProductList'
                },
                {
                    name: 'Swagger',
                    url: '/swagger',
                    key: '/swagger',
                    icon: 'Code',
                    target: '_blank',
                }
            ],
        },
    ], []);

    return <Nav
        selectedKey={pathname}
        groups={navLinkGroups}
    />
}