import React, { Component } from 'react';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { Layout } from './pages/Layout';
import { initTimeAgo } from './utils/initTimeAgo';
import { initInsights } from './utils/initInsights';
import { initTranslations } from './utils/initTranslations';

initTimeAgo();
initializeIcons();
initInsights();
initTranslations();

export default class App extends Component {

  render() {
    return (<>
      <Layout />
    </>
    );
  }
}
