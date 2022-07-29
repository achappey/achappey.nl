import { ItemCard } from "../components/ItemCard";
import { LanguageFlag } from "../components/LanguageFlag";

interface ILanguage {
    code: string
    name: string
    description: string
    points: number
    level: number
}

export const Language: React.FunctionComponent<ILanguage> = (props) => {
    const description = props.description === "Duolingo" ? `${props.points} XP` : '';

    return <ItemCard title={props.name}
        image={<LanguageFlag {...props} />}
        description={props.description} >
        {description}
    </ItemCard>
}
