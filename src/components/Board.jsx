import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { MoveValidator } from '../logic/moveValidator.js';
import PieceComponent from './Piece.jsx';

const BoardComponent = ({ board, onMove }) => {
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [validMoves, setValidMoves] = useState([]);

  const handleSquarePress = (position) => {
    const piece = board.getPiece(position);

    if (selectedPosition) {
      if (
        selectedPosition.row === position.row &&
        selectedPosition.col === position.col
      ) {
        setSelectedPosition(null);
        setValidMoves([]);
        return;
      }

      if (validMoves.some(m => m.row === position.row && m.col === position.col)) {
        onMove(selectedPosition, position);
        setSelectedPosition(null);
        setValidMoves([]);
        return;
      }
    }

    if (piece) {
      setSelectedPosition(position);
      const moves = [];
      for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
          if (MoveValidator.isValidMove(board, position, { row, col })) {
            moves.push({ row, col });
          }
        }
      }
      setValidMoves(moves);
    } else {
      setSelectedPosition(null);
      setValidMoves([]);
    }
  };

  const isHighlighted = (position) => {
    return selectedPosition ? selectedPosition.row === position.row && selectedPosition.col === position.col : false;
  };

  const isValidMove = (position) => {
    return validMoves.some(m => m.row === position.row && m.col === position.col);
  };

  const renderSquare = (row, col) => {
    const piece = board.getPiece({ row, col });
    const isLight = (row + col) % 2 === 0;

    return (
      <TouchableOpacity
        key={`${row}-${col}`}
        style={[
          styles.square,
          isLight ? styles.lightSquare : styles.darkSquare,
          isHighlighted({ row, col }) && styles.selectedSquare,
          isValidMove({ row, col }) && styles.validMoveSquare,
        ]}
        onPress={() => handleSquarePress({ row, col })}
      >
        {piece && <PieceComponent piece={piece} />}
        {isValidMove({ row, col }) && <View style={styles.moveIndicator} />}
      </TouchableOpacity>
    );
  };

  const renderBoard = () => {
    const squares = [];
    for (let row = 0; row < 8; row++) {
      const rowSquares = [];
      for (let col = 0; col < 8; col++) {
        rowSquares.push(renderSquare(row, col));
      }
      squares.push(
        <View key={row} style={styles.row}>
          {rowSquares}
        </View>
      );
    }
    return squares;
  };

  return <View style={styles.board}>{renderBoard()}</View>;
};

const styles = StyleSheet.create({
  board: {
    flexDirection: 'column',
    backgroundColor: '#8b7355',
    padding: 8,
    borderRadius: 4,
  },
  row: {
    flexDirection: 'row',
  },
  square: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#8b7355',
  },
  lightSquare: {
    backgroundColor: '#f0d9b5',
  },
  darkSquare: {
    backgroundColor: '#b58863',
  },
  selectedSquare: {
    backgroundColor: '#baca44',
  },
  validMoveSquare: {
    backgroundColor: '#a6e3a1',
  },
  moveIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
});

export default BoardComponent;
