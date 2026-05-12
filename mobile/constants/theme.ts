/**
 * Happie design tokens — mirrors the web prototype.
 * Single source of truth for colors, typography, spacing, radii.
 */

export const colors = {
  paper: '#F5EFE2',
  paper2: '#EDE5D2',
  cream: '#FBF7EE',
  ink: '#2A231A',
  ink2: '#4A3F31',
  mute: '#8C8170',
  mute2: '#B6A998',
  line: 'rgba(42, 35, 26, 0.08)',
  line2: 'rgba(42, 35, 26, 0.14)',

  // intention accents
  focus: '#D87A5C',
  energize: '#E8A85B',
  unwind: '#9C8AB8',
  recover: '#7FA68C',
} as const;

export const fonts = {
  serif: 'Fraunces_360',
  serifItalic: 'Fraunces_360Italic',
  sans: 'Inter_400Regular',
  sansMedium: 'Inter_500Medium',
  sansSemi: 'Inter_600SemiBold',
  mono: 'JetBrainsMono_400Regular',
} as const;

export const radii = {
  sm: 10,
  md: 14,
  lg: 18,
  xl: 22,
  pill: 999,
} as const;

export const spacing = {
  xxs: 4,
  xs: 6,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 22,
  xxl: 28,
} as const;

export type Intention = 'focus' | 'energize' | 'unwind' | 'recover';

export const accentFor = (i: Intention): string => colors[i];
