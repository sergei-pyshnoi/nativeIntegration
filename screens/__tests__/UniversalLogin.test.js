import React from "react";
import { render, cleanup } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginScreen from "../LoginScreen";
import { AuthContext } from "../../contexts/auth";

import { NativeUserManagementContext } from "@yaradigitallabs/sh-user-management-native";

describe("Login Page With Universal Auth0 Login", () => {
  let instance;
  const storage = AsyncStorage;
  const selectedEnv = "local";
  const DEFAULT_PROPS = {
    authProviderConfig: {
      ["local"]: {
        domain: "SOME_DOMAIN",
        clientId: "SOME_CLIENT_ID",
      },
    },
    LOGIN_PROPS: {
      selectedEnv: "local",
      language: "english",
      selectedRegion: "india",
      selectedApp: "farmCare",
      rememberAuthSession: false,
      notification: false,
    },
  };

  afterEach(cleanup);

  beforeEach(() => {
    instance = (
      <NavigationContainer>
        <NativeUserManagementContext authProviderConfig={DEFAULT_PROPS.authProviderConfig} tenant={selectedEnv} storage={AsyncStorage}>
          <AuthContext>
            <LoginScreen {...DEFAULT_PROPS.LOGIN_PROPS} />
          </AuthContext>
        </NativeUserManagementContext>
      </NavigationContainer>
    );
  });

  test("Matches snapshots", () => {
    const snapshot = render(instance).toJSON();
    expect(snapshot).toMatchSnapshot();
  });
});
