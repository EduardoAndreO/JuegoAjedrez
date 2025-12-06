import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import BoardComponent from '../components/Board.jsx';
import { Game } from '../data-structures/Game.js';
import { Color } from '../types/index.js';
import { GameRules } from '../logic/gameRules.js';
import { gameService } from '../services/gameService.js';

const GameScreen = ({ navigation, isDarkMode, toggleDarkMode }) => {
  const [game, setGame] = useState(new Game());
  const [gameStatus, setGameStatus] = useState('');
  const [gameId, setGameId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [tick, setTick] = useState(0); // for forcing re-render after mutations

  const theme = isDarkMode ? darkTheme : lightTheme;

  useEffect(() => {
    checkGameStatus();
  }, [game]);

  // Generar ID único para la partida
  useEffect(() => {
    if (!gameId) {
      const newGameId = `game_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      setGameId(newGameId);
    }
  }, []);

  const checkGameStatus = () => {
    const board = game.getBoard();
    const currentPlayer = game.getCurrentPlayer();

    if (GameRules.isCheckmate(board, currentPlayer)) {
      setGameStatus('Jaque mate. ' + (currentPlayer === Color.WHITE ? 'Negro' : 'Blanco') + ' gana.');
    } else if (GameRules.isCheck(board, currentPlayer)) {
      setGameStatus('¡Jaque!');
    } else if (GameRules.isStalemate(board, currentPlayer)) {
      setGameStatus('¡Tablas!');
    } else {
      setGameStatus('');
    }
  };

  const handleMove = async (from, to) => {
    const newGame = game;
    if (newGame.makeMove(from, to)) {
      // trigger re-render without resetting game
      setTick(t => t + 1);
            // Verificar estado del juego después del movimiento
            setTimeout(() => {
              checkGameStatus();
            }, 100);
      // Guardar el movimiento en Firebase
      if (gameId) {
        try {
          const moveData = {
            from,
            to,
            piece: newGame.getMoveHistory()[newGame.getMoveHistory().length - 1]?.piece,
          };
          await gameService.saveMove(gameId, moveData);
        } catch (error) {
          console.log('Movimiento local guardado (Firebase no disponible)');
        }
      }
    }
  };

  const handleUndo = () => {
    const newGame = game;
    if (newGame.undoMove()) {
            setTimeout(() => {
              checkGameStatus();
            }, 100);
      setTick(t => t + 1);
    }
  };

  const handleNewGame = () => {
    setGame(new Game());
    setTick(0);
    const newGameId = `game_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setGameId(newGameId);
  };

  const handleSaveGame = async () => {
    if (!gameId) return;
    
    setIsSaving(true);
    try {
      const gameData = {
        currentPlayer: game.getCurrentPlayer(),
        moveCount: game.getMoveHistory().length,
        moves: game.getMoveHistory().map(m => m.toString()),
        isGameOver: game.isGameFinished(),
        winner: game.getWinner(),
      };
      
      await gameService.saveGame(gameId, gameData);
      Alert.alert('Éxito', '¡Partida guardada en Firebase!');
    } catch (error) {
      Alert.alert('Error', 'Error al guardar la partida: ' + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleLoadGame = async () => {
    if (!gameId) return;
    
    try {
      const loadedGame = await gameService.loadGame(gameId);
      if (loadedGame) {
        Alert.alert('Éxito', `Partida cargada: ${loadedGame.moveCount} movimientos`);
      } else {
        Alert.alert('Info', 'No hay partida guardada con este ID');
      }
    } catch (error) {
      Alert.alert('Error', 'Error al cargar la partida: ' + error.message);
    }
  };

  const handleGoHome = () => {
    navigation.navigate('Home');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.bgPrimary }]}>
      <View style={[styles.topBar, { backgroundColor: theme.bgSecondary }]}>
        <TouchableOpacity onPress={handleGoHome} style={styles.backButton}>
          <Text style={[styles.backButtonText, { color: theme.text }]}>← Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleDarkMode} style={styles.themeToggle}>
          <Text style={styles.themeToggleText}>{isDarkMode ? '☀️' : '🌙'}</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.header, { backgroundColor: theme.bgSecondary }]}>
        <Text style={[styles.title, { color: theme.text }]}>Juego de Ajedrez</Text>
        <Text style={[styles.playerInfo, { color: theme.textSecondary }]}>
          Turno: {game.getCurrentPlayer() === Color.WHITE ? 'Blanco' : 'Negro'}
        </Text>
        {gameStatus && <Text style={[styles.status, { color: theme.statusColor }]}>{gameStatus}</Text>}
      </View>

      <View style={[styles.boardContainer, { backgroundColor: theme.bgSecondary }]}>
        <BoardComponent board={game.getBoard()} onMove={handleMove} flipped={game.getCurrentPlayer() === Color.BLACK} />
      </View>

      <View style={[styles.controls, { backgroundColor: theme.bgSecondary }]}>
        <TouchableOpacity style={[styles.button, { backgroundColor: theme.buttonBg }]} onPress={handleUndo}>
          <Text style={[styles.buttonText, { color: theme.buttonText }]}>⟲ Deshacer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: theme.buttonBg }]} onPress={handleNewGame}>
          <Text style={[styles.buttonText, { color: theme.buttonText }]}>✨ Nueva partida</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.firebaseControls, { backgroundColor: theme.bgSecondary }]}>
        <TouchableOpacity 
          style={[styles.firebaseButton, isSaving && styles.buttonDisabled, { backgroundColor: theme.accentBg }]} 
          onPress={handleSaveGame}
          disabled={isSaving}
        >
          <Text style={[styles.firebaseButtonText, { color: theme.accentText }]}>
            {isSaving ? 'Guardando...' : '💾 Guardar'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.firebaseButton, { backgroundColor: theme.accentBg }]} onPress={handleLoadGame}>
          <Text style={[styles.firebaseButtonText, { color: theme.accentText }]}>📥 Cargar</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.gameIdContainer, { backgroundColor: theme.bgSecondary, borderColor: theme.textSecondary }]}>
        <Text style={[styles.gameIdLabel, { color: theme.textSecondary }]}>ID: {gameId?.slice(0, 12)}...</Text>
      </View>

      <View style={[styles.moveHistory, { backgroundColor: theme.bgSecondary }]}>
        <Text style={[styles.moveHistoryTitle, { color: theme.text }]}>Movimientos ({game.getMoveHistory().length})</Text>
        <Text style={[styles.moveHistoryText, { color: theme.textSecondary }]}>
          {game
            .getMoveHistory()
            .map((move, idx) => `${idx + 1}. ${move.toString()}`)
            .join('\n')}
        </Text>
      </View>
    </ScrollView>
  );
};

const lightTheme = {
  bgPrimary: '#f8f9fa',
  bgSecondary: '#ffffff',
  text: '#2c3e50',
  textSecondary: '#666',
  accent: '#2ecc71',
  accentBg: '#27ae60',
  accentText: '#fff',
  buttonBg: '#3498db',
  buttonText: '#fff',
  statusColor: '#e74c3c',
};

const darkTheme = {
  bgPrimary: '#1a1a2e',
  bgSecondary: '#16213e',
  text: '#e0e0e0',
  textSecondary: '#b0b0b0',
  accent: '#1abc9c',
  accentBg: '#16a085',
  accentText: '#1a1a2e',
  buttonBg: '#0f3460',
  buttonText: '#1abc9c',
  statusColor: '#e74c3c',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  themeToggle: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.08)',
  },
  themeToggleText: {
    fontSize: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
  },
  playerInfo: {
    fontSize: 16,
    marginTop: 5,
  },
  status: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  boardContainer: {
    alignItems: 'center',
    marginBottom: 14,
    padding: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  firebaseControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  firebaseButton: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 6,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  firebaseButtonText: {
    fontSize: 12,
    fontWeight: '600',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  gameIdContainer: {
    padding: 10,
    borderRadius: 6,
    marginBottom: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  gameIdLabel: {
    fontSize: 11,
    fontFamily: 'monospace',
  },
  moveHistory: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  moveHistoryTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  moveHistoryText: {
    fontSize: 12,
    minHeight: 80,
  },
});

export default GameScreen;
