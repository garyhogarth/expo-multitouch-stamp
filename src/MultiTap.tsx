import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableHighlight,
  GestureResponderEvent,
  NativeTouchEvent,
} from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export const MultiTap = ({
  onPress = (touches: NativeTouchEvent[]) => null,
  numberOfTouches = 2,
  children,
}) => {
  const [touches, setTouches] = useState<NativeTouchEvent[]>([]);
  const onStartShouldSetResponder = (event: GestureResponderEvent) => {
    if (event.nativeEvent.touches.length === numberOfTouches) {
      setTouches(event.nativeEvent.touches);
      return true;
    }

    return false;
  };

  const onResponderRelease = (event: GestureResponderEvent) => {
    onPress(touches);
  };

  return (
    <View
      onStartShouldSetResponder={onStartShouldSetResponder}
      onMoveShouldSetResponder={onStartShouldSetResponder}
      onResponderRelease={onResponderRelease}
    >
      {children}
    </View>
  );
};
