export const theme = {
  colors: {
    saffron: {
      500: '#E47A2E',
      600: '#D97736',
    },
    indiaGreen: {
      500: '#2E8B57',
      600: '#187A3E',
    },
    ashokaBlue: {
      500: '#1A365D',
      600: '#102A4A',
    },
    background: {
      light: '#FDFBF7',
      dark: '#16171d',
    },
    text: {
      light: '#1F2937',
      dark: '#F3F4F6',
    }
  }
};

export const getThemeColors = (isDarkMode) => ({
  background: isDarkMode ? theme.colors.background.dark : theme.colors.background.light,
  text: isDarkMode ? theme.colors.text.dark : theme.colors.text.light,
  primary: isDarkMode ? theme.colors.saffron[600] : theme.colors.saffron[500],
  secondary: isDarkMode ? theme.colors.indiaGreen[600] : theme.colors.indiaGreen[500],
  accent: isDarkMode ? theme.colors.ashokaBlue[600] : theme.colors.ashokaBlue[500],
});
