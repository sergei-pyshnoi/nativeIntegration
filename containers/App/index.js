import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthorizationUI, NativeUserManagementContext } from "@yaradigitallabs/sh-user-management-native";
import HomeScreen from "../../screens/HomeScreen";
import LoginScreen from "../../screens/LoginScreen";
import routes from "../../constants/routes";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "../../contexts/auth";
import { RequireAuthHOC } from "../../HOCs/requireAuthHOC";
import { RequireUnauthHOC } from "../../HOCs/requireUnauthHOC";
import { AuthorizationScreen } from "../../screens/AuthorizationScreen";
import { Linking, LogBox } from "react-native";
import { skipLoginOption } from "../../constants/generic";

import getAuthProviderConfig from "../../utils/getAuthProviderConfig";
const { Navigator, Screen } = createStackNavigator();
import { SKIP_LOGIN_TYPE } from "@env";

const screenOptions = {
  title: "My home",
  headerStyle: {
    backgroundColor: "black",
  },
  headerTintColor: "#fff",
};


export const envs = {
  debug: "debug",
  local: "local",
  stage: "stage",
  preprod: "preprod",
  production: "production",
};

export const regions = {
  INDIA: "INDIA",
  KENYA: "KENYA",
  THAILAND: "THAILAND",
  PHILIPPINES: "PHILIPPINES",
  EUROPE: "EUROPE",
  GUATEMALA: "GUATEMALA",
  COSTA_RICA: "COSTA_RICA",
  ZAMBIA: "ZAMBIA",
  COLOMBIA: "COLOMBIA",
};

/**
 * Storage passed to the user management context must correspond to the common interface
 * Required methods
 * + getItem(key: string): Promise<any>
 * + setItem(key: string, value: any): Promise<void>;
 * + removeItem(key: string): Promise<void>;
 *
 * In order to pass your own implementation of storage just make appropriate wrapper for that.
 */
const storage = AsyncStorage;

// domain: 'coffeeclub-dev.auth0.com',
// clientId: 'JKPnm3IAO3XSwR8e6n6iPSluSlx2bEaR',

// Linking.addEventListener("url", (data) => {
//   console.log("Deep linking URL from POC", data);
// });

// warnings disabling
LogBox.ignoreAllLogs();

const analyticsInfo = {
  analyticsId: "MY_NEW_ID",
};

const App = () => {
  const [selectedEnv, setSelectedEnv] = useState("local");
  const [selectedRegion, setSelectedRegion] = useState("india");
  const [language, setLanguage] = useState("en");
  const [selectedApp, setSelectedApp] = useState("farmCare");
  const [anId, setAnId] = useState("PASSED_ANONYMOUS_ID");

  const [rememberAuthSession, setRememberAuthSession] = useState(false);
  const [enableInnerSkipLogin, setEnableInnerSkipLogin] = useState(false);
  const [enableSkipLogin, setEnableSkipLogin] = useState(true);
  const [notification, setNotification] = useState("");

  const handleSetNotification = (notice) => {
    setNotification(notice);
  };

  return (
    <NavigationContainer>
      <NativeUserManagementContext
        authProviderConfig={getAuthProviderConfig(selectedApp)}
        notificationSetter={handleSetNotification}
        language={language}
        region={selectedRegion}
        tenant={selectedEnv}
        storage={storage}
        enableOtpAutoFill={enableSkipLogin}
        enableInnerSkipLogin={enableInnerSkipLogin}
        enableSkipLogin={enableSkipLogin}
        analyticsInfo={{
          analyticsId: anId,
          appVersion: "1234567-test",
        }}
        authStateRemembering={rememberAuthSession}
      >
        {/**
         Comment it to NOT use the authorization UI as a modal
         */}
        <AuthorizationUI type="modal" />
        <AuthContext>
          <Navigator initialRouteName={routes.login}>
            <Screen key={routes.login} name={routes.login} options={screenOptions}>
              {(props) => (
                <RequireUnauthHOC>
                  <LoginScreen
                    {...props}
                    selectedEnv={selectedEnv}
                    onEnvSelected={setSelectedEnv}
                    language={language}
                    onSetLanguage={setLanguage}
                    selectedRegion={selectedRegion}
                    onRegionSelected={setSelectedRegion}
                    selectedApp={selectedApp}
                    onAppSelected={setSelectedApp}
                    rememberAuthSession={rememberAuthSession}
                    onRememberAuthSessionUpdated={setRememberAuthSession}
                    enableInnerSkipLogin={enableInnerSkipLogin}
                    onEnableInnerSkipLogin={setEnableInnerSkipLogin}
                    enableSkipLogin={enableSkipLogin}
                    onEnableSkipLogin={setEnableSkipLogin}
                    notification={notification}
                  />
                </RequireUnauthHOC>
              )}
            </Screen>
            <Screen
              key={routes.home}
              name={routes.home}
              options={{
                ...screenOptions,
                headerShown: false,
                callback: setAnId,
              }}
            >
              {() => (
                <RequireAuthHOC>
                  <HomeScreen setAnId={setAnId} />
                </RequireAuthHOC>
              )}
            </Screen>
            <Screen
              key={routes.authorization}
              name={routes.authorization}
              component={AuthorizationScreen}
              options={{
                ...screenOptions,
                headerShown: false,
              }}
            />
          </Navigator>
        </AuthContext>
      </NativeUserManagementContext>
    </NavigationContainer>
  );
};

export default App;
