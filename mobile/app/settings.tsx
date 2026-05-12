import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Text } from '@/components/Text';
import { Card } from '@/components/Card';
import { colors, fonts, radii } from '@/constants/theme';
import { loadProfile, resetOnboarding } from '@/components/storage';

export default function SettingsScreen() {
  const router = useRouter();
  const [name, setName] = useState('Maya Reyes');
  const [intent, setIntent] = useState('focus');
  const [switches, setSwitches] = useState({ daily: true, evening: true, mood: false });

  useEffect(() => {
    loadProfile().then((p) => {
      setName(p.name);
      setIntent(p.intent);
    });
  }, []);

  const initial = name.charAt(0).toUpperCase();
  const intentLabel = intent.charAt(0).toUpperCase() + intent.slice(1);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.head}>
        <Pressable onPress={() => router.back()} style={styles.close}>
          <Text style={{ color: colors.ink2 }}>×</Text>
        </Pressable>
        <Text variant="eyebrow">Profile · settings</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.profile}>
          <View style={styles.avatar}>
            <Text style={{ color: colors.cream, fontFamily: fonts.serif, fontSize: 24 }}>{initial}</Text>
          </View>
          <View>
            <Text variant="h2">{name}</Text>
            <Text variant="eyebrow" style={{ marginTop: 4 }}>Member since · May 2026</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          {[
            { l: 'Streak', v: '9', s: 'd' },
            { l: 'Rituals', v: '42', s: '' },
            { l: 'Minutes', v: '218', s: '' },
          ].map((s) => (
            <Card key={s.l} style={styles.statCard}>
              <Text variant="eyebrow">{s.l}</Text>
              <Text style={styles.statVal}>{s.v}<Text variant="mono"> {s.s}</Text></Text>
            </Card>
          ))}
        </View>

        <Text variant="eyebrow" style={styles.section}>Reminders</Text>
        <Card style={{ padding: 0 }}>
          <Row label="Daily reset · 8:30 am"
               on={switches.daily}
               onToggle={() => setSwitches({ ...switches, daily: !switches.daily })} />
          <Row label="Tonight's wind-down · 9:00 pm"
               on={switches.evening}
               onToggle={() => setSwitches({ ...switches, evening: !switches.evening })} />
          <Row label="Mood check-in"
               on={switches.mood}
               onToggle={() => setSwitches({ ...switches, mood: !switches.mood })}
               last />
        </Card>

        <Text variant="eyebrow" style={styles.section}>Connected</Text>
        <Card style={{ padding: 0 }}>
          <Row label="Apple Health" right="connected" />
          <Row label="Spotify · soundscapes" right="connect" />
          <Row label="Default intention" right={intentLabel} last />
        </Card>

        <Text variant="eyebrow" style={styles.section}>Data</Text>
        <Card style={{ padding: 0 }}>
          <Row label="Export mood + ritual history" right="→" />
          <Row
            label="Replay onboarding"
            right="→"
            last
            onPress={async () => {
              await resetOnboarding();
              router.replace('/onboarding');
            }}
          />
        </Card>

        <View style={styles.danger}>
          <Pressable>
            <Text variant="eyebrow">Sign out</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Row({
  label,
  right,
  on,
  onToggle,
  onPress,
  last,
}: {
  label: string;
  right?: string;
  on?: boolean;
  onToggle?: () => void;
  onPress?: () => void;
  last?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.row, !last && styles.rowDivider]}>
      <Text style={{ color: colors.ink, fontSize: 14 }}>{label}</Text>
      {on !== undefined ? (
        <Pressable onPress={onToggle}>
          <View
            style={[
              styles.switch,
              on && { backgroundColor: colors.ink },
            ]}>
            <View
              style={[
                styles.switchKnob,
                on && { transform: [{ translateX: 16 }] },
              ]}
            />
          </View>
        </Pressable>
      ) : (
        <Text variant="mono" style={{ color: colors.mute }}>{right}</Text>
      )}
    </Pressable>
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
    width: 36, height: 36, borderRadius: 18,
    borderWidth: 1, borderColor: colors.line2,
    alignItems: 'center', justifyContent: 'center',
  },
  scroll: { padding: 22, paddingBottom: 60 },
  profile: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 14 },
  avatar: {
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: colors.focus,
    alignItems: 'center', justifyContent: 'center',
  },
  statsRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  statCard: { flex: 1 },
  statVal: { fontFamily: fonts.serif, fontSize: 22, marginTop: 4 },
  section: { marginTop: 16, marginBottom: 8 },
  row: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingVertical: 14, paddingHorizontal: 16,
  },
  rowDivider: { borderBottomWidth: 1, borderBottomColor: colors.line },
  switch: {
    width: 36, height: 20, borderRadius: 999,
    backgroundColor: colors.paper2, padding: 2,
  },
  switchKnob: { width: 16, height: 16, borderRadius: 8, backgroundColor: colors.cream },
  danger: { alignItems: 'center', paddingTop: 22 },
});
