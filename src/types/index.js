// Enumeraciones para tipos de piezas
export const PieceType = {
  PAWN: 'pawn',
  KNIGHT: 'knight',
  BISHOP: 'bishop',
  ROOK: 'rook',
  QUEEN: 'queen',
  KING: 'king'
};

// Enumeraciones para colores
export const Color = {
  WHITE: 'white',
  BLACK: 'black'
};

// Constantes útiles
export const POSITION = {
  row: 0,
  col: 0
};

export const MOVE_RECORD = {
  from: { row: 0, col: 0 },
  to: { row: 0, col: 0 },
  piece: PieceType.PAWN,
  capturedPiece: null,
  timestamp: new Date()
};
