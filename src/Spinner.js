import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

const TICK_COUNT = 12;

export default function Spinner({ size = 64, tickColor = '#0D0D0D' }) {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const tickW = Math.max(2, size * 0.05);
  const tickH = size * 0.28;

  return (
    <Animated.View
      style={{ width: size, height: size, transform: [{ rotate }] }}
    >
      {Array.from({ length: TICK_COUNT }).map((_, i) => {
        const angle = (i / TICK_COUNT) * 360;
        const opacity = 1 - (i / TICK_COUNT) * 0.92;
        return (
          <View
            key={i}
            style={[
              styles.tick,
              {
                width: tickW,
                height: tickH,
                borderRadius: tickW,
                backgroundColor: tickColor,
                opacity,
                left: size / 2 - tickW / 2,
                top: 0,
                transform: [
                  { translateY: size / 2 - tickH },
                  { rotate: `${angle}deg` },
                  { translateY: -(size / 2 - tickH) },
                ],
              },
            ]}
          />
        );
      })}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  tick: { position: 'absolute' },
});
