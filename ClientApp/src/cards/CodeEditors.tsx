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

    const bars = props.editors?.map((k: any, i: number) => <Bar key={k} dataKey={k} fill={chartColors[i] ? chartColors[i] : undefined} />)

    return <ItemCard title={t('Used editors')} description={t('Hours per week')}>
        {props.editorActivity &&
            <div style={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        height={300}
                        data={props.editorActivity}>
                        <XAxis dataKey="name" />
                        <YAxis label={{ value: t('Hours'), angle: -90, position: 'insideLeft' }} />
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
