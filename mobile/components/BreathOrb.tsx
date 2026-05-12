import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from './Text';
import { colors, fonts } from '@/constants/theme';

const PHASES = ['inhale', 'hold', 'exhale', 'hold'] as const;
const PHASE_MS = 2000;

export function BreathOrb({ accent }: { accent: string }) {
  const scale = useSharedValue(0.78);
  const phase = useSharedValue(0);

  useEffect(() => {
    scale.value = withRepeat(
      withTiming(1, { duration: PHASE_MS * 2, easing: Easing.inOut(Easing.cubic) }),
      -1,
      true,
    );
    const id = setInterval(() => {
      phase.value = (phase.value + 1) % 4;
    }, PHASE_MS);
    return () => clearInterval(id);
  }, [scale, phase]);

  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <View style={styles.wrap}>
      <Animated.View style={[styles.orb, animStyle]}>
        <LinearGradient
          colors={[accent, mix(accent, colors.ink, 0.55)]}
          style={StyleSheet.absoluteFill as any}
          start={{ x: 0.2, y: 0.1 }}
          end={{ x: 1, y: 1 }}
        />
        <Text style={styles.label}>inhale</Text>
      </Animated.View>
      <Text variant="eyebrow" style={styles.cadence}>
        in 4 · hold 4 · out 4 · hold 4
      </Text>
    </View>
  );
}

function mix(hex: string, other: string, t: number) {
  // tiny blend helper — good enough for a gradient
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
  wrap: { alignItems: 'center', justifyContent: 'center' },
  orb: {
    width: 240,
    height: 240,
    borderRadius: 120,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.ink,
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.25,
    shadowRadius: 40,
    elevation: 8,
  },
  label: {
    color: colors.cream,
    fontFamily: fonts.serif,
    fontSize: 24,
  },
  cadence: { marginTop: 24, textAlign: 'center' },
});
