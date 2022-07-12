import React, { Component } from 'react';
import { Route } from 'react-router';
import { Home } from './components/Home';

import { Stack, StackItem } from '@fluentui/react';
import { Header } from './components/Header';
import { SideNavigation } from './components/SideNavigation';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { Repositories } from './components/Repositories';

initializeIcons();

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (<>
      <Stack>
        <StackItem style={{ width: "100%" }}>
          <Header />
        </StackItem>
      </Stack>
      <Stack horizontal={true}>
        <StackItem>
          <SideNavigation />
        </StackItem>
        <StackItem style={{ paddingLeft: 20 }}>
          <Route exact path='/'><Home /></Route>
          <Route path='/repositories' ><Repositories /></Route>
        </StackItem>
      </Stack>
    </>
    );
  }
}
