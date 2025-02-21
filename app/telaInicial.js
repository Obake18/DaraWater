// HomeScreen.js
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';

const WATER_GOAL = 2000; // meta de 2000 ml
const GLASS_SIZES = [200, 300, 500]; // valores em ml

export default function telaInicial() {
  const [waterIntake, setWaterIntake] = useState(0);
  // Valor animado para preencher o progresso (0 a 1)
  const waterProgress = useRef(new Animated.Value(0)).current;
  // Animação de "bounce" quando a meta é atingida
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Calcula o progresso (não ultrapassa 1)
    const progress = Math.min(waterIntake / WATER_GOAL, 1);
    Animated.timing(waterProgress, {
      toValue: progress,
      duration: 500,
      useNativeDriver: false, // animação de largura não suporta useNativeDriver
    }).start();

    // Se a meta for atingida, dispara uma animação de escala
    if (progress === 1) {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 300,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 300,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [waterIntake]);

  const addWater = (amount) => {
    setWaterIntake((prev) => Math.min(prev + amount, WATER_GOAL));
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho com ícone */}
      <View style={styles.header}>
        <Image
          source={require('./assets/icon.png')}
          style={styles.icon}
          resizeMode="contain"
        />
        <Text style={styles.title}>Lembrete de Hidratação</Text>
      </View>

      {/* Exibição da meta e progresso */}
      <View style={styles.progressContainer}>
        <Text style={styles.goalText}>Meta: {WATER_GOAL} ml</Text>
        <View style={styles.progressBarBackground}>
          <Animated.View
            style={[
              styles.progressBarFill,
              {
                width: waterProgress.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
                transform: [{ scale: scaleAnim }],
              },
            ]}
          />
        </View>
        <Text style={styles.intakeText}>Consumido: {waterIntake} ml</Text>
      </View>

      {/* Copos com tamanhos diferentes */}
      <View style={styles.glassesContainer}>
        {GLASS_SIZES.map((size, index) => (
          <TouchableOpacity
            key={index}
            style={styles.glassButton}
            onPress={() => addWater(size)}
          >
            <Text style={styles.glassText}>{size} ml</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F7FA',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00796B',
    marginTop: 5,
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  goalText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#004D40',
  },
  progressBarBackground: {
    width: '100%',
    height: 30,
    backgroundColor: '#B2DFDB',
    borderRadius: 15,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#00796B',
    borderRadius: 15,
  },
  intakeText: {
    marginTop: 10,
    fontSize: 16,
    color: '#004D40',
  },
  glassesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  glassButton: {
    backgroundColor: '#00796B',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  glassText: {
    color: '#fff',
    fontSize: 16,
  },
});
