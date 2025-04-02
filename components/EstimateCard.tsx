import { View, StyleSheet, Pressable } from 'react-native';
import { Text, Card, IconButton } from 'react-native-paper';
import { Eye, Pencil, Copy, Trash2 } from 'lucide-react-native';
import { Estimate } from '@/types/estimate';
import { spacing, theme } from '@/constants/theme';
import { useRouter } from 'expo-router';
import { useEstimateStore } from '@/store/estimateStore';

interface EstimateCardProps {
  estimate: Estimate;
}

export default function EstimateCard({ estimate }: EstimateCardProps) {
  const router = useRouter();
  const { duplicateEstimate, deleteEstimate } = useEstimateStore();

  const handleView = () => {
    router.push(`/estimates/${estimate.id}`);
  };

  const handleEdit = () => {
    router.push(`/estimates/${estimate.id}/edit`);
  };

  const handleDuplicate = () => {
    duplicateEstimate(estimate.id);
  };

  const handleDelete = () => {
    deleteEstimate(estimate.id);
  };

  return (
    <Card style={styles.card}>
      <Pressable onPress={handleView}>
        <Card.Content style={styles.content}>
          <View style={styles.header}>
            <Text variant="titleLarge" style={styles.projectName}>
              {estimate.projectName}
            </Text>
            <Text variant="labelLarge" style={styles.date}>
              {new Date(estimate.createdAt).toLocaleDateString()}
            </Text>
          </View>

          <View style={styles.details}>
            <View style={styles.detailRow}>
              <Text variant="bodyMedium" style={styles.label}>
                Materials:
              </Text>
              <Text variant="bodyMedium">
                {estimate.materials.length} item
                {estimate.materials.length !== 1 ? 's' : ''}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Text variant="bodyMedium" style={styles.label}>
                Labor:
              </Text>
              <Text variant="bodyMedium">
                {estimate.labor.rateType === 'hourly'
                  ? `${estimate.labor.hours} hours`
                  : 'Fixed rate'}
              </Text>
            </View>

            <Text variant="headlineSmall" style={styles.total}>
              €{estimate.totalCost.toLocaleString()}
            </Text>
          </View>

          <View style={styles.actions}>
            <IconButton
              icon={() => <Eye size={20} />}
              onPress={handleView}
              mode="contained-tonal"
            />
            <IconButton
              icon={() => <Pencil size={20} />}
              onPress={handleEdit}
              mode="contained-tonal"
            />
            <IconButton
              icon={() => <Copy size={20} />}
              onPress={handleDuplicate}
              mode="contained-tonal"
            />
            <IconButton
              icon={() => <Trash2 size={20} />}
              onPress={handleDelete}
              mode="contained-tonal"
            />
          </View>
        </Card.Content>
      </Pressable>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.md,
    elevation: 2,
  },
  content: {
    padding: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  projectName: {
    fontFamily: 'Inter_600SemiBold',
    flex: 1,
  },
  date: {
    color: theme.colors.outline,
  },
  details: {
    marginBottom: spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  label: {
    color: theme.colors.outline,
  },
  total: {
    color: theme.colors.primary,
    fontFamily: 'Inter_700Bold',
    textAlign: 'right',
    marginTop: spacing.sm,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.sm,
  },
});