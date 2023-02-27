import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableHighlight,
  GestureResponderEvent,
  NativeTouchEvent,
} from "react-native";
import { analysePoints, arePointsARightAngle } from "./utils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
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
});

export const MultiTap = ({
  onPress = (touches: undefined | NativeTouchEvent[]) => null,
  numberOfTouches = 2,
}) => {
  const [touches, setTouches] = useState<NativeTouchEvent[]>([]);
  const [stampResponse, setStampResponse] = useState(null);
  useEffect(() => {
    if (touches.length == numberOfTouches) {
      setStampResponse(null);
      // Get the 4 highest/lowest points
      const points = touches.map((touch: NativeTouchEvent) => ({
        x: touch.locationX,
        y: touch.locationY,
      }));
      setStampResponse(analysePoints(points));
      // setIsValidStamp(arePointsARightAngle(points));
    }
  }, [touches]);

  const onStartShouldSetResponder = (event: GestureResponderEvent) => {
    if (event.nativeEvent.touches.length === numberOfTouches) {
      setTouches(event.nativeEvent.touches);
      return true;
    }

    return false;
  };

  const onResponderRelease = (event: GestureResponderEvent) => {
    // setTimeout(() => {
    //   setTouches([]);
    //   setStampResponse(null);
    // }, 3000);
  };

  return (
    <View
      onStartShouldSetResponder={onStartShouldSetResponder}
      onMoveShouldSetResponder={onStartShouldSetResponder}
      onResponderRelease={onResponderRelease}
      onResponderEnd={onResponderRelease}
    >
      <View
        style={[
          styles.box,
          { backgroundColor: stampResponse?.readable ? "green" : "red" },
        ]}
      >
        {touches.map((touch: NativeTouchEvent) => (
          <View
            key={touch.identifier}
            style={[
              styles.marker,
              { top: touch.locationY, left: touch.locationX },
            ]}
          />
        ))}
      </View>
    </View>
  );
};
