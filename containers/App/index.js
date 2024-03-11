import React, { useState } from "react";
const storage = AsyncStorage;


const analyticsInfo = {
  analyticsId: "MY_NEW_ID",
};

const App = () => {
  
  return (
    <View style={styles.sectionContainer}>
    <Text
      style={[
        styles.sectionTitle,
        {
          color: isDarkMode ? Colors.white : Colors.black,
        },
      ]}>
      {title}
    </Text>
    <Text
      style={[
        styles.sectionDescription,
        {
          color: isDarkMode ? Colors.light : Colors.dark,
        },
      ]}>
      {children}
    </Text>
  </View>
  );
};

export default App;
