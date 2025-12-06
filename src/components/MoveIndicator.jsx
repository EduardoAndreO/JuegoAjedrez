import React from 'react';
import { View, StyleSheet } from 'react-native';

const MoveIndicator = ({ validMoves }) => {
  return (
    <View style={styles.container}>
      {validMoves.map((move, index) => (
        <View
          key={index}
          style={[
            styles.indicator,
            {
              top: move.row * 50 + 8,
              left: move.col * 50 + 8,
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
  },
  indicator: {
    position: 'absolute',
    width: 10,
    height: 10,
    backgroundColor: 'rgba(170, 162, 65, 0.8)',
    borderRadius: 5,
  },
});

export default MoveIndicator;
