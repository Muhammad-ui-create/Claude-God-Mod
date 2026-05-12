import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Text } from '@/components/Text';
import { Card } from '@/components/Card';
import { accentFor, colors, fonts, radii } from '@/constants/theme';
import { ARTICLES } from '@/constants/articles';

const MUSHROOMS = [
  { id: 'lionsmane', name: "Lion's mane", for: "Focus · BDNF", accent: 'focus' as const, articleId: 'a1' },
  { id: 'cordyceps', name: 'Cordyceps', for: 'Energy · ATP', accent: 'energize' as const, articleId: 'a3' },
  { id: 'reishi',    name: 'Reishi',    for: 'Calm · cortisol', accent: 'unwind' as const, articleId: 'a2' },
  { id: 'chaga',     name: 'Chaga',     for: 'Immunity · antioxidant', accent: 'recover' as const, articleId: 'a1' },
];

export default function LibraryScreen() {
  const router = useRouter();
  const articles = Object.values(ARTICLES);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text variant="eyebrow">Mushroom 101</Text>
        <Text variant="display" style={{ marginTop: 8 }}>
          Read, watch, <Text variant="display" italic style={{ color: colors.focus }}>understand</Text>.
        </Text>
        <Text variant="body" style={{ marginTop: 8 }}>
          Short pieces on the four functional mushrooms behind every Happie ritual.
        </Text>

        <Card style={styles.cred}>
          <View style={styles.avatar} />
          <View>
            <Text variant="eyebrow">Edited by</Text>
            <Text variant="h2" style={{ marginTop: 2 }}>Dr. Veronica Jow</Text>
            <Text variant="mono" style={{ color: colors.ink2, marginTop: 2 }}>
              Functional medicine · MD, MS Nutrition
            </Text>
          </View>
        </Card>

        <View style={styles.grid}>
          {MUSHROOMS.map((m) => (
            <Pressable
              key={m.id}
              onPress={() => router.push({ pathname: '/article/[id]', params: { id: m.articleId } })}
              style={[styles.mush, { borderColor: colors.line }]}>
              <View style={[styles.mushDot, { backgroundColor: accentFor(m.accent) }]} />
              <View>
                <Text variant="h2" italic>{m.name}</Text>
                <Text variant="eyebrow" style={{ marginTop: 4 }}>{m.for}</Text>
              </View>
            </Pressable>
          ))}
        </View>

        <Text variant="eyebrow" style={{ marginBottom: 10 }}>Featured this week</Text>
        {articles.map((a) => (
          <Pressable
            key={a.id}
            onPress={() => router.push({ pathname: '/article/[id]', params: { id: a.id } })}
            style={styles.article}>
            <View style={{ flex: 1 }}>
              <Text variant="eyebrow">{a.eyebrow}</Text>
              <Text variant="h2" style={{ marginTop: 4 }}>{a.title}</Text>
              <Text variant="mono" style={{ color: colors.mute, marginTop: 6 }}>{a.byline}</Text>
            </View>
            <View style={[styles.play, { backgroundColor: accentFor(a.accent) }]}>
              <Text style={{ color: colors.cream }}>▶</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.paper },
  scroll: { padding: 22, paddingBottom: 60 },
  cred: { flexDirection: 'row', gap: 12, alignItems: 'center', marginTop: 18, marginBottom: 18 },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.focus },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 18 },
  mush: {
    width: '48%',
    aspectRatio: 1,
    backgroundColor: colors.cream,
    borderWidth: 1,
    borderRadius: radii.xl,
    padding: 14,
    justifyContent: 'space-between',
  },
  mushDot: { width: 30, height: 30, borderRadius: 8 },
  article: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    backgroundColor: colors.cream,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radii.lg,
    marginBottom: 8,
  },
  play: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
});
