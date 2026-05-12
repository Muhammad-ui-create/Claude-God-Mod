import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Defs, LinearGradient, Stop, Path, Circle, Line, G } from 'react-native-svg';
import { Text } from '@/components/Text';
import { Card } from '@/components/Card';
import { accentFor, colors, radii } from '@/constants/theme';

const MOODS = ['◌', '◔', '◐', '◕', '●'];

export default function MoodScreen() {
  const [selected, setSelected] = useState(2);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text variant="eyebrow">Daily check-in</Text>
        <Text variant="display" style={{ marginTop: 8 }}>
          How are you, <Text variant="display" italic style={{ color: colors.unwind }}>really</Text>?
        </Text>
        <Text variant="body" style={{ marginTop: 8, marginBottom: 18 }}>
          One tap, twice a day. We'll spot the pattern.
        </Text>

        <Card>
          <View style={styles.row}>
            <Text variant="eyebrow">This morning</Text>
            <Text variant="eyebrow">07:42 — tap to log</Text>
          </View>
          <Text variant="h2" style={{ marginTop: 12, marginBottom: 16 }}>
            Pick the one that <Text variant="h2" italic style={{ color: colors.focus }}>fits</Text>.
          </Text>
          <View style={styles.moods}>
            {MOODS.map((m, i) => (
              <Pressable
                key={i}
                onPress={() => setSelected(i)}
                style={[
                  styles.mood,
                  i === selected && { backgroundColor: colors.ink },
                ]}>
                <Text style={{
                  fontSize: 22,
                  color: i === selected ? colors.cream : colors.ink2,
                }}>{m}</Text>
              </Pressable>
            ))}
          </View>
        </Card>

        <Card style={{ marginTop: 12 }}>
          <View style={styles.row}>
            <Text variant="eyebrow">Mood trend</Text>
            <Text variant="eyebrow">past 7 days</Text>
          </View>
          <Text variant="h2" style={{ marginTop: 12, marginBottom: 14 }}>
            Steady week. Mornings dipping.
          </Text>
          <Svg width="100%" height={140} viewBox="0 0 280 140" preserveAspectRatio="none">
            <Defs>
              <LinearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0" stopColor={colors.focus} stopOpacity="0.22" />
                <Stop offset="1" stopColor={colors.focus} stopOpacity="0" />
              </LinearGradient>
            </Defs>
            <G stroke="rgba(42,35,26,0.08)" strokeDasharray="2 4">
              <Line x1="0" y1="35" x2="280" y2="35" />
              <Line x1="0" y1="70" x2="280" y2="70" />
              <Line x1="0" y1="105" x2="280" y2="105" />
            </G>
            <Path
              d="M10,80 C40,60 60,50 80,55 C110,62 130,40 160,46 C190,52 210,72 240,60 C260,52 270,68 270,68 L270,140 L10,140 Z"
              fill="url(#g)"
            />
            <Path
              d="M10,80 C40,60 60,50 80,55 C110,62 130,40 160,46 C190,52 210,72 240,60 C260,52 270,68 270,68"
              fill="none"
              stroke={colors.focus}
              strokeWidth={2}
              strokeLinecap="round"
            />
            <Circle cx={270} cy={68} r={5} fill={colors.ink} />
          </Svg>
        </Card>

        <Card style={[styles.recommend, { borderColor: colors.line }]}>
          <View style={[styles.recommendGlyph, { backgroundColor: colors.focus }]}>
            <Text style={{ color: colors.cream, fontSize: 18 }}>◎</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text variant="eyebrow">Recommended for today</Text>
            <Text variant="h2" style={{ marginTop: 4 }}>
              Lean into <Text variant="h2" italic style={{ color: colors.focus }}>focus</Text>. Your mornings have been quiet.
            </Text>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.paper },
  scroll: { padding: 22, paddingBottom: 60 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  moods: { flexDirection: 'row', gap: 6, justifyContent: 'space-between' },
  mood: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: radii.md,
    backgroundColor: colors.paper2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recommend: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'center',
    marginTop: 12,
  },
  recommendGlyph: {
    width: 50,
    height: 50,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
