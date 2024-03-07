import React, { useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";

import { AuthContext } from "../contexts/auth";
import routes, { LOGIN_TYPES } from "../constants/routes";

export const RequireUnauthHOC = ({ children }) => {
  const { accessToken, selectedLoginType } = useContext(AuthContext.context);

  const { navigate } = useNavigation();

  useEffect(() => {
    console.log("Effect Got called with selectedLoginType ====>", selectedLoginType);
    if (selectedLoginType !== LOGIN_TYPES.embedded) {
      if (accessToken) {
        console.log("Access Token exists and we are navigating now! =====> ", accessToken);
        navigate(routes.home);
      }
    }
  }, [accessToken, navigate, selectedLoginType]);

  return children;
};
