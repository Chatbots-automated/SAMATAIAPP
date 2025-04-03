import { Tabs } from 'expo-router';
import { CirclePlus as PlusCircle, ListOrdered, Settings } from 'lucide-react-native';
import { useTheme } from 'react-native-paper';
import { Stack } from 'expo-router';

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Stack>
      <Stack.Screen 
        name="index"
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen 
        name="new-estimate"
        options={{
          headerTitle: "New Estimate",
          headerStyle: {
            backgroundColor: theme.colors.surface,
          },
          headerTintColor: theme.colors.primary,
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen 
        name="saved-estimates"
        options={{
          headerTitle: "Saved Estimates",
          headerStyle: {
            backgroundColor: theme.colors.surface,
          },
          headerTintColor: theme.colors.primary,
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen 
        name="settings"
        options={{
          headerTitle: "Settings",
          headerStyle: {
            backgroundColor: theme.colors.surface,
          },
          headerTintColor: theme.colors.primary,
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
}