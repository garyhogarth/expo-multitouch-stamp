import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  NativeTouchEvent,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { MultiTap } from "./src/MultiTap";

export default function App() {
  const [touches, setTouches] = useState<NativeTouchEvent[]>([]);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <MultiTap onPress={setTouches} numberOfTouches={3}>
        {/* <TouchableHighlight onPress={() => alert("box tapped!")}> */}
        <View style={styles.box}>
          {touches.map((touch: NativeTouchEvent) => (
            <View
              style={[
                styles.marker,
                { top: touch.locationY, left: touch.locationX },
              ]}
            />
          ))}
        </View>
        {/* </TouchableHighlight> */}
      </MultiTap>
      <View>
        {touches.map((touch: NativeTouchEvent) => (
          <Text>
            {touch.locationX},{touch.locationY}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: "#cc0000",
    width: 500,
    height: 500,
    borderRadius: 5,
  },
  marker: {
    position: "absolute",
    backgroundColor: "#fff",
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  container: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
