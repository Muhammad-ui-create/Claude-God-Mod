import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Text } from '@/components/Text';
import { BreathOrb } from '@/components/BreathOrb';
import { accentFor, colors, radii } from '@/constants/theme';
import { RITUALS } from '@/constants/intentions';

export default function RitualScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const ritual = RITUALS.find((r) => r.id === id) ?? RITUALS[0];
  const accent = accentFor(ritual.intention);
  const [step, setStep] = useState(0);
  const total = ritual.steps.length;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.head}>
        <Pressable onPress={() => router.back()} style={styles.close}>
          <Text style={{ color: colors.ink2 }}>×</Text>
        </Pressable>
        <Text variant="eyebrow">
          {ritual.steps[step].name} · step {step + 1} of {total}
        </Text>
        <View style={{ width: 36 }} />
      </View>

      <View style={styles.stage}>
        <BreathOrb accent={accent} />
      </View>

      <View style={styles.foot}>
        <View style={styles.progress}>
          {ritual.steps.map((_, i) => (
            <View
              key={i}
              style={[styles.tick, i <= step && { backgroundColor: accent }]}
            />
          ))}
        </View>
        <Text variant="h2" style={styles.prompt}>
          {ritual.prompts[step]}
        </Text>
        <Pressable
          onPress={() => (step < total - 1 ? setStep(step + 1) : router.back())}
          style={styles.cta}>
          <Text style={{ color: colors.paper, fontWeight: '500' }}>
            {step < total - 1 ? 'Next moment →' : 'Finish reset →'}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.paper },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  close: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.line2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stage: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  foot: { paddingHorizontal: 22, paddingBottom: 36, gap: 12 },
  progress: { flexDirection: 'row', gap: 4, marginBottom: 4 },
  tick: { flex: 1, height: 3, borderRadius: 2, backgroundColor: colors.paper2 },
  prompt: { textAlign: 'center', paddingHorizontal: 12 },
  cta: {
    backgroundColor: colors.ink,
    borderRadius: radii.pill,
    paddingVertical: 16,
    alignItems: 'center',
  },
});
