import { Text as RNText, TextProps, StyleSheet } from 'react-native';
import { colors, fonts } from '@/constants/theme';

type Variant = 'display' | 'h1' | 'h2' | 'body' | 'meta' | 'mono' | 'eyebrow';

export function Text({
  variant = 'body',
  italic,
  style,
  children,
  ...rest
}: TextProps & { variant?: Variant; italic?: boolean }) {
  return (
    <RNText
      {...rest}
      style={[
        styles.base,
        styles[variant],
        italic && { fontFamily: fonts.serifItalic, fontStyle: 'italic' },
        style,
      ]}>
      {children}
    </RNText>
  );
}

const styles = StyleSheet.create({
  base: { color: colors.ink, fontFamily: fonts.sans },
  display: {
    fontFamily: fonts.serif,
    fontSize: 34,
    lineHeight: 36,
    letterSpacing: -1,
  },
  h1: {
    fontFamily: fonts.serif,
    fontSize: 30,
    lineHeight: 32,
    letterSpacing: -0.8,
  },
  h2: {
    fontFamily: fonts.serif,
    fontSize: 22,
    lineHeight: 26,
    letterSpacing: -0.5,
  },
  body: { fontSize: 14, lineHeight: 22, color: colors.ink2 },
  meta: {
    fontFamily: fonts.mono,
    fontSize: 10,
    letterSpacing: 1.6,
    color: colors.mute,
    textTransform: 'uppercase',
  },
  mono: {
    fontFamily: fonts.mono,
    fontSize: 11,
    color: colors.ink2,
  },
  eyebrow: {
    fontFamily: fonts.mono,
    fontSize: 10,
    letterSpacing: 1.8,
    color: colors.mute,
    textTransform: 'uppercase',
  },
});
