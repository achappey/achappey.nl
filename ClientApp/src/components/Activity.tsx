import { makeStyles } from "@fluentui/react-components";
import { CodeRegular, MusicNote2Regular, BookOpenGlobeRegular } from "@fluentui/react-icons";
import { FunctionComponent } from "react";
import ReactTimeAgo from "react-time-ago";

const useStyles = makeStyles({
    activity: {
        display: "flex",
        flexDirection: "row",
    },
    activityIcon: {
        paddingRight: "8px"
    }
})

interface ISourceIcon {
    source: string
}

const SourceIcon: FunctionComponent<ISourceIcon> = (props) => {
    switch (props.source) {
        case "GITHUB":
            return <CodeRegular fontSize={28} />
        case "DUOLINGO":
            return <BookOpenGlobeRegular fontSize={28} />
        case "WAKATIME":
            return <CodeRegular fontSize={28} />
        case "LASTFM":
            return <MusicNote2Regular fontSize={28} />
        default:
            return <></>;
    }
}

export interface IActivity {
    activity: any
}

export const Activity: React.FunctionComponent<IActivity> = (props) => {
    const classes = useStyles()

    return <div className={classes.activity}>
        <div className={classes.activityIcon}>
            <SourceIcon source={props.activity.source} />
            {props.activity.icon}
        </div>
        <div>
            <div>
                {props.activity.title}
            </div>
            <div>
                <ReactTimeAgo date={new Date(props.activity.createdAt)} />
            </div>
        </div>
    </div>
}

