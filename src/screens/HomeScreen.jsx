import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const HomeScreen = ({ navigation, isDarkMode, toggleDarkMode }) => {
  const startNewGame = () => {
    navigation.navigate('Game');
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.bgPrimary }]} contentContainerStyle={styles.content}>
      <View style={[styles.headerTop, { backgroundColor: theme.bgSecondary }]}>
        <TouchableOpacity onPress={toggleDarkMode} style={styles.themeToggle}>
          <Text style={[styles.themeToggleText, { color: theme.text }]}>
            {isDarkMode ? '☀️' : '🌙'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.header, { backgroundColor: theme.bgSecondary }]}>
        <Text style={[styles.title, { color: theme.text }]}>♟ Juego de Ajedrez ♟</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>Una experiencia de ajedrez interactiva</Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.bgSecondary, borderLeftColor: theme.accent }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Cómo jugar</Text>
        <Text style={[styles.description, { color: theme.textSecondary }]}>
          • Selecciona una pieza tocándola{'\n'}
          • Toca una casilla válida para mover{'\n'}
          • Los jugadores alternan turnos{'\n'}
          • Las blancas mueven primero{'\n'}
          • Sigue las reglas estándar del ajedrez
        </Text>
      </View>

      <View style={[styles.section, { backgroundColor: theme.bgSecondary, borderLeftColor: theme.accent }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Características</Text>
        <Text style={[styles.description, { color: theme.textSecondary }]}>
          • Aplicación completa de reglas de ajedrez{'\n'}
          • Validación de movimientos{'\n'}
          • Detección de jaque y jaque mate{'\n'}
          • Deshacer último movimiento{'\n'}
          • Historial de movimientos{'\n'}
          • Tablero interactivo y atractivo
        </Text>
      </View>

      <TouchableOpacity style={[styles.button, { backgroundColor: theme.buttonBg }]} onPress={startNewGame}>
        <Text style={[styles.buttonText, { color: theme.buttonText }]}>Comenzar partida</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const lightTheme = {
  bgPrimary: '#f8f9fa',
  bgSecondary: '#ffffff',
  text: '#2c3e50',
  textSecondary: '#666',
  accent: '#2ecc71',
  buttonBg: '#3498db',
  buttonText: '#fff',
};

const darkTheme = {
  bgPrimary: '#1a1a2e',
  bgSecondary: '#16213e',
  text: '#e0e0e0',
  textSecondary: '#b0b0b0',
  accent: '#1abc9c',
  buttonBg: '#1abc9c',
  buttonText: '#1a1a2e',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
  },
  themeToggle: {
    fontSize: 28,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  themeToggleText: {
    fontSize: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    paddingVertical: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
  },
  section: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderLeftWidth: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
