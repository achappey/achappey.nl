import { INavLinkGroup, Nav } from "@fluentui/react"
import { useLocation } from "react-router";

const navLinkGroups: INavLinkGroup[] = [
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
                name: 'Languages',
                url: '/languages',
                key: '/languages',
                icon: 'Comment'
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
];

export const SideNavigation: React.FunctionComponent = () => {
    const { pathname } = useLocation();

    return <Nav selectedKey={pathname}
        groups={navLinkGroups} />
}