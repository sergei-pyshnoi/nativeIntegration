import React, { useCallback, useEffect, useMemo, useState } from "react";
import { NativeUserManagementContext, useUserManagement } from "@yaradigitallabs/sh-user-management-native";
import { LOGIN_TYPES } from "../constants/routes";

const contextFactory = ({
  accessToken,
  login,
  logout,
  forceLogin,
  loginViaBrowser,
  logoutViaBrowser,
  forceLoginViaBrowser,
  setUserProfile,
  userProfile,
  updateUserProfile,
  isAuth0Used,
  saveCredentialsViaEmbedded,
  // startLoginViaEmbedded,
  completeLoginViaEmbedded,
  getToken,
  setEnabledAnalytics,
  selectedLoginType,
  changeSelectedLoginType,
} = {}) => ({
  accessToken,
  login,
  logout,
  forceLogin,
  loginViaBrowser,
  logoutViaBrowser,
  setUserProfile,
  userProfile,
  updateUserProfile,
  isAuth0Used,
  forceLoginViaBrowser,
  // saveCredentialsViaEmbedded,
  // startLoginViaEmbedded,
  // completeLoginViaEmbedded,
  getToken,
  setEnabledAnalytics,
  selectedLoginType,
  changeSelectedLoginType,
});

const context = React.createContext(contextFactory());

const AuthContext = ({ children }) => {
  const {
    login,
    logout,
    forceLogin,
    loginViaWebView,
    logoutViaWebView,
    forceLoginViaWebView,
    getUserProfile,
    updateUserProfile,
    saveCredentialsEmbedded,
    startLoginEmbedded,
    completeLoginEmbedded,
    getToken,
    setEnabledAnalytics,
    logoutViaEmbedded,
  } = useUserManagement();
  const [accessToken, setAccessToken] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [authError, setAuthError] = useState(null);
  const [isAuth0Used, setIsAth0Used] = useState(false);

  const [selectedLoginType, setSelectedLoginType] = useState(null);

  const changeSelectedLoginType = useCallback(
    (value) => {
      setSelectedLoginType(value);
    },
    [setSelectedLoginType],
  );

  const handleAuthError = useCallback((err) => {
    setAuthError(err);
    setAccessToken(null);
  }, []);

  /**
   * The main point for fetching a relevant access token.
   * This will return either access token if there is some or null
   * Also might throw an error if there is one during performing an API call to auth provider
   */
  const getAccessToken = useCallback(
    () =>
      /**
       * We have an option here. We can use either the `getToken` function from the context
       * ot use the static method `awaitGetToken` if we want to use the user management functionality
       * without context
       */
      //   NativeUserManagementContext.awaitGetToken()
      //     .then((getToken) => getToken())
      //     .then((token) => setAccessToken(token))
      //     .catch(handleAuthError),
      // [setAccessToken, handleAuthError],
      getToken()
        .then((token) => setAccessToken(token))
        .catch(handleAuthError),
    [getToken, setAccessToken, handleAuthError],
  );

  const getProfile = useCallback(() => getUserProfile().then(setUserProfile).catch(handleAuthError), [getUserProfile, handleAuthError]);

  const checkIsLoggedInViaAuth0 = useCallback(
    (accessToken) => NativeUserManagementContext.awaitIsOwnToken().then((isOwnToken) => isOwnToken(accessToken)),
    [],
  );

  /**
   * Initial fetching of accessToken after the application is launched
   * If an access token is received than the user is logged in.
   * If no token received or event an error thrown than the user is not logged in.
   */

  useEffect(() => {
    getAccessToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (accessToken) {
      getProfile();
    } else {
      setUserProfile({});
    }
  }, [accessToken, getProfile, setUserProfile]);

  /**
   * Check is the access token issued by Auth0 or not.
   * Such check is useful in scenarios where we need to use several identity providers in one application
   */
  useEffect(() => {
    checkIsLoggedInViaAuth0(accessToken).then(setIsAth0Used);
  }, [accessToken, checkIsLoggedInViaAuth0]);

  const value = useMemo(() => {
    const authMethodFactory = (authMethod) => () =>
      authMethod()
        .then(() => {
          setSelectedLoginType({});
          setUserProfile({});
          getAccessToken();
        })
        .catch(handleAuthError);

    const performLoginViaBrowser = authMethodFactory(login);

    const performForceLoginViaBrowser = authMethodFactory(forceLogin);

    const performLogoutViaBrowser = authMethodFactory(logout);

    const performLogin = authMethodFactory(loginViaWebView);

    const performForceLogin = authMethodFactory(forceLoginViaWebView);

    const performLogout = selectedLoginType === LOGIN_TYPES.embedded ? authMethodFactory(logoutViaEmbedded) : authMethodFactory(logoutViaWebView);

    const performStartLoginEmbedded = authMethodFactory(startLoginEmbedded);

    const performCompleteLoginEmbedded = authMethodFactory(completeLoginEmbedded);

    const passwordlessStart = (creds) => startLoginEmbedded(creds).then(console.log).catch(handleAuthError);

    const passwordlessLogin = (creds) => completeLoginEmbedded(creds).then(() => getAccessToken());

    const saveCredsEmbedded = (creds) =>
      saveCredentialsEmbedded(creds)
        .then(() => getAccessToken())
        .catch(handleAuthError);

    const updateProfile = (data) =>
      updateUserProfile(data)
        .then(() => getProfile())
        .catch(handleAuthError);

    return contextFactory({
      accessToken,
      login: performLogin,
      logout: performLogout,
      forceLogin: performForceLogin,
      loginViaBrowser: performLoginViaBrowser,
      logoutViaBrowser: performLogoutViaBrowser,
      forceLoginViaBrowser: performForceLoginViaBrowser,
      userProfile,
      setUserProfile,
      updateUserProfile: updateProfile,
      isAuth0Used,
      // saveCredentialsViaEmbedded: saveCredsEmbedded,
      // startLoginViaEmbedded: startLoginEmbedded,
      // completeLoginViaEmbedded: passwordlessLogin,
      getToken,
      setEnabledAnalytics,
      selectedLoginType,
      changeSelectedLoginType,
    });
  }, [
    login,
    forceLogin,
    logout,
    loginViaWebView,
    forceLoginViaWebView,
    selectedLoginType,
    logoutViaEmbedded,
    logoutViaWebView,
    startLoginEmbedded,
    completeLoginEmbedded,
    accessToken,
    userProfile,
    isAuth0Used,
    getToken,
    setEnabledAnalytics,
    changeSelectedLoginType,
    handleAuthError,
    getAccessToken,
    saveCredentialsEmbedded,
    updateUserProfile,
    getProfile,
  ]);

  return <context.Provider value={value}>{children}</context.Provider>;
};

AuthContext.context = context;

export { AuthContext };
