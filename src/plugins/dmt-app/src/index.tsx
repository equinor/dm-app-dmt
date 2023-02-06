import * as React from 'react'
import { useContext } from 'react'
import {
  ApplicationContext,
  Header,
  FSTreeProvider,
  TPlugin,
  UIPluginSelector,
} from '@development-framework/dm-core'
import SearchPage from './pages/SearchPage'
import ViewPage from './pages/ViewPage'
import { Route } from 'react-router-dom'
import { createGlobalStyle, ThemeProvider } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    font-family: Equinor-Regular, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`
const theme = {
  flexboxgrid: {
    gutterWidth: 0, // rem
    outerMargin: 0, // rem
  },
}

const PageComponent = () => {
  const applicationSettings = useContext(ApplicationContext)

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header allApps={[]} appName={applicationSettings.label} urlPath={'/'} />
      <Route
        path="/search"
        render={() => <SearchPage settings={applicationSettings} />}
      />
      <Route
        exact
        path="/view/:data_source/:entity_id"
        component={() => <ViewPage settings={applicationSettings} />}
      />

      {/*<Route exact path={`/`} render={() => <Editor />} />*/}
    </ThemeProvider>
  )
}

export const plugins: TPlugin[] = [
  {
    pluginName: 'DMT',
    component: PageComponent,
  },
]
