import { Select } from "@fluentui/react-components/unstable"
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

const languages: any = {
    'English': 'en',
    'Nederlands': 'nl'
};

export const SelectLanguage: React.FunctionComponent = () => {
    const { i18n } = useTranslation();

    const switchLanguage = useCallback((_ev: any, data: any) => {
        i18n.changeLanguage(languages[data.value])
    }, [i18n])

    const options = Object.keys(languages).map(t => <option key={t}>{t}</option>)
    const selectedKey = i18n.language?.indexOf("nl") > -1 ? "Nederlands" : "English";

    return <Select value={selectedKey}
        onChange={switchLanguage}>
        {options}
    </Select>
}
