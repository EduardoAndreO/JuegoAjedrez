import { Piece } from './Piece.js';
import { PieceType, Color } from '../types/index.js';
import { BOARD_SIZE } from '../utils/constants.js';

export class Board {
  constructor() {
    this.squares = [];
    this.initializeBoard();
  }

  initializeBoard() {
    // Crear tablero vacío
    for (let row = 0; row < BOARD_SIZE; row++) {
      this.squares[row] = [];
      for (let col = 0; col < BOARD_SIZE; col++) {
        this.squares[row][col] = null;
      }
    }

    // Colocar piezas iniciales
    this.setupPieces();
  }

  setupPieces() {
    // Peones blancos
    for (let col = 0; col < BOARD_SIZE; col++) {
      this.squares[6][col] = new Piece(PieceType.PAWN, Color.WHITE, { row: 6, col });
    }

    // Peones negros
    for (let col = 0; col < BOARD_SIZE; col++) {
      this.squares[1][col] = new Piece(PieceType.PAWN, Color.BLACK, { row: 1, col });
    }

    // Piezas blancas
    this.squares[7][0] = new Piece(PieceType.ROOK, Color.WHITE, { row: 7, col: 0 });
    this.squares[7][1] = new Piece(PieceType.KNIGHT, Color.WHITE, { row: 7, col: 1 });
    this.squares[7][2] = new Piece(PieceType.BISHOP, Color.WHITE, { row: 7, col: 2 });
    this.squares[7][3] = new Piece(PieceType.QUEEN, Color.WHITE, { row: 7, col: 3 });
    this.squares[7][4] = new Piece(PieceType.KING, Color.WHITE, { row: 7, col: 4 });
    this.squares[7][5] = new Piece(PieceType.BISHOP, Color.WHITE, { row: 7, col: 5 });
    this.squares[7][6] = new Piece(PieceType.KNIGHT, Color.WHITE, { row: 7, col: 6 });
    this.squares[7][7] = new Piece(PieceType.ROOK, Color.WHITE, { row: 7, col: 7 });

    // Piezas negras
    this.squares[0][0] = new Piece(PieceType.ROOK, Color.BLACK, { row: 0, col: 0 });
    this.squares[0][1] = new Piece(PieceType.KNIGHT, Color.BLACK, { row: 0, col: 1 });
    this.squares[0][2] = new Piece(PieceType.BISHOP, Color.BLACK, { row: 0, col: 2 });
    this.squares[0][3] = new Piece(PieceType.QUEEN, Color.BLACK, { row: 0, col: 3 });
    this.squares[0][4] = new Piece(PieceType.KING, Color.BLACK, { row: 0, col: 4 });
    this.squares[0][5] = new Piece(PieceType.BISHOP, Color.BLACK, { row: 0, col: 5 });
    this.squares[0][6] = new Piece(PieceType.KNIGHT, Color.BLACK, { row: 0, col: 6 });
    this.squares[0][7] = new Piece(PieceType.ROOK, Color.BLACK, { row: 0, col: 7 });
  }

  getPiece(position) {
    return this.squares[position.row][position.col];
  }

  setPiece(position, piece) {
    this.squares[position.row][position.col] = piece;
  }

  isPositionValid(position) {
    return position.row >= 0 && position.row < BOARD_SIZE && position.col >= 0 && position.col < BOARD_SIZE;
  }

  getSquares() {
    return this.squares;
  }

  movePiece(from, to) {
    const piece = this.getPiece(from);
    if (piece) {
      this.setPiece(to, piece);
      this.setPiece(from, null);
      piece.moveTo(to);
      return true;
    }
    return false;
  }
}
