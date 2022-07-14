import { Link, Stack, StackItem, Image } from "@fluentui/react";

const socialIconStyle = { maxWidth: 24, paddingLeft: 8 };

export const SocialLinks: React.FunctionComponent = () => {

    return   <Stack horizontal={true}>
    <StackItem>
        <Link href={"https://github.com/achappey"} target={"_blank"}>
            <Image src={"/GitHub.png"} style={socialIconStyle} />
        </Link>
    </StackItem>
    <StackItem>
        <Link href={"https://twitter.com/achappey"} target={"_blank"}>
            <Image src={"/Twitter.png"} style={socialIconStyle} />
        </Link>
    </StackItem>
    <StackItem>
        <Link href={"https://linkedin.com/achappey"} target={"_blank"}>
            <Image src={"/LinkedIn.png"} style={socialIconStyle} />
        </Link>
    </StackItem>
</Stack>
}