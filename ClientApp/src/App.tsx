import React, { Component } from 'react';
import { Layout } from './pages/Layout';
import { initTimeAgo } from './utils/initTimeAgo';
import { initInsights } from './utils/initInsights';
import { initTranslations } from './utils/initTranslations';

initTimeAgo();
initInsights();
initTranslations();

export default class App extends Component {

  render() {
    return (
      <Layout />
    );
  }
}
