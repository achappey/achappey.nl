import { Button, makeStyles, Tooltip } from "@fluentui/react-components"
import { WeatherMoonRegular, WeatherSunnyRegular } from "@fluentui/react-icons"
import { useTranslation } from "react-i18next";
import { Logo } from "./Logo";
import { SelectLanguage } from "./SelectLanguage";

const useStyles = makeStyles({
    selector: {
        paddingRight: "8px",
        '@media(min-width: 768px)': {
            paddingRight: "16px",
        },
    },
    wrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: "12px",
        alignItems: "center",
        paddingBottom: "12px"
    },
    actions: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    }
})

interface IHeader {
    toggleTheme: any
    darkTheme: boolean
}

export const Header: React.FunctionComponent<IHeader> = (props) => {
    const classes = useStyles()
    const { t } = useTranslation()

    const themeButtonTitle = props.darkTheme ? t("Switch to light theme") : t("Switch to dark theme");
    const icon = props.darkTheme ? <WeatherSunnyRegular /> : <WeatherMoonRegular />

    return <div className={classes.wrapper}>
        <Logo />

        <div>
            <div className={classes.actions}>
                <div className={classes.selector}>
                    <Tooltip content={themeButtonTitle}
                        relationship="label">
                        <Button onClick={props.toggleTheme}
                            icon={icon}
                        />
                    </Tooltip>
                </div>
                <div className={classes.selector}>
                    <SelectLanguage />
                </div>
            </div>
        </div>
    </div>
}
