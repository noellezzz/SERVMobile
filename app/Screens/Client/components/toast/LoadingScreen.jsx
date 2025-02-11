import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { AnimatePresence, MotiView } from "moti";
import spinner from "../../../../../assets/loading.gif";

const LoadingScreen = ({ loading }) => (
  <AnimatePresence>
    {loading && (
      <MotiView
        from={{ translateY: 0 }}
        animate={{ translateY: 2000 }}
        transition={{ duration: 1000, type: "timing" }}
        style={styles.container}
      >
        <Image source={spinner} style={styles.image} />
      </MotiView>
    )}
  </AnimatePresence>
);

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
    zIndex: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
});

export default LoadingScreen;
