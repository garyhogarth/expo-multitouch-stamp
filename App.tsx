import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { MultiTap } from "./src/MultiTap";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <MultiTap numberOfTouches={5} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
