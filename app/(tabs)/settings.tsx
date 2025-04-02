import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, TextInput, Switch, Button } from 'react-native-paper';
import { useState } from 'react';
import { spacing, theme, borderRadius } from '@/constants/theme';

export default function Settings() {
  const [defaultTaxRate, setDefaultTaxRate] = useState('20');
  const [defaultLaborRate, setDefaultLaborRate] = useState('45');
  const [currency, setCurrency] = useState('€');
  const [darkMode, setDarkMode] = useState(false);
  const [businessName, setBusinessName] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');
  const [businessPhone, setBusinessPhone] = useState('');

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>
          Settings
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Customize your app preferences
        </Text>
      </View>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Default Values
          </Text>

          <TextInput
            label="Default Tax Rate (%)"
            value={defaultTaxRate}
            onChangeText={setDefaultTaxRate}
            mode="outlined"
            keyboardType="numeric"
            style={styles.input}
          />

          <TextInput
            label="Default Labor Rate (€/hour)"
            value={defaultLaborRate}
            onChangeText={setDefaultLaborRate}
            mode="outlined"
            keyboardType="numeric"
            style={styles.input}
          />

          <TextInput
            label="Currency Symbol"
            value={currency}
            onChangeText={setCurrency}
            mode="outlined"
            style={styles.input}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Business Information
          </Text>

          <TextInput
            label="Business Name"
            value={businessName}
            onChangeText={setBusinessName}
            mode="outlined"
            style={styles.input}
          />

          <TextInput
            label="Business Email"
            value={businessEmail}
            onChangeText={setBusinessEmail}
            mode="outlined"
            keyboardType="email-address"
            style={styles.input}
          />

          <TextInput
            label="Business Phone"
            value={businessPhone}
            onChangeText={setBusinessPhone}
            mode="outlined"
            keyboardType="phone-pad"
            style={styles.input}
          />

          <Button
            mode="contained-tonal"
            onPress={() => {}}
            style={styles.uploadButton}
            icon="image"
          >
            Upload Business Logo
          </Button>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Appearance
          </Text>

          <View style={styles.switchContainer}>
            <Text variant="bodyLarge">Dark Mode</Text>
            <Switch value={darkMode} onValueChange={setDarkMode} />
          </View>
        </Card.Content>
      </Card>

      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={() => {}} style={styles.button}>
          Save Settings
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: spacing.md,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.outlineVariant,
  },
  title: {
    fontFamily: 'Inter_600SemiBold',
    color: theme.colors.onSurface,
  },
  subtitle: {
    color: theme.colors.outline,
    marginTop: spacing.xs,
  },
  card: {
    margin: spacing.md,
    marginBottom: spacing.sm,
    elevation: 2,
    borderRadius: borderRadius.lg,
  },
  sectionTitle: {
    marginBottom: spacing.md,
    fontFamily: 'Inter_600SemiBold',
    color: theme.colors.onSurface,
  },
  input: {
    marginBottom: spacing.md,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  uploadButton: {
    marginTop: spacing.sm,
  },
  buttonContainer: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  button: {
    padding: spacing.xs,
  },
});