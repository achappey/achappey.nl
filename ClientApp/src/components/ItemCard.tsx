import { Label, makeStyles } from "@fluentui/react-components";
import { Card, CardHeader, CardPreview, CardFooter } from "@fluentui/react-components/unstable";
import { FunctionComponent } from "react";

interface IItemCard {
    buttons?: any[]
    title: string
    description?: any
    image?: any
}

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

export const ItemCard: FunctionComponent<IItemCard> = (props) => {
    const classes = useStyles()
    const header = <Label size="large">
        {props.title}
    </Label>

    return <Card className={classes.cardContainer} >
        <CardHeader header={header}
            image={props.image}
            description={props.description}>
        </CardHeader>
        <CardPreview className={classes.preview}>
            {props.children}
        </CardPreview>
        <CardFooter>
            {props.buttons}
        </CardFooter>
    </Card>
}