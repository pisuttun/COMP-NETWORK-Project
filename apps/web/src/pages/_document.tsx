import NextDocument, { Head, Html, Main, NextScript } from 'next/document'

export default class RootDocument extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
          <meta name="emotion-insertion-point" content="" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
        </Head>
        <body style={{ margin: '0px', padding: '0px' }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
