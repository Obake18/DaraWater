import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';

const WATER_GOAL = 2000;

export default function TelaInicial() {
  const [waterIntake, setWaterIntake] = useState(0);

  const addWater = (amount) => {
    setWaterIntake((prev) => Math.min(prev + amount, WATER_GOAL));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Hidratação Diária</Text>
      <Image source={{ uri: 'https://www.dara.com.br/assets/logo.png' }} style={styles.logo} />
      <Text style={styles.text}>Meta de Água: {WATER_GOAL} ml</Text>
      <Progress.Bar progress={waterIntake / WATER_GOAL} width={200} />

      <Text style={styles.text}>Água Consumida: {waterIntake} ml</Text>

      <TouchableOpacity style={styles.button} onPress={() => addWater(250)}>
        <Text style={styles.buttonText}>Adicionar 250 ml</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
});
