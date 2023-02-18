import { SocketProvider } from 'common/context/socketContext'
import type { AppProps } from 'next/app'
import React from 'react'

const App = (props: AppProps) => {
  const { Component, pageProps } = props
  return (
    <SocketProvider>
      <Component {...pageProps} />
    </SocketProvider>
  )
}

export default App
