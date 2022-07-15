import React, { useCallback } from 'react';
import { List, Image, Link } from '@fluentui/react';
import { socials } from '../config/profile';

export const Profiles: React.FunctionComponent = () => {
  const linkProperties = { target: "blank" }

  const onRenderCell = useCallback((item: any, index: number | undefined) => {
    return (
      <div style={{ display: "flex", paddingBottom: 18 }}>
        <Link href={item.url} {...linkProperties}>
          <Image src={item.logo} width={64} />
        </Link>
        <div style={{ paddingLeft: 8 }}>
          <div style={{ fontSize: "larger" }}>
            {item.name}
          </div>
          <div>
            <Link href={item.url} {...linkProperties}>
              {item.url}
            </Link>
          </div>
        </div>
      </div>
    );
  }, []);

  return <List
    items={socials}
    onRenderCell={onRenderCell}
  />
}
