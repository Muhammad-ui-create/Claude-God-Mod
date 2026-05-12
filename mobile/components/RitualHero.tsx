import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from './Text';
import { accentFor, colors, radii } from '@/constants/theme';
import type { Ritual } from '@/constants/intentions';

export function RitualHero({
  ritual,
  onStart,
  onSeeAll,
}: {
  ritual: Ritual;
  onStart: () => void;
  onSeeAll: () => void;
}) {
  const accent = accentFor(ritual.intention);
  return (
    <View style={[styles.card, { borderColor: colors.line }]}>
      <View style={styles.row}>
        <View style={styles.meta}>
          <View style={[styles.swatch, { backgroundColor: accent }]} />
          <Text variant="eyebrow">
            {ritual.intention.toUpperCase()} · {ritual.durationMin} min
          </Text>
        </View>
        <Text variant="eyebrow">today</Text>
      </View>

      <Text variant="h2" style={styles.title}>
        {ritual.title}
      </Text>

      <View style={styles.steps}>
        {ritual.steps.map((s, i) => (
          <View key={i} style={styles.step}>
            <Text variant="mono" style={{ color: colors.mute }}>
              0{i + 1}
            </Text>
            <Text variant="body" style={{ flex: 1, color: colors.ink2 }}>
              {s.name}
            </Text>
            <Text variant="mono" style={{ color: colors.mute }}>
              {s.duration}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.ctaRow}>
        <Text variant="eyebrow">Best before noon</Text>
        <Pressable
          onPress={onStart}
          style={[styles.btn, { backgroundColor: accent }]}>
          <Text style={{ color: colors.cream, fontWeight: '500' }}>
            Begin · {ritual.durationMin} min →
          </Text>
        </Pressable>
      </View>

      <Pressable onPress={onSeeAll} style={styles.seeAll}>
        <Text variant="eyebrow" style={{ color: colors.ink2 }}>
          Browse all rituals
        </Text>
        <Text variant="eyebrow">→</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cream,
    borderWidth: 1,
    borderRadius: 26,
    padding: 20,
    marginBottom: 12,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  swatch: { width: 10, height: 10, borderRadius: 5 },
  title: { marginBottom: 16 },
  steps: { gap: 4, marginBottom: 18 },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 6,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.line,
  },
  ctaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btn: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: radii.pill,
  },
  seeAll: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 14,
    marginTop: 14,
    borderTopWidth: 1,
    borderTopColor: colors.line,
    borderStyle: 'dashed',
  },
});
