import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Text } from '@/components/Text';
import { IntentionPicker } from '@/components/IntentionPicker';
import { RitualHero } from '@/components/RitualHero';
import { Card } from '@/components/Card';
import { colors, accentFor, fonts } from '@/constants/theme';
import type { Intention } from '@/constants/theme';
import { INTENTIONS, RITUALS, ritualsByIntention } from '@/constants/intentions';
import { loadProfile } from '@/components/storage';

export default function TodayScreen() {
  const router = useRouter();
  const [intent, setIntent] = useState<Intention>('focus');
  const [name, setName] = useState('Maya');

  useEffect(() => {
    loadProfile().then((p) => {
      setIntent(p.intent);
      setName(p.name);
    });
  }, []);

  const ritual = ritualsByIntention(intent)[0] ?? RITUALS[0];
  const first = name.split(' ')[0];

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.greet}>
          <View style={{ flex: 1 }}>
            <Text variant="eyebrow">Hi, {first} · Mon 12 May</Text>
            <Text variant="display" style={{ marginTop: 6 }}>
              Today's <Text variant="display" italic style={{ color: accentFor(intent) }}>reset</Text>.
            </Text>
          </View>
          <Pressable
            onPress={() => router.push('/settings')}
            style={styles.avatar}>
            <Text style={{ color: colors.cream, fontFamily: fonts.serif, fontSize: 14 }}>
              {first.charAt(0).toUpperCase()}
            </Text>
          </Pressable>
        </View>

        <IntentionPicker value={intent} onChange={setIntent} />

        <RitualHero
          ritual={ritual}
          onStart={() => router.push({ pathname: '/ritual', params: { id: ritual.id } })}
          onSeeAll={() => router.push({ pathname: '/(tabs)/library' })}
        />

        <Card style={styles.sip}>
          <View style={[styles.can, { backgroundColor: accentFor(intent) }]} />
          <View style={{ flex: 1 }}>
            <Text variant="eyebrow">Pair with a sip</Text>
            <Text variant="body" style={{ color: colors.ink, marginTop: 2 }}>
              {ritual.sipName}
            </Text>
          </View>
          <Text variant="eyebrow">Skip</Text>
        </Card>

        <View style={styles.stats}>
          <Card style={styles.stat}>
            <Text variant="eyebrow">Streak</Text>
            <Text variant="h1" style={{ marginTop: 2 }}>9</Text>
            <Text variant="mono" style={{ color: colors.mute }}>days in a row</Text>
          </Card>
          <Card style={styles.stat}>
            <Text variant="eyebrow">This week</Text>
            <Text variant="h1" style={{ marginTop: 2 }}>38<Text variant="mono">m</Text></Text>
            <Text variant="mono" style={{ color: colors.mute }}>across 6 sessions</Text>
          </Card>
        </View>

        <Card style={styles.tonight}>
          <View>
            <Text variant="h2">Tonight's wind-down</Text>
            <Text variant="eyebrow" style={{ marginTop: 4 }}>
              {INTENTIONS.unwind.label} · 10 min
            </Text>
          </View>
          <Text variant="eyebrow">→</Text>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.paper },
  scroll: { padding: 22, paddingBottom: 60 },
  greet: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 14 },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sip: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 12 },
  can: { width: 56, height: 56, borderRadius: 14 },
  stats: { flexDirection: 'row', gap: 10, marginBottom: 12 },
  stat: { flex: 1 },
  tonight: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
});
