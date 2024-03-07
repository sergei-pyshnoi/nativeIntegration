import { join } from "path";
import config from "./wdio.conf.appium";

// ============
// Specs
// ============
config.specs = ["../tests/features/*.feature"];

// ============
// Capabilities
// ============
// For all capabilities please check
// http://appium.io/docs/en/writing-running-appium/caps/#general-capabilities
config.capabilities = [
  {
    // The defaults you need to have in your config
    platformName: "iOS",
    maxInstances: 1,
    // For W3C the appium capabilities need to have an extension prefix
    // This is `appium:` for all Appium Capabilities which can be found here
    // http://appium.io/docs/en/writing-running-appium/caps/
    "appium:deviceName": "iPhone 15 Pro",
    "appium:platformVersion": "17.0",
    "appium:orientation": "PORTRAIT",
    "appium:automationName": "XCUITest",
    // The path to the app
    "appium:app": join(process.cwd(), "./tests/apps/nativeIntegration.app"),
    // Read the reset strategies very well, they differ per platform, see
    // http://appium.io/docs/en/writing-running-appium/other/reset-strategies/
    "appium:noReset": true,
    "appium:newCommandTimeout": 500,
    // 'appium:unicodeKeyboard': true,
    // 'appium:resetKeyboard':  true
  },
];

exports.config = config;
