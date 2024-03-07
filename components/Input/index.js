import React from "react";
import { Text, TextInput, StyleSheet, View } from "react-native";

export const Input = ({ label, onChange, style, accessibilityLabel, testID }) => (
  <View style={[styles.inputContainer, style]}>
    <Text style={styles.label}>{label}</Text>
    <TextInput style={styles.input} onChangeText={onChange} accessibilityLabel={accessibilityLabel} testID={testID} autoCapitalize="none" />
  </View>
);

const styles = StyleSheet.create({
  label: {
    color: "black",
    marginVertical: 5,
    // height: 10,
  },
  input: {
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 1,
    height: 50,
  },
  inputContainer: {
    width: "100%",
    height: 80,
  },
});
