import React, { useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";

import { AuthContext } from "../contexts/auth";
import routes from "../constants/routes";

export const RequireAuthHOC = ({ children }) => {
  const { accessToken } = useContext(AuthContext.context);

  const { navigate } = useNavigation();

  useEffect(() => {
    if (!accessToken) {
      navigate(routes.login);
    }
  }, [accessToken, navigate]);

  return children;
};
