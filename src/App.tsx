// @ts-nocheck

import React from 'react'
import './App.css'
import {
  ApplicationContext,
  UIPluginSelector,
  useDocument,
} from '@development-framework/dm-core'
import { Progress } from '@equinor/eds-core-react'

const _applicationId = 'DMT/46a2c6ce-5bb4-41bc-923e-ede8dc95500e'.split('/')
const dataSourceId = _applicationId[0]
const applicationId = _applicationId[1]

function App() {
  const [application, isLoading, updateApplication, error] = useDocument(
    dataSourceId,
    applicationId
  )
  if (isLoading) return <Progress.Circular />

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
        type={application.type}
        categories={['Application']}
      />
    </ApplicationContext.Provider>
  )
}

export default App
