import React from 'react'
import ReactDOM from 'react-dom'

import {canvas} from '@instructure/ui-themes'
import {EmotionThemeProvider} from '@instructure/emotion'

import App from './App'

ReactDOM.render(
  <EmotionThemeProvider theme={canvas}>
    <App />
  </EmotionThemeProvider>,
  document.getElementById('root')
)
