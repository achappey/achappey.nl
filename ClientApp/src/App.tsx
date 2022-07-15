import React, { Component } from 'react';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { Layout } from './pages/Layout';
import { initTimeAgo } from './utils/initTimeAgo';
import { initInsights } from './utils/initInsights';

initTimeAgo();
initializeIcons();
initInsights();

export default class App extends Component {

  render() {
    return (<>
      <Layout />
    </>
    );
  }
}
