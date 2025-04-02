import { Tabs } from 'expo-router';
import { CirclePlus as PlusCircle, ListOrdered, Settings } from 'lucide-react-native';
import { useTheme } from 'react-native-paper';

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.outline,
        tabBarStyle: {
          borderTopColor: theme.colors.outlineVariant,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        headerShown: true,
      }}>
      <Tabs.Screen
        name="new-estimate"
        options={{
          title: 'New Estimate',
          tabBarIcon: ({ color, size }) => (
            <PlusCircle size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="saved-estimates"
        options={{
          title: 'Saved Estimates',
          tabBarIcon: ({ color, size }) => (
            <ListOrdered size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Settings size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}