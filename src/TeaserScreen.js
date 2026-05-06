import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Animated,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import { useFonts } from 'expo-font';
import Spinner from './Spinner';

const { width: W, height: H } = Dimensions.get('window');

// Responsive scale — base is 390px wide (iPhone 14)
const scale = (n) => (W / 390) * n;

export default function TeaserScreen() {
  const [fontsLoaded] = useFonts({
    'HostGrotesk-Regular':  require('../assets/fonts/HostGrotesk-Regular.ttf'),
    'HostGrotesk-Medium':   require('../assets/fonts/HostGrotesk-Medium.ttf'),
    'HostGrotesk-ExtraBold':require('../assets/fonts/HostGrotesk-ExtraBold.ttf'),
  });

  // Animated values
  const labelOpacity    = useRef(new Animated.Value(0)).current;
  const line1Opacity    = useRef(new Animated.Value(0)).current;
  const line1Translate  = useRef(new Animated.Value(30)).current;
  const line2Opacity    = useRef(new Animated.Value(0)).current;
  const line2Translate  = useRef(new Animated.Value(30)).current;
  const spinnerOpacity  = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!fontsLoaded) return;

    Animated.sequence([
      // Label fade in
      Animated.timing(labelOpacity, {
        toValue: 1, duration: 600, delay: 300, useNativeDriver: true,
      }),
      // Line 1 slides up
      Animated.parallel([
        Animated.timing(line1Opacity, {
          toValue: 1, duration: 900, useNativeDriver: true,
        }),
        Animated.timing(line1Translate, {
          toValue: 0, duration: 900, useNativeDriver: true,
        }),
      ]),
      // Line 2 slides up
      Animated.parallel([
        Animated.timing(line2Opacity, {
          toValue: 1, duration: 900, useNativeDriver: true,
        }),
        Animated.timing(line2Translate, {
          toValue: 0, duration: 900, useNativeDriver: true,
        }),
      ]),
      // Spinner fades in
      Animated.timing(spinnerOpacity, {
        toValue: 1, duration: 500, useNativeDriver: true,
      }),
    ]).start();
  }, [fontsLoaded]);

  if (!fontsLoaded) return <View style={styles.root} />;

  const fontSize   = scale(88);
  const spinnerSize = scale(72);

  return (
    <View style={styles.root}>

      {/* Label */}
      <Animated.Text style={[styles.label, { opacity: labelOpacity }]}>
        Nocturnal
      </Animated.Text>

      {/* Headline block */}
      <View style={styles.textBlock}>

        {/* Line 1 */}
        <View style={styles.lineClip}>
          <Animated.Text
            style={[
              styles.headline,
              { fontSize },
              { opacity: line1Opacity, transform: [{ translateY: line1Translate }] },
            ]}
            allowFontScaling={false}
          >
            Design
          </Animated.Text>
        </View>

        {/* Line 2 */}
        <View style={styles.lineClip}>
          <Animated.Text
            style={[
              styles.headline,
              { fontSize },
              { opacity: line2Opacity, transform: [{ translateY: line2Translate }] },
            ]}
            allowFontScaling={false}
          >
            Intelligence
          </Animated.Text>
        </View>

        {/* Spinner centred over text */}
        <Animated.View style={[styles.spinnerAnchor, { opacity: spinnerOpacity }]}>
          <Spinner size={spinnerSize} />
        </Animated.View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F5F4F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    fontFamily: 'HostGrotesk-Medium',
    fontSize: scale(12),
    letterSpacing: 1.5,
    color: '#AAAAAA',
    textTransform: 'uppercase',
  },
  textBlock: {
    alignItems: 'center',
    position: 'relative',
  },
  lineClip: {
    overflow: 'hidden',
    lineHeight: scale(80),
  },
  headline: {
    fontFamily: 'HostGrotesk-ExtraBold',
    color: '#E8612A',
    letterSpacing: scale(-3.5),
    lineHeight: undefined,
    // Persistent blur — blurRadius only works on Image in RN
    // We simulate it via opacity layering on web, native uses shadow
    ...Platform.select({
      web: { filter: 'blur(14px)' },
      default: { opacity: 0.92 }, // native fallback — full blur not supported on text in RN
    }),
    textAlign: 'center',
  },
  spinnerAnchor: {
    position: 'absolute',
    alignSelf: 'center',
    top: '50%',
    marginTop: -scale(36),
  },
});
