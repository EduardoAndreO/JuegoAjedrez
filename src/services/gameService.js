// Servicio para guardar y cargar partidas de ajedrez en Firebase Realtime Database

import { firebaseConfig } from '../config/firebase.js';

class GameService {
  constructor() {
    // Use the modern default RTDB hostname which includes "-default-rtdb"
    this.dbUrl = `https://${firebaseConfig.projectId}-default-rtdb.firebaseio.com`;
  }

  /**
   * Guardar una partida en Firebase
   * @param {string} gameId - ID único de la partida
   * @param {Object} gameData - Datos de la partida
   */
  async saveGame(gameId, gameData) {
    try {
      const response = await fetch(
        `${this.dbUrl}/games/${gameId}.json`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...gameData,
            savedAt: new Date().toISOString(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Error guardando la partida');
      }

      const data = await response.json();
      console.log('Partida guardada exitosamente:', gameId);
      return data;
    } catch (error) {
      console.error('Error al guardar la partida:', error);
      throw error;
    }
  }

  /**
   * Cargar una partida desde Firebase
   * @param {string} gameId - ID único de la partida
   */
  async loadGame(gameId) {
    try {
      const response = await fetch(
        `${this.dbUrl}/games/${gameId}.json`
      );

      if (!response.ok) {
        throw new Error('Error cargando la partida');
      }

      const data = await response.json();
      console.log('Partida cargada exitosamente:', gameId);
      return data;
    } catch (error) {
      console.error('Error al cargar la partida:', error);
      throw error;
    }
  }

  /**
   * Obtener todas las partidas
   */
  async getAllGames() {
    try {
      const response = await fetch(
        `${this.dbUrl}/games.json`
      );

      if (!response.ok) {
        throw new Error('Error obteniendo las partidas');
      }

      const data = await response.json();
      console.log('Partidas obtenidas exitosamente');
      return data || {};
    } catch (error) {
      console.error('Error al obtener las partidas:', error);
      throw error;
    }
  }

  /**
   * Eliminar una partida
   * @param {string} gameId - ID único de la partida
   */
  async deleteGame(gameId) {
    try {
      const response = await fetch(
        `${this.dbUrl}/games/${gameId}.json`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        throw new Error('Error eliminando la partida');
      }

      console.log('Partida eliminada exitosamente:', gameId);
      return true;
    } catch (error) {
      console.error('Error al eliminar la partida:', error);
      throw error;
    }
  }

  /**
   * Guardar movimiento en historial
   * @param {string} gameId - ID único de la partida
   * @param {Object} move - Datos del movimiento
   */
  async saveMove(gameId, move) {
    try {
      const response = await fetch(
        `${this.dbUrl}/games/${gameId}/moves.json`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...move,
            timestamp: new Date().toISOString(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Error guardando el movimiento');
      }

      const data = await response.json();
      console.log('Movimiento guardado exitosamente');
      return data;
    } catch (error) {
      console.error('Error al guardar el movimiento:', error);
      throw error;
    }
  }

  /**
   * Obtener historial de movimientos
   * @param {string} gameId - ID único de la partida
   */
  async getMoves(gameId) {
    try {
      const response = await fetch(
        `${this.dbUrl}/games/${gameId}/moves.json`
      );

      if (!response.ok) {
        throw new Error('Error obteniendo los movimientos');
      }

      const data = await response.json();
      console.log('Movimientos obtenidos exitosamente');
      return data || [];
    } catch (error) {
      console.error('Error al obtener los movimientos:', error);
      throw error;
    }
  }
}

// Exportar instancia única del servicio
export const gameService = new GameService();
