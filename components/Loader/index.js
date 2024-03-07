import React from "react";
import { StyleSheet, ActivityIndicator, View } from "react-native";
import PropTypes from "prop-types";

const Loader = ({ show }) => {
  return show ? (
    <View style={styles.container}>
      <ActivityIndicator color="#00ff00" size="large" />
    </View>
  ) : null;
};

Loader.propTypes = {
  show: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    position: "relative",
    // top: 0,
    // bottom: 0,
    // left: 0,
    // right: 0,
    width: "100%",
    height: "100%",
  },
});

export default Loader;
