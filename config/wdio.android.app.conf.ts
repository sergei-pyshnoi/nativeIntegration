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
    platformName: "Android",
    maxInstances: 1,

    // For W3C the appium capabilities need to have an extension prefix
    // http://appium.io/docs/en/writing-running-appium/caps/
    // This is `appium:` for all Appium Capabilities which can be found here
    "appium:deviceName": "Pixel_4a_API_31",
    "appium:platformVersion": "12.0",
    "appium:orientation": "PORTRAIT",
    "appium:automationName": "UiAutomator2",
    // The path to the app
    "appium:app": join(process.cwd(), "./tests/apps/app-debug.apk"),
    "appium:appWaitActivity": "com.nativeintegration.MainActivity",
    // Read the reset strategies very well, they differ per platform, see
    // http://appium.io/docs/en/writing-running-appium/other/reset-strategies/
    "appium:noReset": false,
    "appium:newCommandTimeout": 500,
  },
];

exports.config = config;
