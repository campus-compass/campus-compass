import React from 'react'
import './App.css'
import Routes from './routes'
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles'
import AuthProvider from './auth/authProvider'

let theme = createTheme({
  palette: {
    primary: {
      light: '#334b62',
      main: '#011E3B',
      dark: '#001529'
    },
    secondary: {
      light: '#d6f3f5',
      main: '#CCF0F3',
      dark: '#8ea8aa'
    }
  },
  typography: {
    body1: {
      lineHeight: 1.4,
      fontSize: 21,
      fontWeight: 300
    },
    body2: {
      lineHeight: 1.4,
      fontSize: 18,
      fontWeight: 300
    },
    h5: {
      fontWeight: 500
    }
  }
})

theme = responsiveFontSizes(theme)

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <div className='App'>
          <Routes />
        </div>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
