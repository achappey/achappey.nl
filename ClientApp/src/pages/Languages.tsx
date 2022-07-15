import React from 'react';
import { DetailsList, IColumn, SelectionMode, Spinner } from '@fluentui/react';
import { useLanguages } from '../hooks/useLanguages';
import { LanguageFlag } from '../components/LanguageFlag';

const columns: IColumn[] = [{ key: "code", name: "", fieldName: "code", minWidth: 50, maxWidth: 50 },
{ key: "name", name: "", fieldName: "name", minWidth: 150 },
{ name: "Points", fieldName: "points", key: "points", minWidth: 50, maxWidth: 100 },
{ name: "Level", fieldName: "level", key: "level", minWidth: 50, maxWidth: 100 }];

export const Languages: React.FunctionComponent = () => {
  const { languages } = useLanguages();

  const _renderItemColumn = (item: any, index: number | undefined, column: IColumn | undefined) => {
    const fieldContent = item[column?.fieldName as keyof any] as string;

    switch (column?.key) {
      case 'code':
        return <LanguageFlag name={item.name} code={fieldContent} /> ;
      default:
        return <span>{fieldContent}</span>;
    }
  }

  return (
    <div>
      {languages ? <DetailsList
        selectionMode={SelectionMode.none}
        onRenderItemColumn={_renderItemColumn}
        columns={columns}
        items={languages} /> : <Spinner />}
    </div>
  );

}
