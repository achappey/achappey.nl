import { Dropdown } from "@fluentui/react"
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

export const SelectLanguage: React.FunctionComponent = () => {
    const { i18n } = useTranslation();

    const switchLanguage = useCallback((_ev: any, option: any | undefined, _index: number | undefined) => {
        i18n.changeLanguage(option.key)
    }, [i18n])

    const languageOptions = [
        { key: 'en', text: 'English' },
        { key: 'nl', text: 'Nederlands' }
    ];

    const selectedKey = i18n.language?.indexOf("nl") > -1 ? "nl" : "en";

    return <Dropdown selectedKey={selectedKey}
        style={{ minWidth: 100 }}
        onChange={switchLanguage}
        options={languageOptions} />
}
