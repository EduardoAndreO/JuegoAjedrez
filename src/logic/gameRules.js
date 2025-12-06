import { Color, PieceType } from '../types/index.js';
import { MoveValidator } from './moveValidator.js';

export class GameRules {
  static isCheck(board, color) {
    const kingPos = this.findKing(board, color);
    if (!kingPos) return false;
    return this.isPositionUnderAttack(board, kingPos, color);
  }

  static isCheckmate(board, color) {
    if (!this.isCheck(board, color)) return false;
    return !this.hasValidMoves(board, color);
  }

  static isStalemate(board, color) {
    if (this.isCheck(board, color)) return false;
    return !this.hasValidMoves(board, color);
  }

  static hasValidMoves(board, color) {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board.getPiece({ row, col });
        if (piece && piece.color === color) {
          for (let toRow = 0; toRow < 8; toRow++) {
            for (let toCol = 0; toCol < 8; toCol++) {
              if (MoveValidator.isValidMove(board, { row, col }, { row: toRow, col: toCol })) {
                return true;
              }
            }
          }
        }
      }
    }
    return false;
  }

  static findKing(board, color) {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board.getPiece({ row, col });
        if (piece && piece.type === PieceType.KING && piece.color === color) {
          return { row, col };
        }
      }
    }
    return null;
  }

  static isPositionUnderAttack(board, position, friendlyColor) {
    const enemyColor = friendlyColor === Color.WHITE ? Color.BLACK : Color.WHITE;

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board.getPiece({ row, col });
        if (piece && piece.color === enemyColor) {
          if (MoveValidator.isValidMove(board, { row, col }, position)) {
            return true;
          }
        }
      }
    }

    return false;
  }
}
