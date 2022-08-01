import { ItemCard } from "../components/ItemCard"
import { useTranslation } from "react-i18next"
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { chartColors } from "../config/theme";
import { Loader } from "../components/Loader";

interface ICodeLanguages {
    languageActivity?: any
}

export const CodeLanguages: React.FunctionComponent<ICodeLanguages> = (props) => {
    const { t } = useTranslation()

    const bars = props.languageActivity?.map((k: any, i: number) => <Cell key={k.name} fill={chartColors[i] ? chartColors[i] : undefined} />)

    return <ItemCard title={t('Development languages')}
        description={t('Hours last weeks')}>

        {props.languageActivity &&
            <div style={{ height: 300 }}>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie dataKey="value"
                            stroke="none"
                            data={props.languageActivity}
                            cx="50%"
                            cy="50%">
                            {bars}
                        </Pie>
                        <Tooltip />
                        <Legend layout="vertical" align="right" />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        }

        {!props.languageActivity &&
            <Loader />
        }
    </ItemCard>
}
