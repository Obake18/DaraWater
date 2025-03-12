import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-web';

// Função para calcular a meta de água baseada no peso e no objetivo
const calcularMetaDeAgua = (peso, objetivo) => {
  let base = peso * 20; // 20 ml por kg
  if (objetivo === 'atividade') {
    return peso * 30; // 30 ml por kg para quem faz atividade física
  } else if (objetivo === 'emagrecer') {
    return peso * 50; // 50 ml por kg para emagrecer
  }
  return base;
};

export default function InformacoesCorporais() {
  const [peso, setPeso] = useState('');
  const [objetivo, setObjetivo] = useState('');
  const [historico, setHistorico] = useState([]);
  const [aguaBebida, setAguaBebida] = useState(0);
  const [metaAgua, setMetaAgua] = useState(0);

  useEffect(() => {
    // Carregar os dados do AsyncStorage
    const carregarDados = async () => {
      try {
        const dados = await AsyncStorage.getItem('dadosHidratacao');
        if (dados) {
          const parsedData = JSON.parse(dados);
          setHistorico(parsedData.historico);
          setPeso(parsedData.peso);
          setObjetivo(parsedData.objetivo);
        }
      } catch (error) {
        console.error('Erro ao carregar os dados do AsyncStorage:', error);
      }
    };

    carregarDados();
  }, []);

  useEffect(() => {
    if (peso && objetivo) {
      const meta = calcularMetaDeAgua(Number(peso), objetivo);
      setMetaAgua(meta);
    }
  }, [peso, objetivo]);

  const salvarDados = async () => {
    try {
      const novoHistorico = [...historico, { aguaBebida, data: new Date().toLocaleDateString() }];
      const dadosParaSalvar = {
        peso,
        objetivo,
        historico: novoHistorico,
      };
      await AsyncStorage.setItem('dadosHidratacao', JSON.stringify(dadosParaSalvar));
      setHistorico(novoHistorico);
      setAguaBebida(0); // Resetando a água bebida após salvar os dados
    } catch (error) {
      console.error('Erro ao salvar os dados no AsyncStorage:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Informações de Hidratação</Text>

      {/* Peso */}
      <TextInput
        style={styles.input}
        placeholder="Digite seu peso (kg)"
        keyboardType="numeric"
        value={peso}
        onChangeText={setPeso}
      />

      {/* Objetivo */}
      <TextInput
        style={styles.input}
        placeholder="Digite seu objetivo (atividade/emagrecer)"
        value={objetivo}
        onChangeText={setObjetivo}
      />

      {/* Meta de Água */}
      <Text style={styles.text}>
        Meta de água: {metaAgua} ml/dia
      </Text>

      {/* Quantidade de Água Bebida */}
      <TextInput
        style={styles.input}
        placeholder="Quantos ml de água você bebeu?"
        keyboardType="numeric"
        value={String(aguaBebida)}
        onChangeText={(value) => setAguaBebida(Number(value))}
      />

      {/* Salvar */}
      <Button style={styles.button} onPress={salvarDados}>
        <Text style={styles.buttonText}>Salvar Dados</Text>

      </Button>

      {/* Histórico */}
      <View style={styles.historicoContainer}>
        <Text style={styles.historicoTitle}>Histórico da Semana</Text>
        {historico.length > 0 ? (
          historico.map((item, index) => (
            <Text key={index} style={styles.historicoText}>
              {item.data}: {item.aguaBebida} ml
            </Text>
          ))
        ) : (
          <Text style={styles.historicoText}>Sem dados no histórico</Text>
        )}
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
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#00796B',
  },
  input: {
    borderWidth: 1,
    borderColor: '#00796B',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
    color: '#004D40',
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
  text: {
    fontSize: 16,
    color: '#004D40',
    marginBottom: 20,
    textAlign: 'center',
  },
  historicoContainer: {
    marginTop: 20,
  },
  historicoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00796B',
    marginBottom: 10,
  },
  historicoText: {
    fontSize: 16,
    color: '#004D40',
  },
});
