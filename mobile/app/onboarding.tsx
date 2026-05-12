import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Text } from '@/components/Text';
import { accentFor, colors, fonts, radii } from '@/constants/theme';
import type { Intention } from '@/constants/theme';
import { INTENTIONS } from '@/constants/intentions';
import { saveProfile } from '@/components/storage';

const STEPS = 5;
const TIMES = [
  { key: 'early',   when: 'Early',    time: '7:00 am' },
  { key: 'morning', when: 'Morning',  time: '8:30 am' },
  { key: 'lunch',   when: 'Lunch',    time: '12:30 pm' },
  { key: 'evening', when: 'Evening',  time: '9:00 pm' },
];
const INTENT_ORDER: Intention[] = ['focus', 'energize', 'unwind', 'recover'];

export default function Onboarding() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [intent, setIntent] = useState<Intention>('focus');
  const [time, setTime] = useState('morning');

  async function finish() {
    await saveProfile({ name: name || 'Maya', intent, time });
    router.replace('/(tabs)/today');
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.head}>
        <View style={styles.progress}>
          {Array.from({ length: STEPS }, (_, i) => (
            <View
              key={i}
              style={[styles.tick, i <= step && { backgroundColor: colors.ink }]}
            />
          ))}
        </View>
        <Pressable onPress={finish}>
          <Text variant="eyebrow">Skip</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        {step === 0 && (
          <>
            <Text variant="eyebrow">welcome</Text>
            <Text variant="display" style={{ marginTop: 12 }}>
              A 5-minute reset,{' '}
              <Text variant="display" italic style={{ color: colors.focus }}>built for you</Text>.
            </Text>
            <Text variant="body" style={{ marginTop: 14 }}>
              Pick how you want to feel today. We'll handle the breath, the stretch, and the prompt.
            </Text>
          </>
        )}

        {step === 1 && (
          <>
            <Text variant="eyebrow">first things first</Text>
            <Text variant="display" style={{ marginTop: 12 }}>
              What should we{' '}
              <Text variant="display" italic style={{ color: colors.focus }}>call you</Text>?
            </Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Type your name"
              placeholderTextColor={colors.mute2}
              autoFocus
              style={styles.input}
            />
          </>
        )}

        {step === 2 && (
          <>
            <Text variant="eyebrow">choose a default</Text>
            <Text variant="display" style={{ marginTop: 12 }}>
              Most days, you want to{' '}
              <Text variant="display" italic style={{ color: colors.focus }}>feel</Text>...
            </Text>
            <View style={styles.grid}>
              {INTENT_ORDER.map((i) => {
                const active = intent === i;
                return (
                  <Pressable
                    key={i}
                    onPress={() => setIntent(i)}
                    style={[
                      styles.intent,
                      active && { borderColor: accentFor(i) },
                    ]}>
                    <View
                      style={[
                        styles.intentGlyph,
                        active && { backgroundColor: accentFor(i) },
                      ]}>
                      <Text style={{ color: active ? colors.cream : colors.ink2, fontSize: 18 }}>
                        {INTENTIONS[i].emoji}
                      </Text>
                    </View>
                    <View>
                      <Text variant="h2" style={{ fontSize: 17 }}>{INTENTIONS[i].label}</Text>
                      <Text variant="eyebrow" style={{ marginTop: 2 }}>
                        {i === 'focus' && "deep work"}
                        {i === 'energize' && 'go-mode'}
                        {i === 'unwind' && 'wind down'}
                        {i === 'recover' && 'soft mode'}
                      </Text>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </>
        )}

        {step === 3 && (
          <>
            <Text variant="eyebrow">a gentle nudge</Text>
            <Text variant="display" style={{ marginTop: 12 }}>
              When should we{' '}
              <Text variant="display" italic style={{ color: colors.focus }}>remind you</Text>?
            </Text>
            <Text variant="body" style={{ marginTop: 12 }}>
              One push notification a day. Change it any time.
            </Text>
            <View style={styles.timeGrid}>
              {TIMES.map((t) => {
                const active = time === t.key;
                return (
                  <Pressable
                    key={t.key}
                    onPress={() => setTime(t.key)}
                    style={[
                      styles.timeOpt,
                      active && { backgroundColor: colors.ink, borderColor: colors.ink },
                    ]}>
                    <Text
                      variant="eyebrow"
                      style={{ color: active ? colors.mute2 : colors.mute }}>
                      {t.when}
                    </Text>
                    <Text
                      style={{
                        fontFamily: fonts.serif,
                        fontSize: 20,
                        color: active ? colors.cream : colors.ink,
                        marginTop: 4,
                      }}>
                      {t.time}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </>
        )}

        {step === 4 && (
          <View style={{ alignItems: 'center' }}>
            <View style={styles.check}>
              <Text style={{ color: colors.cream, fontSize: 32 }}>✓</Text>
            </View>
            <Text variant="eyebrow">all set</Text>
            <Text variant="display" style={{ marginTop: 8, textAlign: 'center' }}>
              You're in,{' '}
              <Text variant="display" italic style={{ color: colors.focus }}>
                {(name || 'friend').split(' ')[0]}
              </Text>.
            </Text>
            <Text variant="body" style={{ marginTop: 12, textAlign: 'center' }}>
              Your first reset is waiting on the Today tab.
            </Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.foot}>
        <Pressable
          onPress={() => (step < STEPS - 1 ? setStep(step + 1) : finish())}
          style={styles.cta}>
          <Text style={{ color: colors.paper, fontWeight: '500' }}>
            {step === STEPS - 1 ? 'Start your first reset →' : 'Continue →'}
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
    gap: 14,
    paddingHorizontal: 28,
    paddingTop: 12,
  },
  progress: { flex: 1, flexDirection: 'row', gap: 4 },
  tick: { flex: 1, height: 3, borderRadius: 2, backgroundColor: colors.paper2 },
  body: { padding: 28, paddingTop: 36 },
  input: {
    marginTop: 28,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.line2,
    fontFamily: fonts.serif,
    fontSize: 22,
    color: colors.ink,
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 24 },
  intent: {
    width: '48%',
    backgroundColor: colors.cream,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radii.lg,
    padding: 14,
    gap: 16,
  },
  intentGlyph: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: colors.paper2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 22 },
  timeOpt: {
    width: '48%',
    padding: 14,
    borderRadius: radii.md,
    backgroundColor: colors.cream,
    borderWidth: 1,
    borderColor: colors.line,
  },
  check: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 24,
  },
  foot: { paddingHorizontal: 28, paddingBottom: 32 },
  cta: {
    backgroundColor: colors.ink,
    borderRadius: radii.pill,
    paddingVertical: 16,
    alignItems: 'center',
  },
});
