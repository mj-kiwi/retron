/** @jsxImportSource @emotion/react */
import { useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { useSelector } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import { RootState } from '@/renderer/store';

export default function ThemeProvider({ children }) {
  const darkTheme = useSelector((state: RootState) => state.appScreen.darkTheme);
  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkTheme ? 'dark' : 'light',
          background: {
            default: darkTheme ? '#111111' : '#ffffff',
          },
        },
      }),
    [darkTheme],
  );

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <EmotionThemeProvider theme={muiTheme}>{children}</EmotionThemeProvider>
    </MuiThemeProvider>
  );
}
