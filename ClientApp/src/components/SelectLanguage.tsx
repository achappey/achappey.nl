import { Tooltip } from "@fluentui/react-components";
import { Dropdown, Option } from "@fluentui/react-components"
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

const languages: any = {
    'English': 'en',
    'Nederlands': 'nl'
};

export const SelectLanguage: React.FunctionComponent = () => {
    const { i18n, t } = useTranslation();
    const [selectedKey, setSelectedKey] = useState(i18n.language?.indexOf("nl") > -1 ? "Nederlands" : "English");

    const switchLanguage = useCallback((_ev: any, data: any) => {
        i18n.changeLanguage(languages[data.optionValue]);
        setSelectedKey(data.optionValue);
    }, [i18n]);

    const options = useMemo(() => (
        Object.keys(languages).map(key => (
            <Option key={key} value={key}>{key}</Option>
        ))
    ), [languages]);

    return (
        <Tooltip content={t("Select a language")} relationship="label">
            <Dropdown value={selectedKey} onOptionSelect={switchLanguage}>
                {options}
            </Dropdown>
        </Tooltip>
    );
};
