import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { theme, spacing } from '@/constants/theme';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Welcome to Smart Estimate Pro
      </Text>
      <Text variant="bodyLarge" style={styles.subtitle}>
        Create and manage professional estimates with ease
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  title: {
    fontFamily: 'Inter_600SemiBold',
    color: theme.colors.onSurface,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    color: theme.colors.outline,
    textAlign: 'center',
  },
});