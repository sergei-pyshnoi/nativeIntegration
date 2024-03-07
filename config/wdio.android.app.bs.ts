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
    platformName: "Android",
    "appium:platformVersion": "12.0",
    "appium:deviceName": "Samsung Galaxy S22 Ultra",
    "appium:app": process.env.BROWSERSTACK_APP_ID_ANDROID || "bs://939fe9e9c2ee58076154a79c2411330e32a9f5a9",
    "bstack:options" : {
      'buildName' : 'Android Set 1',
      'projectName' : 'CST e2e test',
      'buildTag' : '1',
      'idleTimeout': 300,
      'acceptInsecureCerts': "true",
      'networkLogs': "true",
    }
  },
 
];

exports.config = config;
