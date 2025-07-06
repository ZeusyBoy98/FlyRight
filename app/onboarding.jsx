import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';

const featureList = [
  {
    image: require('../assets/images/1.png'),
  },
  {
    image: require('../assets/images/2.png'),
  },
  {
    image: require('../assets/images/3.png'),
  },
  {
    image: require('../assets/images/4.png'),
  },
  {
    image: require('../assets/images/5.png'),
  },
];

export default function Onboarding() {
  const [currentFeature, setCurrentFeature] = useState(0);
  const router = useRouter();

  const handleNext = () => {
    if (currentFeature < featureList.length - 1) {
      setCurrentFeature(currentFeature + 1);
    } else {
      router.replace('/(tabs)/settings');
    }
  };

  return (
    <ImageBackground
      key={currentFeature}
      source={featureList[currentFeature].image}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>
            {currentFeature === featureList.length - 1 ? 'Start Using FlyRight' : 'Continue'}
          </Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
        {featureList.map((_, index) => (
          <View
            key={index}
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              marginHorizontal: 4,
              backgroundColor: index === currentFeature ? '#fff' : '#888',
            }}
          />
        ))}
      </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  slider: {
    flexDirection: 'row',
    height: '100%',
  },
  background: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    padding: 30,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  button: {
    backgroundColor: '#0a84ff',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
});