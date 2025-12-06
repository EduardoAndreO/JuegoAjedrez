import { PieceType, Color } from '../types/index.js';

export class Piece {
  constructor(type, color, position) {
    this.type = type;
    this.color = color;
    this.position = position;
    this.id = `${color}-${type}-${position.row}-${position.col}`;
    this.hasMoved = false;
  }

  moveTo(newPosition) {
    this.position = newPosition;
    this.hasMoved = true;
  }

  getPieceSymbol() {
    const symbols = {
      [PieceType.PAWN]: '♟',
      [PieceType.KNIGHT]: '♞',
      [PieceType.BISHOP]: '♝',
      [PieceType.ROOK]: '♜',
      [PieceType.QUEEN]: '♛',
      [PieceType.KING]: '♚'
    };
    return symbols[this.type];
  }

  getType() {
    return this.type;
  }

  getColor() {
    return this.color;
  }
}
