import React, { useEffect, useState } from 'react';
import { DetailsList, Spinner } from '@fluentui/react';

export const Repositories: React.FunctionComponent = () => {
  const [repositories, setRepositories] = useState(null);

  useEffect(() => {
    fetch('/api/repositories')
      .then(resp => resp.json())
      .then(resp => setRepositories(resp))
  }, [])

  return (
    <div>
      {repositories ? <DetailsList items={repositories} /> : <Spinner />}
    </div>
  );

}
