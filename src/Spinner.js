import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

const TICK_COUNT = 12;
const TICK_COLOR = '#0D0D0D';

export default function Spinner({ size = 64 }) {
  const animations = useRef(
    Array.from({ length: TICK_COUNT }, () => new Animated.Value(0))
  ).current;

  useEffect(() => {
    const duration = 1000;
    const interval = duration / TICK_COUNT;

    const loops = animations.map((anim, i) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(i * interval),
          Animated.timing(anim, {
            toValue: 1,
            duration: 0,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: duration,
            useNativeDriver: true,
          }),
        ])
      );
    });

    loops.forEach(l => l.start());
    return () => loops.forEach(l => l.stop());
  }, []);

  const tickW = Math.max(2, size * 0.045);
  const tickH = size * 0.28;
  const radius = size / 2 - tickH / 2;

  return (
    <View style={{ width: size, height: size }}>
      {animations.map((anim, i) => {
        const angle = (i / TICK_COUNT) * 2 * Math.PI;
        const baseOpacity = 1 - (i / TICK_COUNT) * 0.95;
        const x = size / 2 + radius * Math.sin(angle) - tickW / 2;
        const y = size / 2 - radius * Math.cos(angle) - tickH / 2;

        const opacity = anim.interpolate({
          inputRange: [0, 1],
          outputRange: [baseOpacity, 1],
        });

        return (
          <Animated.View
            key={i}
            style={[
              styles.tick,
              {
                width: tickW,
                height: tickH,
                left: x,
                top: y,
                borderRadius: tickW,
                backgroundColor: TICK_COLOR,
                opacity,
                transform: [
                  { translateX: tickW / 2 },
                  { translateY: tickH / 2 },
                  { rotate: `${(i / TICK_COUNT) * 360}deg` },
                  { translateX: -tickW / 2 },
                  { translateY: -tickH / 2 },
                ],
              },
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tick: {
    position: 'absolute',
  },
});
