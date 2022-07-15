import { Link, Stack, StackItem, Image } from "@fluentui/react";

const socialIconStyle = { paddingLeft: 8, width: 24 };

export const SocialLinks: React.FunctionComponent = () => {

    return <Stack horizontal={true}>
        <StackItem>
            <Link href={"https://duolingo.com/achappey"} target={"_blank"}>
                <Image src={"/assets/images/Duolingo.svg"} style={socialIconStyle} />
            </Link>
        </StackItem>
        <StackItem>
            <Link href={"https://github.com/achappey"} target={"_blank"}>
                <Image src={"/assets/images/GitHub.png"} style={socialIconStyle} />
            </Link>
        </StackItem>
        <StackItem>
            <Link href={"https://twitter.com/achappey"} target={"_blank"}>
                <Image src={"/assets/images/Twitter.png"} style={socialIconStyle} />
            </Link>
        </StackItem>
        <StackItem>
            <Link href={"https://nl.linkedin.com/in/achappey"} target={"_blank"}>
                <Image src={"/assets/images/LinkedIn.png"} style={socialIconStyle} />
            </Link>
        </StackItem>
    </Stack>
}