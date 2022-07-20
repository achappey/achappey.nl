import { mergeStyleSets } from "@fluentui/react";
import { Card, CardItem, CardSection } from "@fluentui/react-cards";
import { FunctionComponent } from "react";

const styles = mergeStyleSets({
    cardContainer: {
      padding: 8,
      marginRight: 24,
      marginBottom: 24,
      maxWidth: "inherit"
    }
  })

export const ItemCard: FunctionComponent = (props) => {

    return <div><Card className={styles.cardContainer} >
        <CardSection>
            <CardItem disableShrink>
                {props.children}
            </CardItem>
        </CardSection>
    </Card>
    </div>
}