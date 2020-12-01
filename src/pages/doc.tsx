import { NextPage } from 'next'
import React from 'react'

import { Viewer } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'

const MyApp: NextPage = () => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin()

  return (
    <div>
      <Viewer
        fileUrl="/procediment/npm.pdf"
        plugins={[defaultLayoutPluginInstance]}
      />
    </div>
  )
}

export default MyApp
