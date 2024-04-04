import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Main } from 'Main';
import { Text } from 'react-native';

(Text as any).defaultProps = (Text as any).defaultProps || {};
(Text as any).defaultProps.allowFontScaling = false;

const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <Main />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
