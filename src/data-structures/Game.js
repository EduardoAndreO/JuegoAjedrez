import { Board } from './Board.js';
import { Move } from './Move.js';
import { Color } from '../types/index.js';
import { MoveValidator } from '../logic/moveValidator.js';

export class Game {
  constructor() {
    this.board = new Board();
    this.currentPlayer = Color.WHITE;
    this.moveHistory = [];
    this.isGameOver = false;
    this.winner = null;
  }

  getCurrentPlayer() {
    return this.currentPlayer;
  }

  getMoveHistory() {
    return this.moveHistory;
  }

  isGameFinished() {
    return this.isGameOver;
  }

  getWinner() {
    return this.winner;
  }

  makeMove(from, to) {
    const piece = this.board.getPiece(from);

    if (!piece) {
      return false;
    }

    if (piece.color !== this.currentPlayer) {
      return false;
    }

    // Validate move according to rules
    if (!MoveValidator.isValidMove(this.board, from, to)) {
      return false;
    }

    if (this.board.movePiece(from, to)) {
      const move = new Move(from, to, piece.type);
      this.moveHistory.push(move);
      this.switchPlayer();
      return true;
    }

    return false;
  }

  undoMove() {
    if (this.moveHistory.length === 0) {
      return false;
    }

    const lastMove = this.moveHistory.pop();
    if (lastMove) {
      const piece = this.board.getPiece(lastMove.to);
      if (piece) {
        this.board.movePiece(lastMove.to, lastMove.from);
        this.switchPlayer();
        return true;
      }
    }
    return false;
  }

  switchPlayer() {
    this.currentPlayer = this.currentPlayer === Color.WHITE ? Color.BLACK : Color.WHITE;
  }

  endGame(winner) {
    this.isGameOver = true;
    this.winner = winner;
  }

  getBoard() {
    return this.board;
  }
}
