import Configuration from "../config";

function getAuthProviderConfig(selectedApp) {
  const selectedConfig = Configuration[selectedApp];
  return selectedConfig;
}

export default getAuthProviderConfig;
