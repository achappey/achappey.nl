import { makeStyles, Image, Tooltip } from "@fluentui/react-components"

const useStyles = makeStyles({
    logo: {
        display: "flex",
        alignItems: "flex-end",
        "& img": {
            width: "26px",
            paddingRight: "2px",
            '@media(min-width: 768px)': {
                width: "32px",
                paddingRight: "4px",
            }
        }
    }
})


export const Logo: React.FunctionComponent = () => {
    const classes = useStyles()

    return <div className={classes.logo}>
        <Tooltip content={"A"}
            relationship="label">
            <Image src="/assets/logo/A.png" />
        </Tooltip>
        <Tooltip content={"C"}
            relationship="label">
            <Image src="/assets/logo/C.png" />
        </Tooltip>
        <Tooltip content={"H"}
            relationship="label">
            <Image src="/assets/logo/H.png" />
        </Tooltip>
        <Tooltip content={"Second A"}
            relationship="label">
            <Image src="/assets/logo/A.png" />
        </Tooltip>
        <Tooltip content={"P"}
            relationship="label">
            <Image src="/assets/logo/P.png" />
        </Tooltip>
        <Tooltip content={"Another P"}
            relationship="label">
            <Image src="/assets/logo/P.png" />
        </Tooltip>
        <Tooltip content={"E"}
            relationship="label">
            <Image src="/assets/logo/E.png" />
        </Tooltip>
        <Tooltip content={"Y"}
            relationship="label">
            <Image src="/assets/logo/Y.png" />
        </Tooltip>
    </div>
}
