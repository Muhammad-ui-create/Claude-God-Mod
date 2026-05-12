import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { colors, fonts } from '@/constants/theme';

const Icon = ({ name, color }: { name: string; color: string }) => {
  const stroke = { stroke: color, strokeWidth: 1.6, fill: 'none', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch (name) {
    case 'today':
      return (
        <Svg width={22} height={22} viewBox="0 0 24 24">
          <Circle cx={12} cy={12} r={9} {...stroke} />
          <Path d="M12 7v5l3 2" {...stroke} />
        </Svg>
      );
    case 'library':
      return (
        <Svg width={22} height={22} viewBox="0 0 24 24">
          <Path d="M4 5a2 2 0 0 1 2-2h5v18H6a2 2 0 0 1-2-2zM13 3h5a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5z" {...stroke} />
        </Svg>
      );
    case 'mood':
      return (
        <Svg width={22} height={22} viewBox="0 0 24 24">
          <Path d="M3 17l5-5 4 4 8-9" {...stroke} />
          <Path d="M14 7h7v7" {...stroke} />
        </Svg>
      );
    case 'shop':
      return (
        <Svg width={22} height={22} viewBox="0 0 24 24">
          <Path d="M5 7h14l-1.4 11.2A2 2 0 0 1 15.6 20H8.4a2 2 0 0 1-2-1.8z" {...stroke} />
          <Path d="M9 7V5a3 3 0 0 1 6 0v2" {...stroke} />
        </Svg>
      );
  }
  return null;
};

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.ink,
        tabBarInactiveTintColor: colors.mute,
        tabBarLabelStyle: {
          fontFamily: fonts.mono,
          fontSize: 9.5,
          letterSpacing: 1.2,
          textTransform: 'uppercase',
          marginBottom: 4,
        },
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({ color }) => <Icon name={route.name} color={color} />,
      })}>
      <Tabs.Screen name="today" options={{ title: 'Today' }} />
      <Tabs.Screen name="library" options={{ title: 'Library' }} />
      <Tabs.Screen name="mood" options={{ title: 'Mood' }} />
      <Tabs.Screen name="shop" options={{ title: 'Shop' }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.paper,
    borderTopColor: colors.line,
    borderTopWidth: 1,
    paddingTop: 6,
    height: 84,
  },
});
