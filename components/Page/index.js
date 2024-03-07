import React from "react";
import { View } from "react-native";

const Page = ({ children }) => {
  return <View style={{ flex: 1, justifyContent: "center", alightItems: "center" }}>{children}</View>;
};

Page.propTypes = {};

export default Page;
