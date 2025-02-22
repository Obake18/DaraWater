import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const WATER_GOAL = 2000; // Exemplo de meta de 2000 ml

export default function TelaInicial() {
  const [waterIntake, setWaterIntake] = useState(0);

  // Função para adicionar água consumida
  const addWater = (amount) => {
    setWaterIntake((prev) => Math.min(prev + amount, WATER_GOAL));
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Image
          source={require('../assets/images/Dara/icon.png')}
          style={styles.icon}
          resizeMode="contain"
        />
        <Text style={styles.title}>Lembrete de Hidratação</Text>
      </View>

      {/* Exemplo de exibição de consumo */}
      <Text style={styles.intakeText}>Consumido: {waterIntake} ml</Text>

      {/* Botão para adicionar 200 ml */}
      <TouchableOpacity style={styles.button} onPress={() => addWater(200)}>
        <Text style={styles.buttonText}>+ 200 ml</Text>
      </TouchableOpacity>
    </View>
  );
}

// Estilos
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
  intakeText: {
    fontSize: 16,
    color: '#004D40',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#00796B',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
