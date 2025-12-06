export class Move {
  constructor(from, to, piece, capturedPiece) {
    this.from = from;
    this.to = to;
    this.piece = piece;
    this.capturedPiece = capturedPiece;
    this.timestamp = new Date();
  }

  getMoveDetails() {
    return {
      from: this.from,
      to: this.to,
      piece: this.piece,
      capturedPiece: this.capturedPiece,
      timestamp: this.timestamp,
    };
  }

  toString() {
    const names = {
      pawn: 'Peón',
      knight: 'Caballo',
      bishop: 'Alfil',
      rook: 'Torre',
      queen: 'Reina',
      king: 'Rey',
    };
    const pieceName = names[this.piece] || this.piece;
    return `${pieceName}: (${this.from.row}, ${this.from.col}) -> (${this.to.row}, ${this.to.col})`;
  }
}
