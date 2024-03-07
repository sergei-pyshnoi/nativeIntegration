import { config } from "./wdio.conf";

// ============
// Specs
// ============
config.specs = ["../tests/features/universalLogin.feature"];

// ============
// Capabilities
// ============
// For all capabilities please check
// http://appium.io/docs/en/writing-running-appium/caps/#general-capabilities
config.capabilities = [
  {
    platformName: "iOS",
    maxInstances: 1,
    "appium:platformVersion": "16.0",
    "appium:deviceName": "iPhone 14",
    "appium:newCommandTimeout": 500,
    "appium:app": process.env.BROWSERSTACK_APP_ID_IOS || "bs://a96f71bb633823e93125fb8aabac25f838ba945b",
    "bstack:options": {
      appiumVersion: "1.22.0",
      buildName: "iOS Set 1",
      idleTimeout: 300,
      enableSim: "true",
      simOptions: {
        // region: 'India',
        esim: "true",
      },
    },
  },
];

exports.config = config;
