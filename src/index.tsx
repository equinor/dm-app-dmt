import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { UiPluginProvider } from '@development-framework/dm-core'
import plugins from './plugins'
import { AuthProvider } from 'react-oauth2-code-pkce'
import { BrowserRouter as Router } from 'react-router-dom'

const fullCurrentURL = () =>
  `${window.location.pathname}${window.location.search}${window.location.hash}`

const authEnabled = process.env.REACT_APP_AUTH === '1'
const authConfig = {
  clientId: process.env.REACT_APP_AUTH_CLIENT_ID || '',
  authorizationEndpoint: process.env.REACT_APP_AUTH_ENDPOINT || '',
  tokenEndpoint: process.env.REACT_APP_TOKEN_ENDPOINT || '',
  scope: process.env.REACT_APP_AUTH_SCOPE || '',
  redirectUri: process.env.REACT_APP_AUTH_REDIRECT_URI || '',
  logoutEndpoint: process.env.REACT_APP_LOGOUT_ENDPOINT || '',
  preLogin: () => localStorage.setItem('preLoginPath', fullCurrentURL()),
  postLogin: () => {
    if (localStorage.getItem('preLoginPath') !== fullCurrentURL()) {
      // @ts-ignore
      window.location.href = localStorage.getItem('preLoginPath')
    }
  },
}

const Test = () => {
  return (
    <UiPluginProvider pluginsToLoad={plugins}>
      {authEnabled ? (
        <AuthProvider authConfig={authConfig}>
          <App />
        </AuthProvider>
      ) : (
        <App />
      )}
    </UiPluginProvider>
  )
}

ReactDOM.render(
  <Router>
    <Test />
  </Router>,
  document.getElementById('root')
)
