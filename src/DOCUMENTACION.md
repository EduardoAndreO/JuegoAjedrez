# 📚 Documentación Completa - Juego de Ajedrez

**Fecha de creación:** Diciembre 6, 2025  
**Versión:** 1.0  
**Autor:** Eduardo Orellana
---
## 📑 Tabla de Contenidos

1. [Estructura General](#estructura-general)
2. [Flujo de la Aplicación](#flujo-de-la-aplicación)
3. [Pantallas](#pantallas)
4. [Estructuras de Datos](#estructuras-de-datos)
5. [Lógica de Ajedrez](#lógica-de-ajedrez)
6. [Componentes Visuales](#componentes-visuales)
7. [Firebase](#firebase)
8. [Tipos y Constantes](#tipos-y-constantes)
9. [Flujo Completo de un Movimiento](#flujo-completo-de-un-movimiento)
10. [Tecnologías Utilizadas](#tecnologías-utilizadas)
---
## 🏗️ Estructura General
```
JuegoAjedrez/
├── src/
│   ├── App.jsx                          # Componente principal (navegación)
│   ├── types/index.js                   # Tipos y enumeraciones
│   ├── utils/constants.js               # Constantes (colores, tamaños)
│   ├── config/
│   │   ├── firebase.js                  # Configuración de Firebase
│   │   └── firebaseInit.js              # Inicialización de Firebase
│   ├── data-structures/                 # Estructuras de datos (ajedrez)
│   │   ├── Piece.js                     # Clase de piezas
│   │   ├── Board.js                     # Tablero 8x8
│   │   ├── Move.js                      # Historial de movimientos
│   │   └── Game.js                      # Gestor principal del juego
│   ├── logic/                           # Lógica de ajedrez
│   │   ├── moveValidator.js             # Valida si un movimiento es legal
│   │   ├── pieceMovement.js             # Calcula movimientos posibles
│   │   └── gameRules.js                 # Detecta jaque/jaque mate
│   ├── components/                      # Componentes React Native
│   │   ├── Board.jsx                    # Tablero visual interactivo
│   │   ├── Piece.jsx                    # Pieza individual
│   │   └── AnimatedPiece.jsx            # Pieza con animación
│   ├── screens/                         # Pantallas principales
│   │   ├── HomeScreen.jsx               # Menú inicial
│   │   └── GameScreen.jsx               # Pantalla de juego
│   └── services/                        # Servicios Firebase
│       ├── gameService.js               # Guardar/cargar partidas
│       └── userService.js               # Guardar estadísticas
└── index.js                             # Punto de entrada
```
---
## 🎮 Flujo de la Aplicación
```
1. Inicio - index.js
   ↓ Importa el componente App.jsx
   ↓ Registra la app en React Native
   ↓ Muestra la pantalla inicial
   
2. Navegación - App.jsx
   ↓ Gestiona el cambio entre pantallas
   ↓ Controla el modo oscuro/claro
   ↓ Pasa los parámetros entre pantallas
   
3. Usuario en HomeScreen (Menú)
   ↓ Lee las instrucciones
   ↓ Presiona "Comenzar partida"
   
4. Abre GameScreen (Juego)
   ↓ Muestra el tablero 8x8
   ↓ Inicia el juego 
```
---
## 📱 Pantallas

### **HomeScreen - Menú Inicial**

**Componentes:**
- Título: "♟ Juego de Ajedrez ♟"
- Campos de entrada de texto:
  - Nombre jugador Blancas (default: "Blanco")
  - Nombre jugador Negras (default: "Negro")
- Secciones informativas:
  - "Cómo jugar" - Instrucciones básicas
  - "Características" - Funcionalidades de la app
- Botones:
  - 🌙/☀️ Toggle modo oscuro
  - ▶️ Comenzar partida

**Lógica:**
```javascript
const [playerWhiteName, setPlayerWhiteName] = useState('Blanco');
const [playerBlackName, setPlayerBlackName] = useState('Negro');

const startNewGame = () => {
  navigation.navigate('Game', { playerWhiteName, playerBlackName });
};
```

**Tema:**
```javascript
// Claro
bgPrimary: '#f8f9fa'        // Fondo principal
bgSecondary: '#ffffff'      // Fondos secundarios (tarjetas)
text: '#2c3e50'             // Texto principal
textSecondary: '#666'       // Texto secundario
accent: '#2ecc71'           // Acentos (verde)
buttonBg: '#3498db'         // Botones (azul)

// Oscuro
bgPrimary: '#1a1a2e'        // Fondo principal (muy oscuro)
bgSecondary: '#16213e'      // Fondos secundarios
text: '#e0e0e0'             // Texto (claro)
textSecondary: '#b0b0b0'    // Texto secundario
accent: '#1abc9c'           // Acentos (turquesa)
buttonBg: '#1abc9c'         // Botones (turquesa)
```

---

### **GameScreen - Pantalla de Juego**

**Archivo:** `src/screens/GameScreen.jsx`

**Secciones:**

1. **Barra Superior (topBar)**
   - Botón ← Atrás (volver a HomeScreen)
   - Información del turno
   - Toggle modo oscuro 🌙/☀️

2. **Header**
   - Título: "Juego de Ajedrez"
   - Información del jugador actual
   - Estado del juego (¡Jaque! / Jaque mate / etc.)

3. **Tablero (boardContainer)**
   - Componente Board.jsx
   - 8x8 casillas
   - Piezas animadas
   - Resaltado de movimientos válidos

4. **Contadores de Movimientos**
   ```
   Blanco (movimientos: X) | Turno actual | Negro (movimientos: Y)
   ```

5. **Controles (controls)**
   - ⟲ Deshacer: revierte el último movimiento
   - ✨ Nueva partida: reinicia el juego

6. **Controles Firebase (firebaseControls)**
   - 💾 Guardar: guarda la partida en Firebase
   - 📥 Cargar: carga una partida guardada
   - Mostrar Game ID

7. **Historial de Movimientos (moveHistory)**
   - Lista de todos los movimientos realizados
   - Formato: "1. Peón: (1,4) -> (3,4)"

**Lógica Principal:**

```javascript
// Estados
const [game, setGame] = useState(new Game());
const [gameStatus, setGameStatus] = useState('');
const [whiteMoveCount, setWhiteMoveCount] = useState(0);
const [blackMoveCount, setBlackMoveCount] = useState(0);

// Recibe nombres de HomeScreen
const params = route?.params || {};
const [whiteName, setWhiteName] = useState(params.playerWhiteName || 'Blanco');
const [blackName, setBlackName] = useState(params.playerBlackName || 'Negro');

// Actualiza contadores
const updateMoveCounts = () => {
  const len = game.getMoveHistory().length;
  setWhiteMoveCount(Math.ceil(len / 2));
  setBlackMoveCount(Math.floor(len / 2));
};

// Verifica estado (jaque, jaque mate, tablas)
const checkGameStatus = () => {
  if (GameRules.isCheckmate(board, currentPlayer)) {
    setGameStatus('Jaque mate. ' + ganador + ' gana.');
  } else if (GameRules.isCheck(board, currentPlayer)) {
    setGameStatus('¡Jaque!');
  } else if (GameRules.isStalemate(board, currentPlayer)) {
    setGameStatus('¡Tablas!');
  }
};

// Maneja un movimiento
const handleMove = async (from, to) => {
  if (game.makeMove(from, to)) {
    setTick(t => t + 1);  // Fuerza render
    setTimeout(() => checkGameStatus(), 100);
    // Guarda en Firebase si está disponible
  }
};
```

---

## 🎲 Estructuras de Datos

### **Piece.js - Clase de Piezas**

**Propiedades:**
```javascript
class Piece {
  type:      'pawn' | 'knight' | 'bishop' | 'rook' | 'queen' | 'king'
  color:     'white' | 'black'
  position:  { row: 0-7, col: 0-7 }
  hasMoved:  boolean          // ¿Se ha movido alguna vez?
}
```

**Métodos:**
```javascript
getPieceSymbol()  // Retorna ♔, ♕, ♖, ♗, ♘, ♟
moveTo(position)  // Actualiza posición
```

**Símbolos Unicode:**
```
Blancas: ♔ (rey), ♕ (reina), ♖ (torre), ♗ (alfil), ♘ (caballo), ♙ (peón)
Negras:  ♚ (rey), ♛ (reina), ♜ (torre), ♝ (alfil), ♞ (caballo), ♟ (peón)
```

---

### **Board.js - Tablero 8x8**

**Estructura:**
```javascript
class Board {
  private squares: (Piece | null)[][]  // Matriz 8x8
  
  // Inicializa posiciones estándar de ajedrez
  constructor() {
    // Fila 0 y 7: torres, caballos, alfiles, reinas, reyes
    // Fila 1 y 6: peones
    // Filas 2-5: vacías
  }
}
```

**Métodos:**
```javascript
getPiece(position)         // Obtiene pieza en posición
setPiece(position, piece)  // Coloca pieza
removePiece(position)      // Elimina pieza
isPositionValid(position)  // Valida que posición exista
movePiece(from, to)        // Mueve pieza (sin validación)
getSquares()               // Retorna matriz completa
```

**Indexación:**
```
Posición = { row: 0-7, col: 0-7 }
(0,0) = esquina negra superior izquierda
(7,7) = esquina blanca inferior derecha
```

---

### **Move.js - Historial de Movimientos**

**Estructura:**
```javascript
class Move {
  from:            { row, col }
  to:              { row, col }
  piece:           'pawn' | 'knight' | ... | 'king'
  capturedPiece:   'pawn' | null      // ¿Capturó algo?
  timestamp:       Date
}
```

**Métodos:**
```javascript
toString()  // Retorna "Peón: (1,4) -> (3,4)" (en español)
getMoveDetails()  // Retorna objeto con detalles
```

---

### **Game.js - Gestor Principal del Juego**

**Propiedades:**
```javascript
class Game {
  board:           Board
  moveHistory:     Move[]
  currentPlayer:   'white' | 'black'
  isGameOver:      boolean
  winner:          'white' | 'black' | null
}
```

**Métodos:**
```javascript
// Movimientos
makeMove(from, to)         // Hace movimiento (valida + actualiza)
  ↳ Llama a MoveValidator.isValidMove()
  ↳ Si es válido, mueve la pieza
  ↳ Crea Move y lo añade al historial
  ↳ Cambia el turno

undoMove()                 // Deshace último movimiento
  ↳ Saca Move del historial
  ↳ Mueve pieza a posición anterior
  ↳ Cambia el turno

// Consultores
getCurrentPlayer()         // Retorna 'white' o 'black'
getBoard()                 // Retorna el tablero
getMoveHistory()           // Retorna array de moves
isGameFinished()           // ¿Terminó el juego?
getWinner()               // Retorna ganador o null

// Control
switchPlayer()             // Alterna entre blanco y negro
endGame(winner)           // Marca juego como terminado
```

---

## ⚙️ Lógica de Ajedrez

### **moveValidator.js - Validador de Movimientos**

**Función Principal:**
```javascript
MoveValidator.isValidMove(board, from, to)
```

**Validaciones por Pieza:**

1. **PEÓN (♟)**
   - Avanza 1 casilla adelante (2 en primer movimiento)
   - Captura en diagonal 1 casilla
   - No puede retroceder
   - Validación especial: no puede terminar en su fila inicial

2. **CABALLO (♘)**
   - Se mueve en forma de L: 2 casillas en una dirección + 1 perpendicular
   - PUEDE saltar sobre otras piezas
   - 8 posibles movimientos desde cualquier posición

3. **ALFIL (♗)**
   - Se mueve diagonalmente infinitas casillas
   - No puede saltar
   - Siempre se mantiene en el color original de su casilla inicial

4. **TORRE (♖)**
   - Se mueve horizontal o verticalmente infinitas casillas
   - No puede saltar
   - Usada para detectar jaque

5. **REINA (♕)**
   - Combina movimientos de torre + alfil
   - Infinitamente en cualquier dirección
   - No puede saltar
   - La pieza más poderosa

6. **REY (♔)**
   - Se mueve 1 casilla en cualquier dirección
   - No puede saltar
   - NO puede moverse a una casilla amenazada por el enemigo
   - Validación especial: asegura que el rey no quede en jaque

**Lógica General:**
```javascript
// 1. Verificar que la posición "desde" tiene una pieza
if (!board.getPiece(from)) return false;

// 2. Verificar que "a" está dentro del tablero
if (!board.isPositionValid(to)) return false;

// 3. Verificar que "a" no tiene una pieza del mismo color
if (board.getPiece(to)?.color === piece.color) return false;

// 4. Validar movimiento específico según tipo de pieza
if (!isValidMoveForPiece(piece, from, to, board)) return false;

// 5. Verificar que el movimiento no deja el rey en jaque
if (wouldLeavingKingInCheck(move, board)) return false;

return true;
```

---

### **pieceMovement.js - Calcula Movimientos Posibles**

**Función Principal:**
```javascript
getPossibleMoves(piece, board, position)
```

**Retorna:** Array de posiciones válidas donde la pieza puede moverse

**Usado para:**
- Resaltar casillas verdes en el tablero
- Validar movimientos
- IA futura

---

### **gameRules.js - Detecta Jaque/Jaque Mate**

**Métodos:**

1. **isInCheck(board, color)**
   - ¿El rey del color especificado está amenazado por el enemigo?
   - Busca el rey
   - Verifica todas las piezas enemigas
   - Si alguna puede capturar el rey → Jaque

2. **isCheckmate(board, color)**
   - ¿Está el rey en jaque?
   - ¿Tiene el jugador algún movimiento legal?
   - Si está en jaque Y no hay movimientos legales → Jaque mate
   - FIN DEL JUEGO - El otro jugador gana

3. **isStalemate(board, color)**
   - ¿NO está en jaque?
   - ¿No tiene ningún movimiento legal?
   - Si cumple ambas → Tablas (empate)
   - FIN DEL JUEGO - Empate

4. **isMoveLegal(move, board)**
   - Valida que el movimiento cumple reglas de ajedrez
   - Verifica que no deja el rey en jaque
   - Combina validaciones de moveValidator.js

---

## 🎨 Componentes Visuales

### **Board.jsx - Tablero Interactivo**

**Funcionalidades:**

1. **Renderizado Visual:**
   - Dibuja 64 casillas (8x8)
   - Alterna colores: #f0d9b5 (claro) y #b58863 (oscuro)
   - Coloca piezas en sus posiciones

2. **Interactividad:**
   ```
   1er toque: selecciona pieza
   2do toque: mueve la pieza
   ```
   - Llama a `onMove(from, to)` que viene de GameScreen

3. **Resaltado Visual:**
   - **Pieza seleccionada:** fondo amarillo
   - **Movimientos válidos:** fondo verde
   - **Jaque:** fondo rojo

4. **Volteo del Tablero:**
   - Después de cada turno, el tablero se voltea 180°
   - Blancas siempre ven desde abajo
   - Negras siempre ven desde arriba (invertido)
   - Usa `flipped` prop para controlar

5. **Mapeo de Coordenadas:**
   ```javascript
   // Cuando flipped=true:
   Display (0,0) → Logical (7,7)
   Display (7,7) → Logical (0,0)
   ```
   - El usuario ve el tablero rotado
   - Pero la validación usa coordenadas lógicas

---

### **Piece.jsx - Pieza Individual**

**Renderiza:**
- Símbolo Unicode (♔, ♕, ♖, ♗, ♘, ♟)
- Color blanco o negro
- Tamaño responsivo según `squareSize`

**Propiedades:**
```javascript
piece:        Piece object
position:     { row, col }
isSelected:   boolean
isValidMove:  boolean
squareSize:   number (px)
```

---

### **AnimatedPiece.jsx - Animación de Movimiento**

**Funcionalidad:**
- Envuelve Piece.jsx con animación
- Detecta cambios de posición
- Anima la transición suavemente

**Animación:**
```javascript
// Cuando position cambia:
1. Calcula diferencia entre posición anterior y nueva
2. Aplica Animated.spring() para efecto natural
3. La pieza "flota" de una casilla a otra
4. Duración: ~300-500ms

Configuración:
  speed: 15           // Velocidad de la animación
  bounciness: 3       // Efecto de rebote
  useNativeDriver: false  // Permite transforms
```

---

## 💾 Firebase

### **firebase.js - Configuración**

```javascript
const firebaseConfig = {
  apiKey: "...",
  authDomain: "juegoajedrez-20753.firebaseapp.com",
  projectId: "juegoajedrez-20753",
  storageBucket: "juegoajedrez-20753.appspot.com",
  messagingSenderId: "...",
  appId: "...",
  databaseURL: "https://juegoajedrez-20753-default-rtdb.firebaseio.com"
};
```

**Estructura en Firebase Realtime Database:**
```
juegoajedrez-20753/
├── games/
│   ├── game_1733528400000_abc123def/
│   │   ├── currentPlayer: "white"
│   │   ├── moveCount: 5
│   │   ├── moves: ["Peón: (1,4) -> (3,4)", ...]
│   │   ├── isGameOver: false
│   │   ├── winner: null
│   │   └── timestamp: 1733528400000
│   └── game_1733528401000_xyz789/
│
├── users/
│   ├── user1/
│   │   ├── name: "Juan"
│   │   ├── wins: 3
│   │   ├── losses: 1
│   │   ├── draws: 2
│   │   └── rating: 1600
│
└── moves/
    └── game_1733528400000_abc123def/
        ├── move1: { from: {...}, to: {...}, piece: "pawn" }
        ├── move2: { from: {...}, to: {...}, piece: "knight" }
```

---

### **gameService.js - Servicios de Partida**

```javascript
class GameService {
  // Guardar
  saveGame(gameId, gameData)
    → PUT /games/{gameId}.json
    → Guarda estado completo de la partida
    
  // Cargar
  loadGame(gameId)
    → GET /games/{gameId}.json
    → Retorna datos de la partida
    
  // Historial
  saveMove(gameId, moveData)
    → POST /moves/{gameId}.json
    → Guarda cada movimiento
    
  getGameMoveHistory(gameId)
    → GET /moves/{gameId}.json
    → Retorna todos los movimientos
}
```

**Datos Guardados:**
```javascript
{
  currentPlayer: "white" | "black",
  moveCount: number,
  moves: [
    "Peón: (1,4) -> (3,4)",
    "Peón: (6,4) -> (4,4)",
    ...
  ],
  isGameOver: boolean,
  winner: "white" | "black" | null,
  whiteName: "Eduardo",      // Nuevo
  blackName: "Computadora",  // Nuevo
  timestamp: Date,
  playerMoveCounts: {        // Nuevo
    white: 2,
    black: 2
  }
}
```

---

### **userService.js - Estadísticas del Usuario**

```javascript
class UserService {
  // Guardar perfil
  saveUserProfile(userId, name)
    → PUT /users/{userId}/name.json
    
  // Guardar estadísticas
  saveUserStats(userId, stats)
    → PUT /users/{userId}/stats.json
    → Actualiza victorias/derrotas/empates
    
  // Obtener estadísticas
  getUserStats(userId)
    → GET /users/{userId}/stats.json
    → Retorna historial del usuario
}
```
**Estructura:**
```javascript
{
  name: "Eduardo",
  wins: 15,
  losses: 7,
  draws: 3,
  rating: 1650,
  totalGames: 25,
  lastUpdated: "2025-12-06"
}
```
---
## 📊 Tipos y Constantes

### **types/index.js**

```javascript
// Colores de piezas
export const Color = {
  WHITE: 'white',
  BLACK: 'black'
};

// Tipos de piezas
export const PieceType = {
  PAWN: 'pawn',
  KNIGHT: 'knight',
  BISHOP: 'bishop',
  ROOK: 'rook',
  QUEEN: 'queen',
  KING: 'king'
};

// Interfaz de Posición
export class Position {
  constructor(row, col) {
    this.row = row;  // 0-7
    this.col = col;  // 0-7
  }
}
```
---
### **utils/constants.js**

```javascript
export const BOARD_SIZE = 8;

// Colores del tablero
export const BOARD_COLOR_LIGHT = '#f0d9b5';   // Casillas claras
export const BOARD_COLOR_DARK = '#b58863';    // Casillas oscuras

// Resaltes
export const HIGHLIGHT_COLOR = '#baca44';     // Movimientos válidos (verde-amarillo)
export const CHECK_COLOR = '#f48024';         // Jaque (rojo-naranja)
export const SELECTED_COLOR = '#ffd700';      // Pieza seleccionada (amarillo)

// Tamaños
export const SQUARE_SIZE = 60;                // Tamaño de casilla
export const PIECE_SIZE = 50;                 // Tamaño de pieza
```
---

## 🔤 Archivos Importantes y Sus Funciones

| Archivo | Función |
|---------|---------|
| `App.jsx` | Navegación principal y gestión de estado global |
| `HomeScreen.jsx` | Pantalla inicial con nombres de jugadores |
| `GameScreen.jsx` | Pantalla principal de juego |
| `Board.jsx` | Tablero interactivo 8x8 |
| `Piece.jsx` | Renderizado de pieza individual |
| `AnimatedPiece.jsx` | Pieza con animación de movimiento |
| `Game.js` | Orquestador principal del juego |
| `Board.js` | Matriz 8x8 con lógica de tablero |
| `Piece.js` | Clase de pieza (datos) |
| `Move.js` | Registro de movimiento |
| `moveValidator.js` | Valida movimientos legales |
| `pieceMovement.js` | Calcula movimientos posibles |
| `gameRules.js` | Detecta jaque/jaque mate/tablas |
| `gameService.js` | Guarda/carga partidas en Firebase |
| `userService.js` | Guarda/carga perfil de usuario |
---

## 🔧 Tecnologías Utilizadas
- **React Native 0.82.1**: Framework móvil multiplataforma
- **JavaScript ES6**: Lenguaje de programación
- **Firebase Realtime Database**: Base de datos en la nube
- **React Hooks**: useState, useEffect para manejo de estado
- **Animated API**: Animaciones nativas
- **StyleSheet**: Estilos nativos de React Native
- **Unicode Symbols**: Caracteres para las piezas de ajedrez

---
## 💾 Guardar y Cargar Partidas
```javascript
// En GameScreen
const handleSaveGame = async () => {
  const gameData = {
    currentPlayer: game.getCurrentPlayer(),
    moveCount: game.getMoveHistory().length,
    moves: game.getMoveHistory().map(m => m.toString()),
    isGameOver: game.isGameFinished(),
    winner: game.getWinner(),
    whiteName: whiteName,
    blackName: blackName,
    playerMoveCounts: {
      white: whiteMoveCount,
      black: blackMoveCount
    }
  };
  
  await gameService.saveGame(gameId, gameData);
  Alert.alert('Éxito', '¡Partida guardada!');
};
```
### Cargar
```javascript
const handleLoadGame = async () => {
  const loadedGame = await gameService.loadGame(gameId);
  if (loadedGame) {
    // Restaurar estado
    setWhiteName(loadedGame.whiteName);
    setBlackName(loadedGame.blackName);
    Alert.alert('Éxito', `Partida cargada: ${loadedGame.moveCount} movimientos`);
  }
};
```
---
## 🎯 Características Principales

✅ **Ajedrez completo**: Todas las piezas se mueven correctamente  
✅ **Reglas de ajedrez**: Valida movimientos legales  
✅ **Jaque y jaque mate**: Detecta automáticamente  
✅ **Animaciones**: Movimientos suaves de piezas  
✅ **Contador de movimientos**: Sigue cuántos ha hecho cada uno  
✅ **Modo oscuro**: Toggle entre claro y oscuro  
✅ **Historial de movimientos**: Ve todos los movimientos  
✅ **Deshacer**: Revierte el último movimiento  
✅ **Nueva partida**: Reinicia el juego  
✅ **Firebase**: Guarda y carga partidas en la nube  
✅ **Interfaz intuitiva**: Fácil de usar  

---
## 🚀 Cómo Compilar y Ejecutar
```bash
# Clonar o navegar al proyecto
cd c:\JuegoAjedrez\JuegoAjedrez

# Instalar dependencias
npm install

# Compilar para Android
npm run android

# Compilar para iOS (en Mac)
npm run ios

# Iniciar Metro Bundler (si es necesario)
npm start
```
---
## ✨ Posibles Mejoras Futuras
1. Implementar IA (Computadora como oponente)
2. Sistema de rating Elo
3. Análisis de partidas (movimientos mejores/peores)
4. Multijugador en línea
5. Chat entre jugadores
6. Deshacer múltiples movimiento