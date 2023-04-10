import { SocketProvider } from 'common/context/socketContext'
import type { AppProps } from 'next/app'
import React from 'react'
import { Box, CssBaseline, ThemeProvider } from '@mui/material'
import theme from 'common/config/theme'

const App = (props: AppProps) => {
  const { Component, pageProps } = props
  return (
    <>
      <SocketProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box
            style={{
              backgroundImage: `linear-gradient(111.36deg, #412846 17.33%, #5A3C6B 81.39%)`,
              width: '100vw',
              height: '100vh',
            }}
          >
            <Component {...pageProps} />
          </Box>
        </ThemeProvider>
      </SocketProvider>
    </>
  )
}

export default App
