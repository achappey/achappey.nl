import { ItemCard } from "../components/ItemCard"
import { useTranslation } from "react-i18next"
import { FunctionComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { chartColors } from "../config/theme"
import { Loader } from "../components/Loader";

interface ICodeEditors {
    editorActivity?: any
    editors?: any
}

export const CodeEditors: FunctionComponent<ICodeEditors> = (props) => {
    const { t } = useTranslation()

    const bars = props.editors?.map((k: any, i: number) => <Bar stroke="none" key={k} dataKey={k} fill={chartColors[i] ? chartColors[i] : undefined} />)

    return <ItemCard title={t('Editors')} description={t('Hours per week')}>
        {props.editorActivity &&
            <div style={{ height: 300 }}>
                <ResponsiveContainer>
                    <BarChart data={props.editorActivity}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {bars}
                    </BarChart>
                </ResponsiveContainer>
            </div>
        }

        {!props.editorActivity &&
            <Loader />
        }
    </ItemCard>
}
