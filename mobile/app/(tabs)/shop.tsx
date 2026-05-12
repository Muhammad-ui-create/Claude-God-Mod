import { Linking, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '@/components/Text';
import { Card } from '@/components/Card';
import { accentFor, colors, radii } from '@/constants/theme';
import type { Intention } from '@/constants/theme';

type Flavor = {
  intention: Intention;
  mushroom: string;
  name: string;
  italic: string;
  desc: string;
  channel: string;
  url: string;
};

const FLAVORS: Flavor[] = [
  {
    intention: 'focus',
    mushroom: "Focus · lion's mane",
    name: 'Citrus',
    italic: 'Hum',
    desc: "Bergamot, yuzu, a little quiet under the noise.",
    channel: 'drinkhappie.com',
    url: 'https://drinkhappie.com',
  },
  {
    intention: 'energize',
    mushroom: 'Energize · cordyceps',
    name: 'Ginger',
    italic: 'Spark',
    desc: 'Ginger, lime, the start of a useful sentence.',
    channel: 'Amazon',
    url: 'https://amazon.com',
  },
  {
    intention: 'unwind',
    mushroom: 'Unwind · reishi',
    name: 'Lavender',
    italic: 'Hush',
    desc: "Lavender, plum, an exhale you didn't know you needed.",
    channel: 'TikTok Shop',
    url: 'https://tiktok.com',
  },
  {
    intention: 'recover',
    mushroom: 'Recover · chaga',
    name: 'Cacao',
    italic: 'Earth',
    desc: 'Cacao, cinnamon, a soft landing at the end of the week.',
    channel: 'drinkhappie.com',
    url: 'https://drinkhappie.com',
  },
];

export default function ShopScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text variant="eyebrow">Stock your ritual</Text>
        <Text variant="display" style={{ marginTop: 8 }}>
          Four flavors, <Text variant="display" italic style={{ color: colors.energize }}>four states</Text>.
        </Text>
        <Text variant="body" style={{ marginTop: 10, marginBottom: 18 }}>
          Each can pairs with one of your daily intentions. Reorder where you already shop.
        </Text>

        {FLAVORS.map((f) => (
          <Pressable
            key={f.name}
            onPress={() => Linking.openURL(f.url)}
            style={styles.flavorWrap}>
            <Card style={styles.flavor}>
              <View style={[styles.can, { backgroundColor: accentFor(f.intention) }]} />
              <View style={{ flex: 1 }}>
                <Text variant="eyebrow" style={{ color: accentFor(f.intention) }}>{f.mushroom}</Text>
                <Text variant="h2" style={{ marginTop: 2 }}>
                  {f.name} <Text variant="h2" italic>{f.italic}</Text>
                </Text>
                <Text variant="body" style={{ marginTop: 6 }}>{f.desc}</Text>
                <View style={styles.row}>
                  <Text variant="mono">12 pack · $42</Text>
                  <Text variant="eyebrow">{f.channel}</Text>
                </View>
              </View>
            </Card>
          </Pressable>
        ))}

        <Text variant="eyebrow" style={{ marginTop: 6, marginBottom: 10 }}>Reorder from</Text>
        <View style={styles.channels}>
          {[
            { lbl: 'Direct', name: 'drinkhappie.com', url: 'https://drinkhappie.com' },
            { lbl: 'Marketplace', name: 'Amazon', url: 'https://amazon.com' },
            { lbl: 'Social', name: 'TikTok Shop', url: 'https://tiktok.com' },
          ].map((c) => (
            <Pressable key={c.name} onPress={() => Linking.openURL(c.url)} style={styles.channel}>
              <Text variant="eyebrow">{c.lbl}</Text>
              <Text variant="h2" style={{ fontSize: 14, marginTop: 4 }}>{c.name}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.paper },
  scroll: { padding: 22, paddingBottom: 60 },
  flavorWrap: { marginBottom: 12 },
  flavor: { flexDirection: 'row', gap: 14, alignItems: 'center' },
  can: { width: 88, height: 120, borderRadius: 14 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  channels: { flexDirection: 'row', gap: 8 },
  channel: {
    flex: 1,
    backgroundColor: colors.cream,
    borderWidth: 1,
    borderColor: colors.line2,
    borderRadius: radii.md,
    padding: 12,
    alignItems: 'center',
  },
});
