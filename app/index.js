import { useEffect, useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

export default function Home() {
  const router = useRouter();
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    async function requestNotificationPermission() {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== 'granted') {
        const { status: newStatus } = await Notifications.requestPermissionsAsync();
        if (newStatus === 'granted') {
          setPermissionGranted(true);
        } else {
          Alert.alert(
            "Permissão Necessária",
            "Para receber lembretes de hidratação, ative as notificações nas configurações do seu dispositivo."
          );
        }
      } else {
        setPermissionGranted(true);
      }
    }

    requestNotificationPermission();
  }, []);

  const handleProceed = () => {
    router.push('/informacoesCorporais');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>
        Bem-vindo ao DaraWater!
      </Text>
      
      <Text style={{ fontSize: 16, textAlign: 'center', marginBottom: 20 }}>
       Mantenha-se saudável e hidrate-se com a Dara! Cuidar da sua saúde nunca foi tão bom!
      </Text>

      <Button title="Continuar" onPress={handleProceed} disabled={!permissionGranted} />
    </View>
  );
}
