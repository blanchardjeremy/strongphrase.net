import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import './styles/fonts.css';
import App from './App';

import { CssBaseline, ThemeProvider } from '@mui/joy';
import theme from './theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>,
  </React.StrictMode>
);
