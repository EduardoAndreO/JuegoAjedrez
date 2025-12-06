import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import BoardComponent from '../components/Board.jsx';
import { Game } from '../data-structures/Game.js';
import { Color } from '../types/index.js';
import { GameRules } from '../logic/gameRules.js';
import { gameService } from '../services/gameService.js';

const GameScreen = () => {
  const [game, setGame] = useState(new Game());
  const [gameStatus, setGameStatus] = useState('');
  const [gameId, setGameId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

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
      setGameStatus('Checkmate! ' + (currentPlayer === Color.WHITE ? 'Black' : 'White') + ' wins!');
    } else if (GameRules.isCheck(board, currentPlayer)) {
  const handleMove = async (from, to) => {
    const newGame = game;
    if (newGame.makeMove(from, to)) {
      setGame(new Game());
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
      setGame(new Game());
    }
  };

  const handleNewGame = () => {
    setGame(new Game());
    const newGameId = `game_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setGameId(newGameId);
  };

  const handleSaveGame = async () => {
    if (!gameId) return;
    
    setIsSaving(true);
    try {
      const gameData = {
        currentPlayer: game.getCurrentPlayer(),
      <View style={styles.controls}>
        <TouchableOpacity style={styles.button} onPress={handleUndo}>
          <Text style={styles.buttonText}>Undo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleNewGame}>
          <Text style={styles.buttonText}>New Game</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.firebaseControls}>
        <TouchableOpacity 
          style={[styles.firebaseButton, isSaving && styles.buttonDisabled]} 
          onPress={handleSaveGame}
          disabled={isSaving}
        >
          <Text style={styles.firebaseButtonText}>
            {isSaving ? 'Saving...' : '💾 Save to Firebase'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.firebaseButton} onPress={handleLoadGame}>
          <Text style={styles.firebaseButtonText}>📥 Load from Firebase</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.gameIdContainer}>
        <Text style={styles.gameIdLabel}>Game ID: {gameId?.slice(0, 15)}...</Text>
      </View>lert('Éxito', '¡Partida guardada en Firebase!');
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
  };const newGame = game;
    if (newGame.undoMove()) {
      setGame(new Game());
    }
  };

  const handleNewGame = () => {
    setGame(new Game());
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Chess Game</Text>
        <Text style={styles.playerInfo}>
          Current Player: {game.getCurrentPlayer() === Color.WHITE ? 'White' : 'Black'}
        </Text>
        {gameStatus && <Text style={styles.status}>{gameStatus}</Text>}
      </View>

      <View style={styles.boardContainer}>
        <BoardComponent board={game.getBoard()} onMove={handleMove} />
      </View>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.button} onPress={handleUndo}>
          <Text style={styles.buttonText}>Undo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleNewGame}>
          <Text style={styles.buttonText}>New Game</Text>
        </TouchableOpacity>
      </View>

  moveHistoryText: {
    fontSize: 12,
    color: '#666',
    height: 100,
  },
  firebaseControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  firebaseButton: {
    backgroundColor: '#27ae60',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  firebaseButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  buttonDisabled: {
    backgroundColor: '#95a5a6',
  },
  gameIdContainer: {
    backgroundColor: '#ecf0f1',
    padding: 8,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  gameIdLabel: {
    fontSize: 11,
    color: '#7f8c8d',
    fontFamily: 'monospace',
  },
});

export default GameScreen;
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  playerInfo: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  status: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginTop: 5,
  },
  boardContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  moveHistory: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  moveHistoryTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  moveHistoryText: {
    fontSize: 12,
    color: '#666',
    height: 100,
  },
});

export default GameScreen;
