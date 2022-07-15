import React, { useEffect, useState } from 'react';
import { DetailsList, IColumn, Link, SelectionMode, Spinner } from '@fluentui/react';
import ReactTimeAgo from 'react-time-ago';

const columns: IColumn[] = [
  { key: "name", name: "Name", fieldName: "name", minWidth: 150 },
  { name: "Language", fieldName: "language", key: "language", minWidth: 100 },
  { name: "Updated at", fieldName: "updatedAt", key: "updatedAt", minWidth: 200 }
];

export const Repositories: React.FunctionComponent = () => {
  const [repositories, setRepositories] = useState(null);

  const _renderItemColumn = (item: any, _index: number | undefined, column: IColumn | undefined) => {
    const fieldContent = item[column?.fieldName as keyof any] as string;

    switch (column?.key) {
      case 'name':
        return <Link href={item.htmlUrl} target={"_blank"}>{fieldContent}</Link>;
      case 'updatedAt':
        return <ReactTimeAgo date={new Date(fieldContent)} locale="en-US" />;
      default:
        return <span>{fieldContent}</span>;
    }
  }

  useEffect(() => {
    fetch('/api/repositories')
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
