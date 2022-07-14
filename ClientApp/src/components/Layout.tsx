import React, { useCallback, useState } from 'react';
import { Route, Routes } from 'react-router';
import { Home } from './Home';

import { Stack, StackItem } from '@fluentui/react';
import { Header } from './Header';
import { SideNavigation } from './SideNavigation';
import { Repositories } from './Repositories';
import { Languages } from './Languages';
import { useMediaQuery } from 'usehooks-ts'

export const Layout: React.FunctionComponent = () => {
  const matches = useMediaQuery('(min-width: 768px)')
  const [showMenu, setShowMenu] = useState(matches);

  const toggleMenu = useCallback(() => setShowMenu(!showMenu), [showMenu]);
  const contentStyle = { paddingLeft: 20, paddingTop: 20, width: "100%" };

  return (<>
    <Stack>
      <StackItem style={{ width: "100%" }}>
        <Header toggleMenu={toggleMenu} />
      </StackItem>
    </Stack>
    <Stack horizontal={true}>
      {showMenu && <StackItem>
        <SideNavigation />
      </StackItem>}
      <StackItem style={contentStyle}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/repositories' element={<Repositories />} />
          <Route path='/languages' element={<Languages />} />
        </Routes>
      </StackItem>
    </Stack>
  </>
  );

}
