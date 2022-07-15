import { INavLinkGroup, Nav, Stack, StackItem } from "@fluentui/react"
import { useLocation } from "react-router";
import { navigation } from "../config/navigation";

export const navLinkGroups: INavLinkGroup[] = [
    {
        links: navigation,
    },
];

export const SideNavigation: React.FunctionComponent = () => {
    const { pathname } = useLocation();

    return <Stack>
        <StackItem>
            <Nav selectedKey={pathname}
                groups={navLinkGroups} />
        </StackItem>
        <Stack>
        </Stack>
    </Stack>
}