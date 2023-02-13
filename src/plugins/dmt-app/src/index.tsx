import * as React from 'react'
import { useContext } from 'react'
import {
  ApplicationContext,
  FSTreeProvider,
  IUIPlugin,
  TPlugin,
} from '@development-framework/dm-core'
import SearchPage from './pages/SearchPage'
import ViewPage from './pages/ViewPage'
import { Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { plugins as headerPlugins } from '@development-framework/header'

const theme = {
  flexboxgrid: {
    gutterWidth: 0, // rem
    outerMargin: 0, // rem
  },
}

const DmtApp = (props: IUIPlugin) => {
  const { idReference, config, type } = props
  const applicationSettings = useContext(ApplicationContext)
  const headerPlugin: TPlugin = headerPlugins.find((plugin) => {
    return plugin.pluginName === 'header'
  }) || {
    pluginName: 'undefined',
    component: (props: IUIPlugin) => <div>Could not find header plugin</div>,
  }
  const Header: (props: IUIPlugin) => JSX.Element = headerPlugin.component

  return (
    <ThemeProvider theme={theme}>
      <FSTreeProvider visibleDataSources={applicationSettings.dataSources}>
        <Route
          path="/search"
          render={() => <SearchPage settings={applicationSettings} />}
        />
        <Route
          exact
          path="/view/:data_source/:entity_id"
          component={() => <ViewPage settings={applicationSettings} />}
        />
        <Route
          exact
          path={`/`}
          render={() => (
            <Header idReference={idReference} config={config} type={type} />
          )}
        />
      </FSTreeProvider>
    </ThemeProvider>
  )
}

export const plugins: TPlugin[] = [
  {
    pluginName: 'DMT',
    component: DmtApp,
  },
]
