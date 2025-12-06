import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Piece } from '../data-structures/Piece.js';

const PieceComponent = ({ piece }) => {
  const backgroundColor = piece.color === 'white' ? '#ffffff' : '#1a1a1a';
  const textColor = piece.color === 'white' ? '#1a1a1a' : '#ffffff';

  return (
    <View style={[styles.piece, { backgroundColor }]}>
      <Text style={[styles.pieceText, { color: textColor }]}>
        {piece.getPieceSymbol()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  piece: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#8b7355',
  },
  pieceText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
});

export default PieceComponent;
