import { useEffect, useState } from 'react';
import { View, Text, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {
  const router = useRouter();
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [hasStoredData, setHasStoredData] = useState(false);
  const [loading, setLoading] = useState(true); // Estado de carregamento

  useEffect(() => {
    async function requestNotificationPermission() {
      const { status } = await Notifications.getPermissionsAsync();
      if (status === 'granted') {
        setPermissionGranted(true);
      } else {
        const { status: newStatus } = await Notifications.requestPermissionsAsync();
        if (newStatus === 'granted') {
          setPermissionGranted(true);
        } else {
          Alert.alert(
            "Permissão Necessária",
            "Para receber lembretes de hidratação, ative as notificações nas configurações do seu dispositivo."
          );
        }
      }
    }

    async function checkStoredData() {
      try {
        const dados = await AsyncStorage.getItem('dadosHidratacao');
        if (dados) {
          setHasStoredData(true);
          router.replace('/telaInicial');
        }
      } catch (error) {
        console.error('Erro ao verificar dados no AsyncStorage:', error);
      }
    }

    // Chama as funções
    requestNotificationPermission();
    checkStoredData();
    setLoading(false); // Fim do carregamento
  }, [router]);

  const handleProceed = () => {
    if (permissionGranted && !hasStoredData) {
      router.push('/informacoesCorporais');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>
        Bem-vindo ao DaraWater!
      </Text>

      <Text style={{ fontSize: 16, textAlign: 'center', marginBottom: 20 }}>
        Mantenha-se saudável e hidrate-se com a Dara! Cuidar da sua saúde nunca foi tão bom!
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <TouchableOpacity
          onPress={handleProceed}
          style={{ padding: 10, backgroundColor: permissionGranted && !hasStoredData ? 'blue' : 'grey' }}
          disabled={!permissionGranted || hasStoredData} // Desabilita o botão se não tiver permissão ou já tiver dados
        >
          <Text style={{ color: 'white' }}>Continuar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
