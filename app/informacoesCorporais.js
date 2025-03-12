import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      setAguaBebida(0);
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
      <Button style={styles.button} onPress={salvarDados} title="Salvar Dados" />

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
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
  },
  text: {
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    color: 'white',
  },
  historicoContainer: {
    marginTop: 30,
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  historicoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  historicoText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
});
