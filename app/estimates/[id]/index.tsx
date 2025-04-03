import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEstimateStore } from '@/store/estimateStore';
import { spacing, theme, borderRadius } from '@/constants/theme';

export default function EstimateDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { estimates } = useEstimateStore();
  const estimate = estimates.find(e => e.id === id);

  if (!estimate) {
    return (
      <View style={styles.container}>
        <Text variant="headlineMedium" style={styles.errorText}>
          Estimate not found
        </Text>
        <Button
          mode="contained"
          onPress={() => router.back()}
          style={styles.button}
        >
          Go Back
        </Button>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>
          {estimate.projectName}
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Created on {new Date(estimate.createdAt).toLocaleDateString()}
        </Text>
      </View>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Project Details
          </Text>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Client:</Text>
            <Text style={styles.value}>{estimate.clientName || 'N/A'}</Text>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Materials
          </Text>
          {estimate.materials.map((material) => (
            <View key={material.id} style={styles.materialItem}>
              <Text style={styles.materialName}>{material.name}</Text>
              <View style={styles.materialDetails}>
                <Text style={styles.materialQuantity}>
                  {material.quantity} {material.unit}
                </Text>
                <Text style={styles.materialPrice}>
                  €{material.pricePerUnit} per unit
                </Text>
                <Text style={styles.materialTotal}>
                  €{(material.quantity * material.pricePerUnit).toFixed(2)}
                </Text>
              </View>
            </View>
          ))}
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Labor
          </Text>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Type:</Text>
            <Text style={styles.value}>
              {estimate.labor.rateType === 'hourly' ? 'Hourly Rate' : 'Fixed Price'}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Rate:</Text>
            <Text style={styles.value}>€{estimate.labor.rate}/hour</Text>
          </View>
          {estimate.labor.rateType === 'hourly' && (
            <View style={styles.detailRow}>
              <Text style={styles.label}>Hours:</Text>
              <Text style={styles.value}>{estimate.labor.hours}</Text>
            </View>
          )}
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Dimensions
          </Text>
          <View style={styles.dimensionsGrid}>
            <View style={styles.dimensionItem}>
              <Text style={styles.dimensionLabel}>Length</Text>
              <Text style={styles.dimensionValue}>
                {estimate.dimensions?.length || 0} cm
              </Text>
            </View>
            <View style={styles.dimensionItem}>
              <Text style={styles.dimensionLabel}>Width</Text>
              <Text style={styles.dimensionValue}>
                {estimate.dimensions?.width || 0} cm
              </Text>
            </View>
            <View style={styles.dimensionItem}>
              <Text style={styles.dimensionLabel}>Height</Text>
              <Text style={styles.dimensionValue}>
                {estimate.dimensions?.height || 0} cm
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      <Card style={[styles.card, styles.totalCard]}>
        <Card.Content>
          <View style={styles.totalRow}>
            <Text variant="titleLarge" style={styles.totalLabel}>
              Total Cost:
            </Text>
            <Text variant="headlineMedium" style={styles.totalAmount}>
              €{estimate.totalCost.toLocaleString()}
            </Text>
          </View>
          <Text style={styles.taxNote}>
            Including {estimate.taxRate}% tax
          </Text>
        </Card.Content>
      </Card>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => router.push(`/estimates/${id}/edit`)}
          style={styles.button}
        >
          Edit Estimate
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
    marginBottom: 0,
    elevation: 2,
    borderRadius: borderRadius.lg,
  },
  sectionTitle: {
    marginBottom: spacing.md,
    fontFamily: 'Inter_600SemiBold',
    color: theme.colors.onSurface,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  label: {
    color: theme.colors.outline,
    flex: 1,
  },
  value: {
    flex: 2,
    textAlign: 'right',
  },
  materialItem: {
    marginBottom: spacing.md,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.outlineVariant,
  },
  materialName: {
    fontFamily: 'Inter_600SemiBold',
    marginBottom: spacing.xs,
  },
  materialDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  materialQuantity: {
    color: theme.colors.outline,
  },
  materialPrice: {
    color: theme.colors.outline,
  },
  materialTotal: {
    fontFamily: 'Inter_500Medium',
  },
  dimensionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dimensionItem: {
    alignItems: 'center',
    flex: 1,
  },
  dimensionLabel: {
    color: theme.colors.outline,
    marginBottom: spacing.xs,
  },
  dimensionValue: {
    fontFamily: 'Inter_500Medium',
    fontSize: 16,
  },
  totalCard: {
    marginBottom: spacing.md,
    backgroundColor: theme.colors.primaryContainer,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontFamily: 'Inter_600SemiBold',
    color: theme.colors.primary,
  },
  totalAmount: {
    fontFamily: 'Inter_700Bold',
    color: theme.colors.primary,
  },
  taxNote: {
    color: theme.colors.outline,
    fontSize: 12,
    marginTop: spacing.xs,
    textAlign: 'right',
  },
  buttonContainer: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  button: {
    padding: spacing.xs,
  },
  errorText: {
    textAlign: 'center',
    marginBottom: spacing.md,
  },
});