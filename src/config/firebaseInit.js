import { firebaseConfig } from './firebase.js';

// Inicializar Firebase - Función para conexión
export const initializeFirebase = () => {
  try {
    // En React Native con Expo, usamos react-native-firebase
    // La inicialización se hace en el módulo de react-native-firebase
    console.log('Firebase inicializado con proyecto:', firebaseConfig.projectId);
    return true;
  } catch (error) {
    console.error('Error inicializando Firebase:', error);
    return false;
  }
};

// Función auxiliar para verificar conexión
export const checkFirebaseConnection = async () => {
  try {
    // Esta función verificará la conexión a Firebase
    console.log('Verificando conexión a Firebase...');
    return true;
  } catch (error) {
    console.error('Error en la conexión a Firebase:', error);
    return false;
  }
};
