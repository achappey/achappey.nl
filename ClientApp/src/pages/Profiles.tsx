import React, { useCallback } from 'react';
import { List, Image, Link, mergeStyleSets } from '@fluentui/react';
import { socials } from '../config/profile';

const linkProperties = { target: "blank" }

const styles = mergeStyleSets({
  itemContainer:{
    display: "flex",
    paddingBottom: 18
  },
  itemText: {
    paddingLeft: 8
  },
  itemTitle: {
    fontSize: "larger"
  }
})

export const Profiles: React.FunctionComponent = () => {
  const onRenderCell = useCallback((item: any, index: number | undefined) => {
    return (
      <div className={styles.itemContainer}>
        <Link href={item.url} {...linkProperties}>
          <Image src={item.logo} width={64} />
        </Link>
        <div className={styles.itemText}>
          <div className={styles.itemTitle}>
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
