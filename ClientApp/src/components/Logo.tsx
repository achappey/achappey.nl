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
    const classes = useStyles();
    const letters = [
        { letter: "A", src: "/assets/logo/A.png" },
        { letter: "C", src: "/assets/logo/C.png" },
        { letter: "H", src: "/assets/logo/H.png" },
        { letter: "A", src: "/assets/logo/A.png" },
        { letter: "P", src: "/assets/logo/P.png" },
        { letter: "P", src: "/assets/logo/P.png" },
        { letter: "E", src: "/assets/logo/E.png" },
        { letter: "Y", src: "/assets/logo/Y.png" }
    ];

    return (
        <div className={classes.logo}>
            {letters.map(letter => (
                <Tooltip key={letter.letter} content={letter.letter} relationship="label">
                    <Image src={letter.src} />
                </Tooltip>
            ))}
        </div>
    );
};