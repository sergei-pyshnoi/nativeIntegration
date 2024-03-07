import React, { useContext, useState, useCallback, useEffect } from "react";
import { Button, Image, StyleSheet, Text, View, ScrollView, Keyboard } from "react-native";

import { AuthContext } from "../../contexts/auth";
import { Input } from "../../components/Input";

import testProperties from "../../utils/testProperties";

const HomeScreen = ({ setAnId }) => {
  const { logout, logoutViaBrowser, userProfile, isAuth0Used, updateUserProfile, getToken } = useContext(AuthContext.context);
  const [fieldValue, setFieldValue] = useState();
  const [fieldName, setFieldName] = useState();
  const [isKeyboardOpened, setIsKeyboardOpened] = useState(false);

  useEffect(() => {
    const onOpen = () => setIsKeyboardOpened(true);
    const onClose = () => setIsKeyboardOpened(false);
    const keyboardDidShowSubscription = Keyboard.addListener("keyboardDidShow", onOpen);
    const keyboardDidHideSubscription = Keyboard.addListener("keyboardDidHide", onClose);

    return () => {
      keyboardDidShowSubscription.remove();
      keyboardDidHideSubscription.remove();
    };
  }, [setIsKeyboardOpened]);

  const updateProfile = useCallback(() => {
    Keyboard.dismiss();
    updateUserProfile({
      [fieldName]: fieldValue,
    }).catch(console.log);
  }, [updateUserProfile, fieldValue, fieldName]);

  const getAToken = async () => {
    try {
      console.log("Get a token start");
      const tokky = await getToken();
      console.log(tokky);
      console.log("Get a token finish");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container} logoutBtn>
      <View style={styles.heading}>
        <Text style={styles.text}>Home Screen</Text>
      </View>
      {userProfile ? (
        <View {...testProperties("userProfile")} style={styles.profileContainer}>
          <ScrollView>
            <View style={styles.imageBox}>{userProfile ? <Image style={styles.image} source={{ uri: userProfile.picture }} /> : null}</View>
            <View>
              <ScrollView>
                <Text {...testProperties("profileObject")}>
                  {JSON.stringify({ isAuth0Used: isAuth0Used ? "YES" : "NO", ...userProfile }, null, 4)}
                </Text>
              </ScrollView>
            </View>
          </ScrollView>
        </View>
      ) : null}
      <View style={styles.inputFields}>
        <Input label="Field" onChange={setFieldName} {...testProperties("inputField")} />
        <Input label="Value" onChange={setFieldValue} style={styles.input} {...testProperties("inputValue")} />
      </View>
      <View style={styles.buttonsContainer}>
        <Button title="Get Token" onPress={getAToken} style={styles.button} {...testProperties("getToken")} />
        <Button title="Update" onPress={updateProfile} style={styles.button} {...testProperties("updateBtn")} />
        {isKeyboardOpened ? null : (
          <Button
            title="Logout"
            onPress={() => {
              console.log("BEFORE");
              setAnId(new Date().getTime());
              console.log("BEFORE");
              logout();
            }}
            style={styles.button}
            {...testProperties("logoutBtn")}
          />
        )}
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  heading: {
    flex: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  profileContainer: {
    flex: 70,
  },
  imageBox: {
    alignItems: "center",
    marginBottom: 15,
    height: 100,
  },
  image: {
    width: 50,
    height: 50,
  },
  inputFields: {
    marginVertical: 5,
  },
  input: {
    marginTop: 5,
  },
  buttonsContainer: {
    height: 100,
    justifyContent: "space-evenly",
  },
});
