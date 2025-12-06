import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import PieceComponent from './Piece.jsx';

const AnimatedPiece = ({ piece, position, isSelected, isValidMove, squareSize = 60 }) => {
  const [animatedPos] = useState(new Animated.ValueXY({ x: 0, y: 0 }));
  const [prevPosition, setPrevPosition] = useState(position);

  useEffect(() => {
    if (prevPosition && (prevPosition.row !== position.row || prevPosition.col !== position.col)) {
      // Pieza se movió, animar la transición
      const fromX = prevPosition.col * squareSize;
      const fromY = prevPosition.row * squareSize;
      const toX = position.col * squareSize;
      const toY = position.row * squareSize;

      animatedPos.setValue({ x: fromX - toX, y: fromY - toY });

      Animated.spring(animatedPos, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: false,
        speed: 15,
        bounciness: 3,
      }).start();
    }
    setPrevPosition(position);
  }, [position, squareSize, animatedPos]);

  if (!piece) return null;

  return (
    <Animated.View
      style={[
        styles.animatedContainer,
        {
          transform: animatedPos.getLayout().transform,
        },
      ]}
    >
      <PieceComponent piece={piece} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  animatedContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AnimatedPiece;
