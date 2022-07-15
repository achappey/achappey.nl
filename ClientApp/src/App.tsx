import React, { Component } from 'react';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { Layout } from './pages/Layout';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { ReactPlugin } from '@microsoft/applicationinsights-react-js';

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
TimeAgo.addDefaultLocale(en)

initializeIcons();

if (process.env.REACT_APP_APPINSIGHTS) {
  var reactPlugin = new ReactPlugin();
  var appInsights = new ApplicationInsights({
    config: {
      instrumentationKey: process.env.REACT_APP_APPINSIGHTS,
      enableAutoRouteTracking: true,
      extensions: [reactPlugin]
    }
  });

  appInsights.loadAppInsights();
}

export default class App extends Component {

  render() {
    return (<>
      <Layout />
    </>
    );
  }
}
