import { SocketProvider } from 'common/context/socketContext'
import type { AppProps } from 'next/app'
import React from 'react'
import { Box, CssBaseline, ThemeProvider } from '@mui/material'
import theme from 'common/config/theme'
import { SnackbarProvider } from 'common/context/SnackbarContext'

const App = (props: AppProps) => {
  const { Component, pageProps } = props
  return (
    <>
      <SocketProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SnackbarProvider>
            <Box
              style={{
                backgroundImage: `linear-gradient(109.93deg, #332037 0%, #6C4484 81.48%)`,
                width: '100vw',
                height: '100vh',
              }}
            >
                <Component {...pageProps} />
            </Box>
          </SnackbarProvider>
        </ThemeProvider>
      </SocketProvider>
    </>
  )
}

export default App
