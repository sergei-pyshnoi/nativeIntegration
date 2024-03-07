import { config } from "./wdio.conf";

// ============
// Specs
// ============
config.specs = [
  "../tests/features/universalLogin.feature",
  "../tests/features/IDConnect.feature",
  // "../tests/features/OTPHelperText.feature",
  // "../tests/features/emailBasedLogin.feature",
  // "../tests/features/skipLogin.feature",
  // "../tests/features/autofill.feature",
  // "../tests/features/help.feature",
  // "../tests/features/countryCodeFlag.feature",
];

// ============
// Capabilities
// ============
// For all capabilities please check
// http://appium.io/docs/en/writing-running-appium/caps/#general-capabilities
config.capabilities = [
  {
    platformName: "iOS",
    "appium:platformVersion": "17.0",
    "appium:deviceName": "iPhone 15",
    "appium:app": process.env.BROWSERSTACK_APP_ID_IOS || "bs://bb1ed1e8844282257b22d4add768e4c812538d26",
    "bstack:options" : {
      'buildName' : 'iOS Set 1',
      'projectName' : 'CST e2e test',
      'buildTag' : '1',
      'idleTimeout': 300,
      'acceptInsecureCerts': "true",
      'networkLogs': "true",
    }
  },
];

exports.config = config;
