import { Label, makeStyles } from "@fluentui/react-components";
import { Card, CardHeader, CardPreview, CardFooter } from "@fluentui/react-components/unstable";
import { FunctionComponent } from "react";

const useStyles = makeStyles({
    cardContainer: {
        marginRight: "8px",
        marginBottom: "16px",
        '@media(min-width: 768px)': {
            marginRight: "16px"
        }
    },
    preview: {
        paddingRight: "12px",
        paddingLeft: "12px"
    }
})

export const ItemCard: React.FunctionComponent<any> = ({ title, image, description, children, buttons }) => {
    const classes = useStyles();

    return (
        <Card className={classes.cardContainer}>
            <CardHeader
                header={<Label size="large">{title}</Label>}
                image={image}
                description={description}
            />
            <CardPreview className={classes.preview}>{children}</CardPreview>
            <CardFooter>{buttons}</CardFooter>
        </Card>
    );
};
