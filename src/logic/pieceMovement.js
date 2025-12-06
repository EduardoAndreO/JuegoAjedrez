import { PieceType, Color } from '../types/index.js';

export class PieceMovement {
  static getPawnMoves(board, position, color) {
    const moves = [];
    const direction = color === Color.WHITE ? -1 : 1;
    const startRow = color === Color.WHITE ? 6 : 1;

    // Forward move
    const forwardPos = { row: position.row + direction, col: position.col };
    if (board.isPositionValid(forwardPos) && !board.getPiece(forwardPos)) {
      moves.push(forwardPos);

      // Double move from starting position
      if (position.row === startRow) {
        const doublePos = { row: position.row + 2 * direction, col: position.col };
        if (!board.getPiece(doublePos)) {
          moves.push(doublePos);
        }
      }
    }

    // Diagonal captures
    for (let colOffset of [-1, 1]) {
      const capturePos = { row: position.row + direction, col: position.col + colOffset };
      if (board.isPositionValid(capturePos)) {
        const targetPiece = board.getPiece(capturePos);
        if (targetPiece && targetPiece.color !== color) {
          moves.push(capturePos);
        }
      }
    }

    return moves;
  }

  static getKnightMoves(board, position, color) {
    const moves = [];
    const knightOffsets = [
      [-2, -1], [-2, 1], [-1, -2], [-1, 2],
      [1, -2], [1, 2], [2, -1], [2, 1]
    ];

    for (const [rowOffset, colOffset] of knightOffsets) {
      const newPos = { row: position.row + rowOffset, col: position.col + colOffset };
      if (board.isPositionValid(newPos)) {
        const targetPiece = board.getPiece(newPos);
        if (!targetPiece || targetPiece.color !== color) {
          moves.push(newPos);
        }
      }
    }

    return moves;
  }

  static getBishopMoves(board, position, color) {
    const moves = [];
    const diagonals = [[-1, -1], [-1, 1], [1, -1], [1, 1]];

    for (const [rowDir, colDir] of diagonals) {
      let row = position.row + rowDir;
      let col = position.col + colDir;

      while (board.isPositionValid({ row, col })) {
        const targetPiece = board.getPiece({ row, col });
        if (!targetPiece) {
          moves.push({ row, col });
        } else {
          if (targetPiece.color !== color) {
            moves.push({ row, col });
          }
          break;
        }
        row += rowDir;
        col += colDir;
      }
    }

    return moves;
  }

  static getRookMoves(board, position, color) {
    const moves = [];
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

    for (const [rowDir, colDir] of directions) {
      let row = position.row + rowDir;
      let col = position.col + colDir;

      while (board.isPositionValid({ row, col })) {
        const targetPiece = board.getPiece({ row, col });
        if (!targetPiece) {
          moves.push({ row, col });
        } else {
          if (targetPiece.color !== color) {
            moves.push({ row, col });
          }
          break;
        }
        row += rowDir;
        col += colDir;
      }
    }

    return moves;
  }

  static getQueenMoves(board, position, color) {
    return [
      ...this.getRookMoves(board, position, color),
      ...this.getBishopMoves(board, position, color)
    ];
  }

  static getKingMoves(board, position, color) {
    const moves = [];
    const kingOffsets = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1], [0, 1],
      [1, -1], [1, 0], [1, 1]
    ];

    for (const [rowOffset, colOffset] of kingOffsets) {
      const newPos = { row: position.row + rowOffset, col: position.col + colOffset };
      if (board.isPositionValid(newPos)) {
        const targetPiece = board.getPiece(newPos);
        if (!targetPiece || targetPiece.color !== color) {
          moves.push(newPos);
        }
      }
    }

    return moves;
  }
}
