import { PieceType, Color } from '../types/index.js';
import { BOARD_SIZE } from '../utils/constants.js';

export class MoveValidator {
  static isValidMove(board, from, to) {
    const piece = board.getPiece(from);

    if (!piece) {
      return false;
    }

    if (!board.isPositionValid(to)) {
      return false;
    }

    const targetPiece = board.getPiece(to);
    if (targetPiece && targetPiece.color === piece.color) {
      return false;
    }

    switch (piece.type) {
      case PieceType.PAWN:
        return this.isValidPawnMove(board, from, to, piece.color);
      case PieceType.KNIGHT:
        return this.isValidKnightMove(from, to);
      case PieceType.BISHOP:
        return this.isValidBishopMove(board, from, to);
      case PieceType.ROOK:
        return this.isValidRookMove(board, from, to);
      case PieceType.QUEEN:
        return this.isValidQueenMove(board, from, to);
      case PieceType.KING:
        return this.isValidKingMove(board, from, to);
      default:
        return false;
    }
  }

  static isValidPawnMove(board, from, to, color) {
    const direction = color === Color.WHITE ? -1 : 1;
    const startRow = color === Color.WHITE ? 6 : 1;

    if (to.col === from.col && !board.getPiece(to)) {
      if (to.row === from.row + direction) {
        return true;
      }
      if (from.row === startRow && to.row === from.row + 2 * direction && !board.getPiece({ row: from.row + direction, col: from.col })) {
        return true;
      }
    }

    if (Math.abs(to.col - from.col) === 1 && to.row === from.row + direction && board.getPiece(to)) {
      return true;
    }

    return false;
  }

  static isValidKnightMove(from, to) {
    const rowDiff = Math.abs(to.row - from.row);
    const colDiff = Math.abs(to.col - from.col);
    return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
  }

  static isValidBishopMove(board, from, to) {
    if (Math.abs(to.row - from.row) !== Math.abs(to.col - from.col)) {
      return false;
    }
    return this.isPathClear(board, from, to);
  }

  static isValidRookMove(board, from, to) {
    if (from.row !== to.row && from.col !== to.col) {
      return false;
    }
    return this.isPathClear(board, from, to);
  }

  static isValidQueenMove(board, from, to) {
    return this.isValidRookMove(board, from, to) || this.isValidBishopMove(board, from, to);
  }

  static isValidKingMove(board, from, to) {
    return Math.abs(to.row - from.row) <= 1 && Math.abs(to.col - from.col) <= 1 && !(to.row === from.row && to.col === from.col);
  }

  static isPathClear(board, from, to) {
    const rowDirection = to.row > from.row ? 1 : to.row < from.row ? -1 : 0;
    const colDirection = to.col > from.col ? 1 : to.col < from.col ? -1 : 0;

    let currentRow = from.row + rowDirection;
    let currentCol = from.col + colDirection;

    while (currentRow !== to.row || currentCol !== to.col) {
      if (board.getPiece({ row: currentRow, col: currentCol })) {
        return false;
      }
      currentRow += rowDirection;
      currentCol += colDirection;
    }

    return true;
  }
}
