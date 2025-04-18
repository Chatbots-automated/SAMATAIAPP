import { View, StyleSheet, ScrollView, Platform } from 'react-native';
import { Text, TextInput, Button, Card, SegmentedButtons, Portal, Modal, IconButton } from 'react-native-paper';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import MaterialInput from '@/components/MaterialInput';
import { useEstimateStore } from '@/store/estimateStore';
import { EstimateFormData, Material, Labor } from '@/types/estimate';
import { spacing, theme, borderRadius } from '@/constants/theme';
import { generatePDF } from '@/utils/pdfGenerator';

const initialMaterial: Material = {
  id: '1',
  name: '',
  pricePerUnit: 0,
  quantity: 0,
  unit: 'piece',
};

export default function NewEstimate() {
  const router = useRouter();
  const { addEstimate } = useEstimateStore();
  const [showPreview, setShowPreview] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState<EstimateFormData>({
    projectName: '',
    clientName: '',
    materials: [initialMaterial],
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
  });

  const handleAddMaterial = () => {
    setFormData((prev) => ({
      ...prev,
      materials: [
        ...prev.materials,
        {
          ...initialMaterial,
          id: Math.random().toString(36).substring(7),
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

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const estimate = addEstimate(formData);
      
      if (Platform.OS === 'web') {
        const pdfBlob = await generatePDF(estimate);
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setPdfUrl(pdfUrl);
        setShowPreview(true);
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <IconButton
          icon={() => <ArrowLeft size={24} color={theme.colors.primary} />}
          onPress={() => router.back()}
          style={styles.backButton}
        />
        <Text variant="headlineMedium" style={styles.title}>
          New Estimate
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Create a detailed cost estimate for your project
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
          loading={isLoading}
          disabled={isLoading}
        >
          Create Estimate & Generate PDF
        </Button>
      </View>

      <Portal>
        <Modal
          visible={showPreview}
          onDismiss={() => setShowPreview(false)}
          contentContainerStyle={styles.modalContent}>
          <Text variant="titleLarge" style={styles.modalTitle}>
            Estimate PDF Preview
          </Text>
          {pdfUrl && (
            <iframe
              src={pdfUrl}
              style={{ width: '100%', height: '70vh', border: 'none' }}
            />
          )}
          <View style={styles.modalButtons}>
            <Button
              mode="outlined"
              onPress={() => setShowPreview(false)}
              style={styles.modalButton}>
              Close Preview
            </Button>
            <Button
              mode="contained"
              onPress={() => {
                if (pdfUrl) {
                  const link = document.createElement('a');
                  link.href = pdfUrl;
                  link.download = `estimate-${formData.projectName}.pdf`;
                  link.click();
                }
              }}
              style={styles.modalButton}>
              Download PDF
            </Button>
          </View>
        </Modal>
      </Portal>
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
  backButton: {
    position: 'absolute',
    left: spacing.sm,
    top: spacing.sm,
    zIndex: 1,
  },
  title: {
    fontFamily: 'Inter_600SemiBold',
    color: theme.colors.onSurface,
    textAlign: 'center',
    marginTop: spacing.md,
  },
  subtitle: {
    color: theme.colors.outline,
    marginTop: spacing.xs,
    textAlign: 'center',
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
  modalContent: {
    backgroundColor: theme.colors.surface,
    padding: spacing.lg,
    margin: spacing.md,
    borderRadius: borderRadius.lg,
    maxWidth: 800,
    width: '90%',
    alignSelf: 'center',
  },
  modalTitle: {
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.md,
    gap: spacing.md,
  },
  modalButton: {
    flex: 1,
  },
});