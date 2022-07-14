import React, { Component } from 'react';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { Layout } from './components/Layout';

initializeIcons();

export default class App extends Component {

  render() {
    return (<>
      <Layout />
    </>
    );
  }
}
