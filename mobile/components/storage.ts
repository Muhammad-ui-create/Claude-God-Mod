import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Intention } from '@/constants/theme';

const K = {
  onboarded: 'happie.onboarded',
  name: 'happie.name',
  intent: 'happie.intent',
  time: 'happie.time',
};

export async function loadProfile() {
  const [onboarded, name, intent, time] = await Promise.all([
    AsyncStorage.getItem(K.onboarded),
    AsyncStorage.getItem(K.name),
    AsyncStorage.getItem(K.intent),
    AsyncStorage.getItem(K.time),
  ]);
  return {
    onboarded: onboarded === '1',
    name: name || 'Maya',
    intent: (intent as Intention) || 'focus',
    time: time || 'morning',
  };
}

export async function saveProfile(p: {
  name: string;
  intent: Intention;
  time: string;
}) {
  await Promise.all([
    AsyncStorage.setItem(K.name, p.name),
    AsyncStorage.setItem(K.intent, p.intent),
    AsyncStorage.setItem(K.time, p.time),
    AsyncStorage.setItem(K.onboarded, '1'),
  ]);
}

export async function resetOnboarding() {
  await AsyncStorage.removeItem(K.onboarded);
}
