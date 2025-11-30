import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar, 
  Alert,
  Platform
} from 'react-native';
import { preventScreenCaptureAsync, allowScreenCaptureAsync } from 'expo-screen-capture';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Clave para almacenamiento local
const STORAGE_KEY = '@secure_memo_content';

export default function App() {
  const [note, setNote] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // --- LÓGICA DE SEGURIDAD (Privacidad Visual) ---
  useEffect(() => {
    const activatePrivacy = async () => {
      try {
        // Esto activa FLAG_SECURE en Android.
        // 1. Evita capturas de pantalla.
        // 2. Oculta el contenido en la vista de "Apps Recientes" (Multitasking).
        await preventScreenCaptureAsync();
      } catch (error) {
        console.warn("Error al activar privacidad de pantalla:", error);
      }
    };

    activatePrivacy();

    // Limpieza al desmontar (opcional, pero buena práctica si la app tuviera navegación)
    return () => {
      allowScreenCaptureAsync();
    };
  }, []);

  // --- LÓGICA DE PERSISTENCIA ---
  useEffect(() => {
    loadNote();
  }, []);

  const loadNote = async () => {
    try {
      const savedNote = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedNote !== null) {
        setNote(savedNote);
      }
    } catch (e) {
      Alert.alert('Error', 'No se pudo cargar la nota.');
    }
  };

  const saveNote = async () => {
    setIsSaving(true);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, note);
      // Feedback sutil en lugar de un Alert invasivo
      // En una app real usaríamos un Toast, aquí cambiamos el texto del botón brevemente
      setTimeout(() => setIsSaving(false), 1000);
    } catch (e) {
      setIsSaving(false);
      Alert.alert('Error', 'No se pudo guardar la información.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Notas</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Carnet: 19001704</Text>
        </View>
      </View>

      <View style={styles.editorContainer}>
        <TextInput
          style={styles.input}
          multiline
          placeholder="Escribe tu nota a guardar..."
          placeholderTextColor="#555"
          value={note}
          onChangeText={setNote}
          textAlignVertical="top"
          autoCapitalize="none"
          autoCorrect={false} 
        />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.button, isSaving && styles.buttonSuccess]} 
          onPress={saveNote}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>
            {isSaving ? 'GUARDADO ✓' : 'GUARDAR CAMBIOS'}
          </Text>
        </TouchableOpacity>
        <Text style={styles.securityNote}>
          Pantalla protegida contra capturas
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Fondo oscuro para menor fatiga visual y estilo "Hacker"
    paddingTop: Platform.OS === 'android' ? 35 : 0,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2C',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#E0E0E0',
    letterSpacing: 1,
  },
  badge: {
    backgroundColor: '#1E3A28', // Verde oscuro muy sutil
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  badgeText: {
    color: '#4CAF50',
    fontSize: 10,
    fontWeight: '900',
  },
  editorContainer: {
    flex: 1,
    padding: 20,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#D0D0D0',
    lineHeight: 24,
    fontFamily: Platform.OS === 'android' ? 'monospace' : 'Courier', // Fuente monoespaciada tipo terminal
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#2C2C2C',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#2196F3',
    width: '100%',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonSuccess: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 1,
  },
  securityNote: {
    color: '#555',
    fontSize: 11,
  }
});