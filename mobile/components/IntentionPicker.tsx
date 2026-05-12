import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from './Text';
import { accentFor, colors, radii } from '@/constants/theme';
import type { Intention } from '@/constants/theme';
import { INTENTIONS } from '@/constants/intentions';

const ORDER: Intention[] = ['focus', 'energize', 'unwind', 'recover'];

export function IntentionPicker({
  value,
  onChange,
}: {
  value: Intention;
  onChange: (i: Intention) => void;
}) {
  return (
    <View style={styles.row}>
      {ORDER.map((i) => {
        const active = i === value;
        return (
          <Pressable
            key={i}
            onPress={() => onChange(i)}
            style={[
              styles.btn,
              active && { borderColor: accentFor(i), transform: [{ translateY: -2 }] },
            ]}>
            <View
              style={[
                styles.glyph,
                active && { backgroundColor: accentFor(i) },
              ]}>
              <Text style={{ color: active ? colors.cream : colors.ink2, fontSize: 16 }}>
                {INTENTIONS[i].emoji}
              </Text>
            </View>
            <Text variant="eyebrow">{INTENTIONS[i].label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 8, marginVertical: 12 },
  btn: {
    flex: 1,
    backgroundColor: colors.cream,
    borderColor: colors.line,
    borderWidth: 1,
    borderRadius: radii.lg,
    paddingVertical: 12,
    paddingHorizontal: 6,
    alignItems: 'center',
    gap: 6,
  },
  glyph: {
    width: 28,
    height: 28,
    borderRadius: 10,
    backgroundColor: colors.paper2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
