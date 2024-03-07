import React from "react";
import { AuthorizationUI } from "@yaradigitallabs/sh-user-management-native";

import routes from "../../constants/routes";

export const AuthorizationScreen = ({ navigation }) => {
  return (
    <>
      {/**
       These callbacks will be fired after login/logout and might be used to perform routing or any other post processing
       */}
      <AuthorizationUI.FinishLoginCallback callback={() => navigation.navigate(routes.home)} />
      <AuthorizationUI.FinishLogoutCallback callback={() => navigation.navigate(routes.login)} />
      <AuthorizationUI />
    </>
  );
};
