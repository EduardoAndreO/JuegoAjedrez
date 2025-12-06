import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const startNewGame = () => {
    navigation.navigate('Game');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>♟ Chess Game ♟</Text>
        <Text style={styles.subtitle}>Interactive Chess Experience</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>How to Play</Text>
        <Text style={styles.description}>
          • Select a piece by tapping it{'\n'}
          • Tap a valid square to move{'\n'}
          • Each player alternates turns{'\n'}
          • White moves first{'\n'}
          • Follow standard chess rules
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Features</Text>
        <Text style={styles.description}>
          • Full chess rules enforcement{'\n'}
          • Move validation{'\n'}
          • Check and Checkmate detection{'\n'}
          • Undo last move{'\n'}
          • Move history tracking{'\n'}
          • Beautiful interactive board
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={startNewGame}>
        <Text style={styles.buttonText}>Start New Game</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    paddingTop: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#3498db',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
