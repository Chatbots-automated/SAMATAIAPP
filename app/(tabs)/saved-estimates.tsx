import { View, StyleSheet, ScrollView } from 'react-native';
import { Searchbar, Text } from 'react-native-paper';
import { useState } from 'react';
import { EstimateCard } from '@/components';
import { useEstimateStore } from '@/store/estimateStore';
import { spacing, theme } from '@/constants/theme';

export default function SavedEstimates() {
  const [searchQuery, setSearchQuery] = useState('');
  const { estimates } = useEstimateStore();

  const filteredEstimates = estimates.filter((estimate) =>
    estimate.projectName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>
          Saved Estimates
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          View and manage your saved estimates
        </Text>
      </View>

      <Searchbar
        placeholder="Search estimates"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
      />

      <ScrollView style={styles.content}>
        {filteredEstimates.length === 0 ? (
          <View style={styles.emptyState}>
            <Text variant="titleMedium" style={styles.emptyStateText}>
              No estimates found
            </Text>
            <Text variant="bodyMedium" style={styles.emptyStateSubtext}>
              {searchQuery
                ? 'Try adjusting your search terms'
                : 'Create your first estimate to get started'}
            </Text>
          </View>
        ) : (
          filteredEstimates.map((estimate) => (
            <EstimateCard key={estimate.id} estimate={estimate} />
          ))
        )}
      </ScrollView>
    </View>
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
  searchBar: {
    margin: spacing.md,
    elevation: 2,
  },
  content: {
    padding: spacing.md,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xxl,
  },
  emptyStateText: {
    fontFamily: 'Inter_600SemiBold',
    color: theme.colors.onSurface,
    marginBottom: spacing.xs,
  },
  emptyStateSubtext: {
    color: theme.colors.outline,
    textAlign: 'center',
  },
});