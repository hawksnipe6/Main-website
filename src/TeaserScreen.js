import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Animated,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Spinner from './Spinner';

const { width: W } = Dimensions.get('window');
const scale = (n) => (W / 390) * n;

export default function TeaserScreen() {
  const labelOpacity   = useRef(new Animated.Value(0)).current;
  const line1Opacity   = useRef(new Animated.Value(0)).current;
  const line1Y         = useRef(new Animated.Value(40)).current;
  const line2Opacity   = useRef(new Animated.Value(0)).current;
  const line2Y         = useRef(new Animated.Value(40)).current;
  const spinnerOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(labelOpacity, {
        toValue: 1, duration: 700, delay: 200, useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(line1Opacity, {
          toValue: 1, duration: 800, useNativeDriver: true,
        }),
        Animated.timing(line1Y, {
          toValue: 0, duration: 800, useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(line2Opacity, {
          toValue: 1, duration: 800, useNativeDriver: true,
        }),
        Animated.timing(line2Y, {
          toValue: 0, duration: 800, useNativeDriver: true,
        }),
      ]),
      Animated.timing(spinnerOpacity, {
        toValue: 1, duration: 500, useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const fontSize    = scale(86);
  const spinnerSize = scale(68);
  const lineHeight  = fontSize * 0.9;

  return (
    <ImageBackground
      source={require('../assets/bg.jpg')}
      style={styles.root}
      resizeMode="cover"
    >
      <StatusBar style="light" />

      {/* Dark overlay so text reads clearly */}
      <View style={styles.overlay} />

      {/* Label */}
      <Animated.Text style={[styles.label, { opacity: labelOpacity }]}>
        Nocturnal
      </Animated.Text>

      {/* Headline + Spinner */}
      <View style={styles.textBlock}>
        <View style={{ overflow: 'hidden', height: lineHeight }}>
          <Animated.Text
            style={[
              styles.headline,
              { fontSize, lineHeight },
              { opacity: line1Opacity, transform: [{ translateY: line1Y }] },
            ]}
            allowFontScaling={false}
          >
            Design
          </Animated.Text>
        </View>

        <View style={{ overflow: 'hidden', height: lineHeight }}>
          <Animated.Text
            style={[
              styles.headline,
              { fontSize, lineHeight },
              { opacity: line2Opacity, transform: [{ translateY: line2Y }] },
            ]}
            allowFontScaling={false}
          >
            Intelligence
          </Animated.Text>
        </View>

        {/* Spinner centred over text */}
        <Animated.View
          style={[
            styles.spinnerAnchor,
            { opacity: spinnerOpacity, marginTop: -(lineHeight + spinnerSize / 2) },
          ]}
        >
          <Spinner size={spinnerSize} tickColor="#FFFFFF" />
        </Animated.View>
      </View>

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(13, 13, 13, 0.52)',
  },
  label: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 64 : 44,
    fontWeight: '500',
    fontSize: scale(12),
    letterSpacing: 2,
    color: 'rgba(255,255,255,0.6)',
    textTransform: 'uppercase',
  },
  textBlock: {
    alignItems: 'center',
    position: 'relative',
  },
  headline: {
    fontWeight: '800',
    color: '#E8612A',
    letterSpacing: -3,
    textAlign: 'center',
    ...Platform.select({
      web: { filter: 'blur(13px)' },
      default: {},
    }),
  },
  spinnerAnchor: {
    alignSelf: 'center',
  },
});
