import React, { useEffect, useState } from 'react';
import { DetailsList, IColumn, SelectionMode, Spinner } from '@fluentui/react';
import Flag from 'react-world-flags'

const columns: IColumn[] = [{ key: "code", name: "", fieldName: "code", minWidth: 50 },
{ key: "name", name: "", fieldName: "name", minWidth: 150 },
{ name: "Points", fieldName: "points", key: "points", minWidth: 100 },
{ name: "Level", fieldName: "level", key: "level", minWidth: 200 }];

const fallBacks: any = {
  da: "dk",
  nb: "no",
  zs: "cn",
  el: "gr",
  sw: "tz"
}

export const Languages: React.FunctionComponent = () => {
  const [repositories, setRepositories] = useState(null);

  const _renderItemColumn = (item: any, index: number | undefined, column: IColumn | undefined) => {
    const fieldContent = item[column?.fieldName as keyof any] as string;

    switch (column?.key) {
      case 'code':
        return <Flag code={fieldContent}
          fallback={<Flag code={fallBacks[fieldContent]} />}
        />;
      default:
        return <span>{fieldContent}</span>;
    }
  }

  useEffect(() => {
    fetch('/api/languages')
      .then(resp => resp.json())
      .then(resp => setRepositories(resp))
  }, [])

  return (
    <div>
      {repositories ? <DetailsList
        selectionMode={SelectionMode.none}
        onRenderItemColumn={_renderItemColumn}
        columns={columns}
        items={repositories} /> : <Spinner />}
    </div>
  );

}
