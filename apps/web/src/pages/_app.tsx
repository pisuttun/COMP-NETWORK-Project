import { SocketProvider } from 'common/context/socketContext'
import type { AppProps } from 'next/app'
import React from 'react'
import { Box, CssBaseline } from '@mui/material'

const App = (props: AppProps) => {
  const { Component, pageProps } = props
  return (
    <>
      <SocketProvider>
        <CssBaseline />
        <Box
          style={{
            backgroundImage: `linear-gradient(111.36deg, #412846 17.33%, #5A3C6B 81.39%)`,
          }}
        >
          <Component {...pageProps} />
        </Box>
      </SocketProvider>
    </>
  )
}

export default App
