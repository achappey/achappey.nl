import React, { Component } from 'react';
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { Layout } from './components/Layout';

import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en.json'

TimeAgo.addDefaultLocale(en)

initializeIcons();

export default class App extends Component {

  render() {
    return (<>
      <Layout />
    </>
    );
  }
}
