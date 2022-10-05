// @ts-nocheck

import React, { useContext } from 'react'
import './App.css'
import {
  ApplicationContext,
  UiPluginContext,
  FSTreeProvider,
} from '@development-framework/dm-core'
import { Progress } from '@equinor/eds-core-react'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import { Redirect, Route, useHistory } from 'react-router-dom'
import { Switch } from 'react-router'
import {
  CardBody,
  CardFieldset,
  CardHeader,
  CardHeading,
  CardWrapper,
} from './components/Card'

import { APPLICATIONS } from './settings'

const theme = {
  flexboxgrid: {
    gutterWidth: 0, // rem
    outerMargin: 0, // rem
  },
}

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    font-family: Equinor-Regular, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`

const HorizontalList = styled.div`
  display: flex;
  flex-flow: wrap;
  justify-content: center;

  & > div {
    margin: 20px;
    padding: 20px;
  }
`
const AppSelector = (props: { applications: any }) => {
  const { applications } = props
  const history = useHistory()
  const links = Object.values(applications).map((setting) => (
    <div key={setting.name}>
      <CardWrapper onClick={() => history.push(`/${setting.urlPath}`)}>
        <CardHeader>
          <CardHeading>{`${setting.label}`}</CardHeading>
        </CardHeader>
        <CardBody>
          <CardFieldset>{`${setting.description}`}</CardFieldset>
        </CardBody>
      </CardWrapper>
    </div>
  ))
  return (
    <div>
      <HorizontalList>{links}</HorizontalList>
    </div>
  )
}

function App() {
  const { loading, getPagePlugin } = useContext(UiPluginContext)

  if (loading)
    return (
      <Progress.Circular
        style={{
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: '150px',
        }}
      />
    )

  if (APPLICATIONS?.length === 0) return <>No applications configured</>

  return (
    <ThemeProvider theme={theme}>
      <div>
        <GlobalStyle />
        <Switch>
          <Route
            exact
            path="/"
            render={() =>
              APPLICATIONS.length === 1 ? (
                <Redirect to={APPLICATIONS[0].urlPath} />
              ) : (
                <AppSelector applications={APPLICATIONS} />
              )
            }
          />
          {Object.values(APPLICATIONS).map((application) => (
            <Route
              path={`/${application.urlPath}`}
              render={() => {
                const UiPlugin = getPagePlugin(application?.pluginName)
                  .component
                if (!UiPlugin)
                  return (
                    <div style={{ color: 'red' }}>
                      {' '}
                      <b>Error:</b>Failed to get UiPlugins, see web console for
                      details.
                    </div>
                  )
                return (
                  <ApplicationContext.Provider value={application}>
                    <FSTreeProvider>
                      <UiPlugin
                        settings={application}
                        applications={APPLICATIONS}
                      />
                    </FSTreeProvider>
                  </ApplicationContext.Provider>
                )
              }}
              key={application.name}
            />
          ))}
        </Switch>
      </div>
    </ThemeProvider>
  )
}

export default App
