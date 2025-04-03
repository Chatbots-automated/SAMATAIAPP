import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, TextInput, Button, Card, SegmentedButtons } from 'react-native-paper';
import { useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import MaterialInput from '@/components/MaterialInput';
import { useEstimateStore } from '@/store/estimateStore';
import { EstimateFormData, Material, Labor } from '@/types/estimate';
import { spacing, theme, borderRadius } from '@/constants/theme';

export default function EditEstimate() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { estimates, updateEstimate } = useEstimateStore();
  const existingEstimate = estimates.find(e => e.id === id);

  const [formData, setFormData] = useState<EstimateFormData>(
    existingEstimate || {
      projectName: '',
      clientName: '',
      materials: [],
      labor: {
        rateType: 'hourly',
        rate: 0,
        hours: 0,
      },
      dimensions: {
        length: 0,
        width: 0,
        height: 0,
      },
      taxRate: 20,
      notes: '',
    }
  );

  if (!existingEstimate) {
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

  const handleAddMaterial = () => {
    setFormData((prev) => ({
      ...prev,
      materials: [
        ...prev.materials,
        {
          id: Math.random().toString(36).substring(7),
          name: '',
          pricePerUnit: 0,
          quantity: 0,
          unit: 'piece',
        },
      ],
    }));
  };

  const handleUpdateMaterial = (index: number, material: Material) => {
    setFormData((prev) => ({
      ...prev,
      materials: prev.materials.map((m, i) => (i === index ? material : m)),
    }));
  };

  const handleRemoveMaterial = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      materials: prev.materials.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = () => {
    updateEstimate(id, formData);
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>
          Edit Estimate
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Update estimate details
        </Text>
      </View>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Project Details
          </Text>

          <TextInput
            label="Project Name"
            value={formData.projectName}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, projectName: text }))
            }
            mode="outlined"
            style={styles.input}
          />

          <TextInput
            label="Client Name"
            value={formData.clientName}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, clientName: text }))
            }
            mode="outlined"
            style={styles.input}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Materials
          </Text>

          {formData.materials.map((material, index) => (
            <MaterialInput
              key={material.id}
              material={material}
              onUpdate={(updated) => handleUpdateMaterial(index, updated)}
              onRemove={() => handleRemoveMaterial(index)}
              isLast={index === formData.materials.length - 1}
              onAdd={handleAddMaterial}
            />
          ))}
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Labor
          </Text>

          <SegmentedButtons
            value={formData.labor.rateType}
            onValueChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                labor: { ...prev.labor, rateType: value as Labor['rateType'] },
              }))
            }
            buttons={[
              { value: 'hourly', label: 'Hourly Rate' },
              { value: 'fixed', label: 'Fixed Price' },
            ]}
            style={styles.segmentedButtons}
          />

          <View style={styles.row}>
            <TextInput
              label={formData.labor.rateType === 'hourly' ? 'Hourly Rate (€)' : 'Fixed Price (€)'}
              value={formData.labor.rate.toString()}
              onChangeText={(text) =>
                setFormData((prev) => ({
                  ...prev,
                  labor: { ...prev.labor, rate: parseFloat(text) || 0 },
                }))
              }
              mode="outlined"
              keyboardType="numeric"
              style={[styles.input, styles.halfWidth]}
            />

            {formData.labor.rateType === 'hourly' && (
              <TextInput
                label="Hours"
                value={formData.labor.hours?.toString()}
                onChangeText={(text) =>
                  setFormData((prev) => ({
                    ...prev,
                    labor: { ...prev.labor, hours: parseFloat(text) || 0 },
                  }))
                }
                mode="outlined"
                keyboardType="numeric"
                style={[styles.input, styles.halfWidth]}
              />
            )}
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Dimensions
          </Text>

          <View style={styles.row}>
            <TextInput
              label="Length (cm)"
              value={formData.dimensions?.length?.toString()}
              onChangeText={(text) =>
                setFormData((prev) => ({
                  ...prev,
                  dimensions: { ...prev.dimensions!, length: parseFloat(text) || 0 },
                }))
              }
              mode="outlined"
              keyboardType="numeric"
              style={[styles.input, styles.thirdWidth]}
            />

            <TextInput
              label="Width (cm)"
              value={formData.dimensions?.width?.toString()}
              onChangeText={(text) =>
                setFormData((prev) => ({
                  ...prev,
                  dimensions: { ...prev.dimensions!, width: parseFloat(text) || 0 },
                }))
              }
              mode="outlined"
              keyboardType="numeric"
              style={[styles.input, styles.thirdWidth]}
            />

            <TextInput
              label="Height (cm)"
              value={formData.dimensions?.height?.toString()}
              onChangeText={(text) =>
                setFormData((prev) => ({
                  ...prev,
                  dimensions: { ...prev.dimensions!, height: parseFloat(text) || 0 },
                }))
              }
              mode="outlined"
              keyboardType="numeric"
              style={[styles.input, styles.thirdWidth]}
            />
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Additional Details
          </Text>

          <TextInput
            label="Tax Rate (%)"
            value={formData.taxRate.toString()}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, taxRate: parseFloat(text) || 0 }))
            }
            mode="outlined"
            keyboardType="numeric"
            style={styles.input}
          />

          <TextInput
            label="Notes"
            value={formData.notes}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, notes: text }))
            }
            mode="outlined"
            multiline
            numberOfLines={4}
            style={styles.input}
          />
        </Card.Content>
      </Card>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={handleSubmit}
          style={styles.button}
        >
          Save Changes
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
  input: {
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  halfWidth: {
    flex: 1,
  },
  thirdWidth: {
    flex: 1,
  },
  segmentedButtons: {
    marginBottom: spacing.md,
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