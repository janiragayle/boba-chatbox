'use client'
import { createTheme, ThemeProvider } from "@mui/material";
import theme from "./theme";

const newTheme = createTheme(theme)

export default function RootLayout({ children }) {
  return (
    <ThemeProvider theme={newTheme}>
      <html lang="en">
        <head> 
          <title>AI Chatbot</title>
        </head>
        <body>{children}</body>
      </html>
    </ThemeProvider>
  );
}