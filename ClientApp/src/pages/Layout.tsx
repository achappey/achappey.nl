import React, { useCallback, useState } from 'react';
import { Route, Routes } from 'react-router';
import { Home } from './Home';

import { Panel, Stack, StackItem } from '@fluentui/react';
import { Header } from '../components/Header';
import { SideNavigation } from '../components/SideNavigation';
import { Repositories } from './Repositories';
import { Languages } from './Languages';
import { useMediaQuery } from 'usehooks-ts'
import { Profiles } from './Profiles';

export const Layout: React.FunctionComponent = () => {
  const largeScreen = useMediaQuery('(min-width: 768px)')
  const [showMenu, setShowMenu] = useState(largeScreen);

  const toggleMenu = useCallback(() => setShowMenu(!showMenu), [showMenu]);
  const contentStyle = { paddingLeft: 16, paddingTop: 16, width: "100%" };

  return (<>
    <Stack verticalFill={true}>
      <StackItem style={{ width: "100%" }}>
        <Header toggleMenu={toggleMenu} />
      </StackItem>
      <StackItem>
        <Stack horizontal={true}>
          {showMenu && largeScreen && <StackItem>
            <SideNavigation />
          </StackItem>}
          <StackItem style={contentStyle}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/repositories' element={<Repositories />} />
              <Route path='/languages' element={<Languages />} />
              <Route path='/profiles' element={<Profiles />} />
            </Routes>
          </StackItem>
          <Panel isOpen={showMenu && !largeScreen}
            isLightDismiss={true}
            onDismiss={toggleMenu}
            headerText="achappey">
            <SideNavigation />
          </Panel>
        </Stack>
      </StackItem>
    </Stack>
  </>
  );

}
