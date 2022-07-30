import { makeStyles, Image } from "@fluentui/react-components"

const useStyles = makeStyles({

    logo: {
        display: "flex",
        alignItems: "flex-end"
    },
    logoImage: {
        width: "26px",
        paddingRight: "2px",
        '@media(min-width: 768px)': {
            width: "32px",
            paddingRight: "4px",
        },
    }
})


export const Logo: React.FunctionComponent = () => {
    const classes = useStyles()

    return <div className={classes.logo}>
        <Image src="/assets/logo/A.png"
            title={"A"}
            className={classes.logoImage}
        />
        <Image src="/assets/logo/C.png"
            title={"C"}
            className={classes.logoImage}
        />
        <Image src="/assets/logo/H.png"
            title={"H"}
            className={classes.logoImage}
        />
        <Image src="/assets/logo/A.png"
            title={"A"}
            className={classes.logoImage}
        />
        <Image src="/assets/logo/P.png"
            title={"P"}
            className={classes.logoImage}
        />
        <Image src="/assets/logo/P.png"
            title={"P"}
            className={classes.logoImage}
        />
        <Image src="/assets/logo/E.png"
            title={"E"}
            className={classes.logoImage}
        />
        <Image src="/assets/logo/Y.png"
            title={"Y"}
            className={classes.logoImage}
        />
    </div>
}
