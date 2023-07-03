import { createTheme } from '@mui/material/styles'
import palette from './colors'
import typography from './typography'

/* The code is creating a theme object using the `createTheme` function from the `@mui/material/styles`
library. */
const theme = createTheme({
  palette,
  typography
})

export default theme
