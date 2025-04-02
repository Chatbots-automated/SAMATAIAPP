import { MD3LightTheme } from 'react-native-paper';

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#0891B2',
    primaryContainer: '#CFFAFE',
    secondary: '#0E7490',
    secondaryContainer: '#E0F2FE',
    tertiary: '#0369A1',
    tertiaryContainer: '#DBEAFE',
    background: '#F8FAFC',
    surface: '#FFFFFF',
    surfaceVariant: '#F1F5F9',
    error: '#DC2626',
    errorContainer: '#FEE2E2',
    success: '#16A34A',
    successContainer: '#DCFCE7',
    outline: '#64748B',
    outlineVariant: '#CBD5E1',
  },
  fonts: {
    ...MD3LightTheme.fonts,
    regular: {
      fontFamily: 'Inter_400Regular',
    },
    medium: {
      fontFamily: 'Inter_500Medium',
    },
    bold: {
      fontFamily: 'Inter_700Bold',
    },
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  full: 9999,
};