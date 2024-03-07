import { config } from "./wdio.conf";

config.user = process.env.BROWSERSTACK_USERNAME;
config.key = process.env.BROWSERSTACK_ACCESS_KEY;

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
    platformName: "Android",
    maxInstances: 1,
    "appium:platformVersion": "13.0",
    "appium:deviceName": "Samsung Galaxy S23",
    "appium:newCommandTimeout": 500,
    "appium:app": process.env.BROWSERSTACK_APP_ID_ANDROID || "bs://1bbf70abcc2212d97122d69c6f9ba5e1807ade4e",
    "bstack:options": {
      appiumVersion: "1.22.0",
      buildName: "Android Set 1",
      idleTimeout: 300,
      enableSim: "true",
      // simOptions: {
      //   region: 'India',
      //   esim: 'false',
      // },
    },
  },
];

exports.config = config;
