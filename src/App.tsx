// @ts-nocheck

import React, { useContext } from 'react'
import {
  ApplicationContext,
  useDocument,
  UIPluginSelector,
  UiPluginContext,
} from '@development-framework/dm-core'
import { Progress } from '@equinor/eds-core-react'
import appSettings from './app-settings.json'

const _applicationId = appSettings.applicationId.split('/')
const dataSourceId = _applicationId[0]

function App() {
  const { loading: isPluginsLoading } = useContext(UiPluginContext)
  const [application, isLoading, , error] = useDocument(
    appSettings.applicationId
  )

  if (isLoading || isPluginsLoading) return <Progress.Circular />

  if (error) {
    console.error(error)
    return (
      <div style={{ color: 'red' }}>
        <b>Error:</b>Failed to load data, see web console for details
      </div>
    )
  }

  return (
    <ApplicationContext.Provider value={application}>
      <UIPluginSelector
        absoluteDottedId={`${dataSourceId}/${application?._id}`}
        type={application?.type}
        categories={['Application']}
      />
    </ApplicationContext.Provider>
  )
}

export default App
