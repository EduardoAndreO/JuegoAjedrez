import { Game } from '../src/data-structures/Game.js';

const game = new Game();
console.log('Jugador actual:', game.getCurrentPlayer());
console.log('Movimiento intentado: Peón blanco de (6,0) a (5,0)');
const ok = game.makeMove({ row: 6, col: 0 }, { row: 5, col: 0 });
console.log('Movimiento válido?', ok);
console.log('Jugador ahora:', game.getCurrentPlayer());
console.log('Pieza en (5,0):', game.getBoard().getPiece({ row: 5, col: 0 })?.getType());
console.log('Pieza en (6,0):', game.getBoard().getPiece({ row: 6, col: 0 }));
