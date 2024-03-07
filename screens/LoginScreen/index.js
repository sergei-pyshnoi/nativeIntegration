// import {AuthorizationUI} from '@yaradigitallabs/sh-user-management-native';
import CheckBox from "@react-native-community/checkbox";
import React, { useContext, useEffect, useState } from "react";
import { Button, StyleSheet, View, Text, ScrollView, Alert } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { Platform } from "react-native";

import { AuthContext } from "../../contexts/auth";
import routes, { LOGIN_TYPES } from "../../constants/routes";

import testProperties from "../../utils/testProperties";
import { appData, regionData, envData, langData } from "../../utils/data";

import { RNSelectPicker } from "@yaradigitallabs/ahua-react-native";

import SelectPicker from "react-native-select-picker-dropdown";
const LoginScreen = ({
  navigation,
  notification,
  selectedEnv,
  onEnvSelected,
  language,
  onSetLanguage,
  selectedRegion,
  onRegionSelected,
  selectedApp,
  onAppSelected,
  rememberAuthSession,
  enableInnerSkipLogin,
  enableSkipLogin,
  onRememberAuthSessionUpdated,
  onEnableInnerSkipLogin,
  onEnableSkipLogin,
}) => {
  const { login, logout, forceLogin, logoutViaBrowser, forceLoginViaBrowser, changeSelectedLoginType } = useContext(AuthContext.context);

  const { navigate } = useNavigation();

  useEffect(() => {
    console.log("language: " + language);
    console.log("env: " + selectedEnv);
    console.log("region: " + selectedRegion);
    console.log("app: " + selectedApp);
  }, [language, selectedEnv, selectedRegion, selectedApp]);

  useEffect(() => {
    notification && Alert.alert(notification);
  }, [notification]);

  const [selected, setSelected] = useState();
  return (
    <ScrollView
      // eslint-disable-next-line react-native/no-inline-styles
      contentContainerStyle={{
        flexGrow: 1,
      }}
    >
      <View style={styles.container}>
        <Text style={{ ...styles.sectionHeader }}>Language code</Text>
        {/* <RNSelectPicker
          {...testProperties("langInput")}
          pickerOptions={langData}
          type={"flat"}
          defaultValue={langData.find((l) => l.value === language)}
          onValueChange={(val) => {
            if (Platform.OS === "android") {
              return onSetLanguage(val.newValue.value);
            }
            language = val.newValue.value;
          }}
          onBlur={() => {
            if (Platform.OS === "ios") {
              onSetLanguage(language);
            }
          }}
      /> */}
        <SelectPicker
               pickerProps={{
                  ...testProperties("langInput")
                }}
              
                placeholder={{label: 'Select a language'}}
                onUpArrow={(selected) => setSelected(selected - 1 )}
                onDownArrow={(selected) => setSelected(selected + 1)}
                onValueChange={(language) =>  onSetLanguage(language)}
                items={langData}
             />


        <Text style={styles.sectionHeader}>Available envs</Text>
        {/* <SelectPicker
          {...testProperties("envInput")}
          pickerOptions={envData}
          type={"flat"}
          defaultValue={envData.find((e) => e.value === selectedEnv)}
          onValueChange={(val) => {
            if (Platform.OS === "android") {
              return onEnvSelected(val.newValue.value);
            }

            selectedEnv = val.newValue.value;
          }}
          onBlur={() => {
            if (Platform.OS === "ios") {
              onEnvSelected(selectedEnv);
            }
          }}
        /> */}
           <SelectPicker
               pickerProps={{
                  ...testProperties("envInput")
                }}
                placeholder={{label: 'Select a environment'}}
                onValueChange={(selectedEnv) =>  onEnvSelected(selectedEnv)}
                items={envData}
             />

        <Text style={styles.subHeader}>Regions</Text>
        {/* <SelectPicker
          {...testProperties("regionInput")}
          pickerOptions={regionData}
          type={"flat"}
          defaultValue={regionData.find((r) => r.value === selectedRegion)}
          onValueChange={(val) => {
            if (Platform.OS === "android") {
              return onRegionSelected(val.newValue.value);
            }

            selectedRegion = val.newValue.value;
          }}
          onBlur={() => {
            if (Platform.OS === "ios") {
              onRegionSelected(selectedRegion);
            }
          }}
        /> */}
          <SelectPicker
               pickerProps={{
                  ...testProperties("regionInput")
                }}
                placeholder={{label: 'Select a region'}}
                onValueChange={(selectedRegion) =>  onRegionSelected(selectedRegion)}
                items={regionData}
             />

        <Text style={styles.subHeader}>Apps</Text>
        {/* <SelectPicker
          {...testProperties("appInput")}
          pickerOptions={appData}
          type={"flat"}
          defaultValue={appData.find((a) => a.value === selectedApp)}
          onValueChange={(val) => {
            if (Platform.OS === "android") {
              return onAppSelected(val.newValue.value);
            }

            selectedApp = val.newValue.value;
          }}
          onBlur={() => {
            if (Platform.OS === "ios") {
              onAppSelected(selectedApp);
            }
          }}
        /> */}
        <SelectPicker
            pickerProps={{
              ...testProperties("appInput")
            }}  
        
            placeholder={{label: 'Select an app'}}
            onValueChange={(selectedApp) =>  onAppSelected(selectedApp)}
            items={appData}
        />

    
        <View style={styles.row}>
       
          <Text>{"\n"}Remember auth session:</Text>
          <View>
            <CheckBox value={rememberAuthSession} onValueChange={onRememberAuthSessionUpdated} {...testProperties("authCheck")} />
          </View>
        </View>
        <View style={styles.row}>
        
          <View style={styles.row}>
            <Text>InnerSkipLogin:</Text>
            <View>
              <CheckBox value={enableInnerSkipLogin} onValueChange={onEnableInnerSkipLogin} {...testProperties("enableInnerSkipLogin")} />
            </View>
          </View>
          <View style={styles.row}>
            <Text>SkipLogin:</Text>
            <View>
              <CheckBox value={enableSkipLogin} onValueChange={onEnableSkipLogin} {...testProperties("enableSkipLogin")} />
            </View>
          </View>
        </View>
        <View style={{ height: 270, justifyContent: "flex-start" }}>
          {[
            (props) => (
              <Button
                {...props}
                key="Force log in via browser"
                title="Force log in via browser"
                {...testProperties("forceLoginViaBrowser")}
                onPress={forceLoginViaBrowser}
              />
            ),
            (props) => (
              <Button
                {...props}
                key="Logout via browser"
                title="Logout via browser"
                {...testProperties("logoutViaBrowser")}
                onPress={logoutViaBrowser}
              />
            ),
            (props) => <Button {...props} key="Log in" title="Log in" onPress={login} {...testProperties("login")} />,
            (props) => <Button {...props} key="Force log in" title="Force log in" {...testProperties("forceLogin")} onPress={forceLogin} />,
            (props) => <Button {...props} key="Log out" title="Log out" {...testProperties("logOut")} onPress={logout} />,
          ].map((Btn, index) => (
            <Btn key={index} color="#000" />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: "row",
  },
  container: {
    flex: 1,
    justifyContent: "space-around",
    paddingHorizontal: 20,
  },
  sectionHeader: {
    textAlign: "center",
    marginBottom: 10,
    textTransform: "uppercase",
    fontSize: 16,
    marginTop: 10,
  },
  subHeader: {
    textTransform: "uppercase",
    textAlign: "center",
    marginBottom: 10,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
