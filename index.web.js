
import 'babel-polyfill'

import React from 'react'
import { AppRegistry } from 'react-native-web'
import { WebStyles } from 'carbon-ui'

import App from './src/App'

const AppWithStyles = () => <App><WebStyles /></App>

AppRegistry.registerComponent('CarbonUIExample', () => AppWithStyles)
AppRegistry.runApplication('CarbonUIExample', { rootTag: document.getElementById('root') })