import { StyleSheet, View, ViewProps } from 'react-native';
import { colors, radii } from '@/constants/theme';

export function Card({ style, children, ...rest }: ViewProps) {
  return (
    <View {...rest} style={[styles.card, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cream,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radii.xl,
    padding: 16,
  },
});
