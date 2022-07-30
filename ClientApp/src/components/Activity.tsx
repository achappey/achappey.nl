import { makeStyles } from "@fluentui/react-components";
import { CodeRegular, MusicNote2Regular, BookOpenGlobeRegular } from "@fluentui/react-icons";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import ReactTimeAgo from "react-time-ago";
import { Duolingo, GitHub, IActivity, Lastfm, WakaTime } from "../config/types";

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
    network: string
}

const SourceIcon: FunctionComponent<ISourceIcon> = (props) => {
    switch (props.network) {
        case GitHub:
            return <CodeRegular fontSize={28} />
        case Duolingo:
            return <BookOpenGlobeRegular fontSize={28} />
        case WakaTime:
            return <CodeRegular fontSize={28} />
        case Lastfm:
            return <MusicNote2Regular fontSize={28} />
        default:
            return <></>;
    }
}

export const Activity: React.FunctionComponent<IActivity> = (props) => {
    const classes = useStyles()
    const { i18n } = useTranslation()

    return <div className={classes.activity}>
        <div className={classes.activityIcon}>
            <SourceIcon network={props.network} />
        </div>
        <div>
            <div>
                {props.title}
            </div>
            <div>
                <ReactTimeAgo locale={i18n.language}
                    date={new Date(props.createdAt)}
                />
            </div>
        </div>
    </div>
}

