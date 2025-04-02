import { View, StyleSheet } from 'react-native';
import { TextInput, IconButton } from 'react-native-paper';
import { Plus, Minus } from 'lucide-react-native';
import { Material } from '@/types/estimate';
import { spacing } from '@/constants/theme';

interface MaterialInputProps {
  material: Material;
  onUpdate: (material: Material) => void;
  onRemove: () => void;
  isLast: boolean;
  onAdd: () => void;
}

export default function MaterialInput({
  material,
  onUpdate,
  onRemove,
  isLast,
  onAdd,
}: MaterialInputProps) {
  return (
    <View style={styles.container}>
      <TextInput
        label="Material Name"
        value={material.name}
        onChangeText={(text) => onUpdate({ ...material, name: text })}
        mode="outlined"
        style={styles.input}
      />

      <View style={styles.row}>
        <TextInput
          label="Price per Unit (€)"
          value={material.pricePerUnit.toString()}
          onChangeText={(text) =>
            onUpdate({ ...material, pricePerUnit: parseFloat(text) || 0 })
          }
          mode="outlined"
          keyboardType="numeric"
          style={[styles.input, styles.halfWidth]}
        />

        <TextInput
          label="Quantity"
          value={material.quantity.toString()}
          onChangeText={(text) =>
            onUpdate({ ...material, quantity: parseFloat(text) || 0 })
          }
          mode="outlined"
          keyboardType="numeric"
          style={[styles.input, styles.halfWidth]}
        />
      </View>

      <View style={styles.actions}>
        <IconButton
          icon={() => <Minus size={20} />}
          mode="contained-tonal"
          onPress={onRemove}
        />
        {isLast && (
          <IconButton
            icon={() => <Plus size={20} />}
            mode="contained-tonal"
            onPress={onAdd}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  input: {
    marginBottom: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  halfWidth: {
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.sm,
  },
});