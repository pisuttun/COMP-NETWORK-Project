import createCache from '@emotion/cache'
import { createTheme } from '@mui/material'

import { PaletteOptions, PaletteColorOptions } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface PaletteOptions {
    reject?: PaletteColorOptions
    online?: {
      main: string
    }
    offline?: PaletteColorOptions
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#412846',
      dark: '#322036',
      light: '#D0B1F8',
    },
    secondary: {
      main: '#D0B1F8',
      contrastText: '#000000',
    },
    background: {
      default: '#1D121F',
      paper: '#1D121F',
    },
    online: {
      main: '#6DD58C',
    },
    offline: {
      main: '#606060',
    },
    reject: {
      main: '#AA5B5B',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#B00020',
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#66A373',
      contrastText: '#FFFFFF',
    },
    common: {
      black: '#1D121F',
      white: '#EFE0FF',
    },
  },
})

export function createEmotionCache() {
  let insertionPoint

  if (typeof document !== 'undefined') {
    const emotionInsertionPoint = document.querySelector<HTMLMetaElement>(
      'meta[name="emotion-insertion-point"]',
    )
    insertionPoint = emotionInsertionPoint ?? undefined
  }

  return createCache({ key: 'mui-style', insertionPoint })
}

export default theme
