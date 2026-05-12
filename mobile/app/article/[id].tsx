import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Text } from '@/components/Text';
import { Card } from '@/components/Card';
import { accentFor, colors, radii } from '@/constants/theme';
import { ARTICLES } from '@/constants/articles';

export default function ArticleScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const article = ARTICLES[id ?? 'a1'];
  if (!article) return null;
  const accent = accentFor(article.accent);
  const paragraphs = article.body.split('\n\n');

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
        <LinearGradient
          colors={[accent, mix(accent, colors.ink, 0.55)]}
          start={{ x: 0.2, y: 0.1 }}
          end={{ x: 1, y: 1 }}
          style={styles.hero}>
          <View style={styles.heroTop}>
            <Pressable onPress={() => router.back()} style={styles.close}>
              <Text style={{ color: colors.cream }}>×</Text>
            </Pressable>
            <Text variant="eyebrow" style={{ color: 'rgba(251,247,238,0.7)' }}>
              {article.crumb}
            </Text>
            <View style={{ width: 36 }} />
          </View>
          <View>
            <Text variant="eyebrow" style={{ color: 'rgba(251,247,238,0.72)' }}>
              {article.eyebrow}
            </Text>
            <Text style={styles.title}>{article.title}</Text>
            <Text variant="eyebrow" style={{ color: 'rgba(251,247,238,0.78)', marginTop: 10 }}>
              {article.byline}
            </Text>
          </View>
        </LinearGradient>

        <View style={{ padding: 22 }}>
          <Card style={styles.audio}>
            <View style={[styles.play, { backgroundColor: colors.ink }]}>
              <Text style={{ color: colors.paper }}>▶</Text>
            </View>
            <View style={styles.track}>
              <View style={[styles.trackFill, { backgroundColor: accent }]} />
            </View>
            <Text variant="mono" style={{ color: colors.mute }}>01:18 / 04:12</Text>
          </Card>

          {paragraphs.map((p, i) => (
            <Text
              key={i}
              variant={i === 0 ? 'h2' : 'body'}
              style={{
                marginBottom: 14,
                color: i === 0 ? colors.ink : colors.ink2,
              }}>
              {p}
            </Text>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function mix(hex: string, other: string, t: number) {
  const parse = (h: string) => {
    const n = parseInt(h.replace('#', ''), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  };
  const [r1, g1, b1] = parse(hex);
  const [r2, g2, b2] = parse(other);
  const lerp = (a: number, b: number) => Math.round(a + (b - a) * t);
  return `rgb(${lerp(r1, r2)}, ${lerp(g1, g2)}, ${lerp(b1, b2)})`;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.paper },
  hero: { padding: 22, paddingTop: 60, minHeight: 280, justifyContent: 'space-between' },
  heroTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  close: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(251,247,238,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { fontFamily: 'Fraunces_360', color: colors.cream, fontSize: 26, lineHeight: 28, marginTop: 14 },
  audio: { flexDirection: 'row', gap: 12, alignItems: 'center', marginBottom: 22 },
  play: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  track: { flex: 1, height: 4, borderRadius: 2, backgroundColor: colors.paper2 },
  trackFill: { height: '100%', width: '32%', borderRadius: 2 },
});
