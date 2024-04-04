import { Text } from '@rneui/themed';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Restaurant } from '@_types/Restaurant';
interface Props {
  items: Restaurant[];
  onIndexChange: (index: number) => void;
  itemHeight: number;
}

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export const RandomItemSelect: React.FC<Props> = props => {
  const { items: originalItems, onIndexChange, itemHeight } = props;
  const scrollY = useRef(new Animated.Value(0)).current;

  // Duplicate the items array 100 times to create an infinite scroll effect
  // const items = React.useMemo(
  //   () => Array.from({ length: 3 }, () => originalItems).flat(),
  //   [originalItems]
  // );

  const items = React.useMemo(
    () => Array.from({ length: 3 }, () => shuffleArray(originalItems)).flat(),
    [originalItems],
  );

  const startAnimation = () => {
    // const randomIndex = Math.floor(Math.random() * originalItems.length);
    const randomIndex = 30;

    Animated.sequence([
      Animated.timing(scrollY, {
        toValue: -(randomIndex * itemHeight + itemHeight / 2),
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.decay(scrollY, {
        velocity: -7,
        deceleration: 0.6,
        useNativeDriver: true,
      }),
    ]).start(() => {
      const finalIndex =
        Math.round(-scrollY._value / itemHeight) % originalItems.length;
      onIndexChange(finalIndex);
    });
  };

  // Start the animation when the component mounts
  useEffect(() => {
    startAnimation();
  }, [originalItems, itemHeight]);

  return (
    <View style={{ height: itemHeight * 3, overflow: 'hidden', width: '100%' }}>
      <Animated.View
        style={{
          transform: [{ translateY: scrollY }],
          height: itemHeight * items.length,
          justifyContent: 'center',
          paddingTop: itemHeight + itemHeight,
        }}>
        {items.map((item, index) => (
          <View
            key={index}
            style={{
              height: itemHeight,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.itemText}>{item.place_name}</Text>
          </View>
        ))}
      </Animated.View>
      {/* border box */}
      <View
        style={{
          position: 'absolute',
          top: itemHeight,
          left: 0,
          right: 0,
          height: itemHeight + 5,
          borderColor: 'black',
          borderWidth: 2,
          borderRadius: 5,
          marginLeft: 5,
          marginRight: 5,
        }}
      />
      {/* 그라데이션 */}
      <LinearGradient
        colors={[
          'rgba(255, 255, 255, 0.8)',
          'rgba(255, 255, 255, 0)',
          'rgba(255, 255, 255, 0.8)',
        ]}
        style={styles.gradient}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemText: {
    fontSize: 24,
    justifyContent: 'center',
    paddingLeft: 15,
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
