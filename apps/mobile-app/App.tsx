import React from "react";
import { View, StyleSheet } from "react-native";
import { RandomPicker } from "Main";

const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <RandomPicker />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;