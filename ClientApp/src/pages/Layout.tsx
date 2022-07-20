import React, { useCallback, useState } from 'react';
import { Route, Routes } from 'react-router';
import { Home } from './Home';

import { mergeStyleSets, Panel, Stack, StackItem } from '@fluentui/react';
import { Header } from '../components/Header';
import { SideNavigation } from '../components/SideNavigation';
import { Repositories } from './Repositories';
import { Languages } from './Languages';
import { useMediaQuery } from 'usehooks-ts'
import { Profiles } from './Profiles';
import { brandName } from '../config/profile';
import { ColorRamp } from './ColorRamp';

const styles = mergeStyleSets({
  container:{
    display: "flex"
  },
  content: {
    paddingLeft: 16, 
    paddingTop: 16, 
    width: "100%"
  },
  itemTitle: {
    fontSize: "larger"
  }
})

export const Layout: React.FunctionComponent = () => {
  const largeScreen = useMediaQuery('(min-width: 768px)')
  const [showMenu, setShowMenu] = useState(largeScreen);

  const toggleMenu = useCallback(() => setShowMenu(!showMenu), [showMenu]);

  return <Stack>
      <StackItem>
        <Header toggleMenu={toggleMenu} />
      </StackItem>
      <StackItem>
        <Stack horizontal={true}>
          {showMenu && largeScreen && <StackItem>
            <SideNavigation />
          </StackItem>}
          <StackItem className={styles.content}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/repositories' element={<Repositories />} />
              <Route path='/languages' element={<Languages />} />
              <Route path='/profiles' element={<Profiles />} />
              <Route path='/colorramp' element={<ColorRamp />} />
            </Routes>
          </StackItem>
          <Panel isOpen={showMenu && !largeScreen}
            isLightDismiss={true}
            onDismiss={toggleMenu}
            headerText={brandName}>
            <SideNavigation />
          </Panel>
        </Stack>
      </StackItem>
    </Stack>;

}
