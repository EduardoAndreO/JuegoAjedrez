// Servicio para guardar estadísticas del jugador en Firebase

import { firebaseConfig } from '../config/firebase.js';

class UserService {
  constructor() {
    this.dbUrl = `https://${firebaseConfig.projectId}.firebaseio.com`;
  }

  /**
   * Guardar o actualizar perfil de usuario
   * @param {string} userId - ID único del usuario
   * @param {Object} userData - Datos del usuario
   */
  async saveUserProfile(userId, userData) {
    try {
      const response = await fetch(
        `${this.dbUrl}/users/${userId}/profile.json`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...userData,
            updatedAt: new Date().toISOString(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Error guardando el perfil');
      }

      console.log('Perfil guardado exitosamente');
      return await response.json();
    } catch (error) {
      console.error('Error al guardar el perfil:', error);
      throw error;
    }
  }

  /**
   * Obtener perfil de usuario
   * @param {string} userId - ID único del usuario
   */
  async getUserProfile(userId) {
    try {
      const response = await fetch(
        `${this.dbUrl}/users/${userId}/profile.json`
      );

      if (!response.ok) {
        throw new Error('Error obteniendo el perfil');
      }

      const data = await response.json();
      console.log('Perfil obtenido exitosamente');
      return data;
    } catch (error) {
      console.error('Error al obtener el perfil:', error);
      throw error;
    }
  }

  /**
   * Guardar estadísticas del usuario
   * @param {string} userId - ID único del usuario
   * @param {Object} stats - Estadísticas del usuario
   */
  async saveUserStats(userId, stats) {
    try {
      const response = await fetch(
        `${this.dbUrl}/users/${userId}/stats.json`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...stats,
            updatedAt: new Date().toISOString(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Error guardando las estadísticas');
      }

      console.log('Estadísticas guardadas exitosamente');
      return await response.json();
    } catch (error) {
      console.error('Error al guardar las estadísticas:', error);
      throw error;
    }
  }

  /**
   * Obtener estadísticas del usuario
   * @param {string} userId - ID único del usuario
   */
  async getUserStats(userId) {
    try {
      const response = await fetch(
        `${this.dbUrl}/users/${userId}/stats.json`
      );

      if (!response.ok) {
        throw new Error('Error obteniendo las estadísticas');
      }

      const data = await response.json();
      console.log('Estadísticas obtenidas exitosamente');
      return data || {
        gamesPlayed: 0,
        gamesWon: 0,
        gamesLost: 0,
        draws: 0,
      };
    } catch (error) {
      console.error('Error al obtener las estadísticas:', error);
      throw error;
    }
  }

  /**
   * Incrementar contador de partidas
   * @param {string} userId - ID único del usuario
   * @param {string} result - Resultado: 'won', 'lost', 'draw'
   */
  async updateGameResult(userId, result) {
    try {
      const stats = await this.getUserStats(userId);
      
      stats.gamesPlayed = (stats.gamesPlayed || 0) + 1;
      
      if (result === 'won') {
        stats.gamesWon = (stats.gamesWon || 0) + 1;
      } else if (result === 'lost') {
        stats.gamesLost = (stats.gamesLost || 0) + 1;
      } else if (result === 'draw') {
        stats.draws = (stats.draws || 0) + 1;
      }

      return await this.saveUserStats(userId, stats);
    } catch (error) {
      console.error('Error actualizando resultado:', error);
      throw error;
    }
  }
}

// Exportar instancia única del servicio
export const userService = new UserService();
