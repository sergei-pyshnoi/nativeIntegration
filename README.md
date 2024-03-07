[![yaradigitallabs](https://github.com/yaradigitallabs/sh-usermanagement-native-app/actions)]

# sh-usermanagement-native-app

A React Native Application that is used to test Auth0 Login Pages through sh-user-management library.

## :wrench: Project Setup

1. Setup `.npmrc` file with your GitHub access token. P
2. Clone the project. To do this run this command in your work folder:
   ```
   git clone https://personal_access_token@github.com/yaradigitallabs/sh-usermanagement-native-app.git
   ```
   >ℹ️ - [How to create personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)


```bash
registry=https://registry.npmjs.com/
@yaradigitallabs:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=github_access_token
always-auth=true
```

# Testing Flow

## Regions
Region is the target location of the user. It is used to set the default value for `CountrySelect` picker.
>(e.g. The default phone number code if you select India region will be _+91_)

## Environments
To test the latest development changes most of the time you'll be using `local`(a.k.a. _dev_) environment.
> More information about configuring environments can be found [here](../configuration/README.md#Tenant Configuration)

## Development branches
The latest changes can be found in these branches:
- _sh-usermanagement-native-app_ - `develop`
- _sh-user-management_ - `dev`  (SDK library)
- _sh-custom-universal-login_ - `dev` (Front End login pages)


# Appium

- Is an open source tool/UI Testing framework to automate mobile applications
- Can automate native, web and hybrid mobile apps.
- Can support Android, iOS, Windows desktop platforms
- Supports multiple programming languages such as Java, C#, PHP and JavaScript
- Has no dependency on mobile device OS
- Has framework or wrapper that translate Selenium Webdriver commands into UIAutomation (iOS) or UIAutomator (Android) commands depending on the device type, not any OS type
- Works in a client-server architecture
- Is an ‘HTTP Server’ written using Node.js platform
- Desired Capabilities are a set of keys and values sent to the Appium server to tell the server what kind of automation session we are using

## Installation

1. To install Appium using node.js which comes with built-in server

   - Install Appium

     ```
     npm install -g appium
     ```

   - Check if Appium is installed

     ```
     appium --version
      2.4.1
     ```

     As of appium2, need to install driver to 
```
Refer to 
> - [Setting up the driver for ios](https://appium.io/docs/en/2.2/guides/managing-exts//)
> - [Setting up the driver for android](https://appium.io/docs/en/2.0/quickstart/uiauto2-driver/)
```
for ios
```
appium driver install xcuitest
```

for android
```
appium driver install uiautomator2
```

Need to setup env for android run
```
 Neither ANDROID_HOME nor ANDROID_SDK_ROOT environment variable was exported. Read https://developer.android.com/studio/command-line/variables for more details
```
You may put these env in the .bash_profile
```bash
export ANDROID_HOME=~/Library/Android/sdk
export JAVA_HOME=/Library/Java/JavaVirtualMachines/zulu-17.jdk/Contents/Home
export PATH $PATH:$ANDROID_HOME/tools:$ANDROID_HOME/tools/bin:$ANDROID_HOME/platform-tools:$JAVA_HOME
```

## Appium Inspector

This tool allow you to inspect the UI element to add locator strategy for UI automation

```
appium --allow-cors
```

Open the browser and enter this url
```
https://inspector.appiumpro.com/
```

Configure the desired cap
![alt text](./docs/DC_android.png?raw=true "Title")

Run 
```yarn android```
to start the app in the android emulator Pixel_4a_API_31 which you need to create in the Android Studio Virtual Device Manager

and Click on the Start Session button



## Tenant Configuration

The React Native application can be used to test login pages of different tenants. The configuration for all the tenants can be found in the [config.js](../../config.js) file.


The `domain` and `clientId` can be taken from the config file 


```javascript

   <NavigationContainer>
      <NativeUserManagementContext
        authProviderConfig={getAuthProviderConfig(selectedApp)}
   
        /*
        ...
        ...
        ...
        ...
         */
        >
        ...
        ...
        ...
        </NativeUserManagementContext>


## :gear: Running the project

1. To run the project, enter `yarn android` or `yarn ios` in the root of the project
2. The project can be configured to load login pages from different tenants. 


The React Native App can be configured to run by either using the node modules or by using the local folders. In order to use the local folders for development set the `isLocalDev` variable in the [metro.config.js](../../metro.config.js) file to true.

> ℹ️ : By setting `isLocalDev` variable to `true` metro development server will get dependencies from local `sh-user-management` repos. 
> 
> :warning: `sh-user-management` should be in the same folder as `sh-usermanagement-native-app`.
> 
> :warning: Note that you should run `yarn install` in both of these repos to install its dependencies.


Install the project dependencies with `yarn install`

> For more detailed information read the official documentation:
> - [Setting up the development environment](https://reactnative.dev/docs/environment-setup)
> - [Running On Device](https://reactnative.dev/docs/running-on-device)

## :triangular_flag_on_post: Testing

1. Start the metro bundler

   ```
   react-native run-ios or yarn ios 
   ```
   or 
   ```
   react-native run-android or yarn android

   ```
2a.To update the binary apk for android 
   At project root directory 
   ```
   cd android
   ./gradlew assembleRelease
   ```
   the apk will be generated at 
   <project_root>/android/app/build/outputs/apk/release/app-release.apk

   ```
   ./gradlew assembleDebug
   ```
   the apk will be generated at 
   <project_root>/android/app/build/outputs/apk/debug/app-debug.apk


2b.To update the binary app for ios
   At project root directory
   ```
   cd ios
   rm -fr *lock
   pod install
   open 	nativeintegration.xcworkspace
   ```
   Run build on xcode IDE


3. Run test on iOS simulator or android emulator

   on android
   ```
   yarn test:execute:android:local
   ```

   on ios
   ```
   yarn test:execute:ios:local
   ```

   Note: Make sure appium inspector server is shutdown

4. To view report

   ```
   yarn report:allure
   ```
   
   ```
   yarn report:cucumber
   ```

   Install fastlane on macOS

   ```
   brew install fastlane
   ```

   Create .env file: .env
   Get the value from 1password - Twilio Auth Tokens under Common Services team's secured notes

   In case you manually test a number and use the sh-sms-otp-viewer to get the OTP

   Take note of the environment selection in the native app
   *debug* env will point to the *development* environment in the sms otp viewer tool 
   *local* env will point to the *stage* environment in the sms otp viewer tool
   The reason for this is because of the way Auth0 clients were created in the past  
   In general, if you don't see any stage env, the local env will point to stage   

:white_check_mark: Please visit [this page](docs/testing/README.md) to know about running tests for this project.



## [DevFlow and validation](https://yaradigitalfarming.atlassian.net/l/cp/JsdbFLCP)
### Branch naming convention
* "work" branches naming should follow such pattern `JIRA_PROJECT_KEY-TASK_NUMBER`:
* e.g.: CST-123

### Commit naming convention
* Commit Message naming should follow the such pattern `JIRA_PROJECT_KEY-TASK_NUMBER: SHORT_DESCRIPTION_WHAT_WAS_DONE_AT_LEAST_3_SYMBOLS`
* e.g.: CST-123: add new properties

### Validation

#### General description
Validation created using git hooks. Git hooks provide a way to fire off custom scripts on different events such as during commit, push or rebase, etc.
The following two hooks are used for validation:
* *pre-commit*: The pre-commit hook runs on the git commit event. This hook is used to validate:
   - branch name is not master or develop or dev;
   - branch name follows the naming convention.
* *commit-msg*: This is useful to validate a commit. This hook is used to validate:
   - commit message follows the naming convention.

#### Implementation
Validation implemented using [husky](https://typicode.github.io/husky/#/) library.
The scripts with validation are located in the .husky folder, which is located in the root of the project. Inside the folder are files that have the same names corresponding to git hooks:

    .
    ├── ...
    ├── .husky                    # Folder with hooks
    │   ├── commit-msg            # Script to be executed at `commit-msg` git hook 
    │   └── pre-commit            # Script to be executed at `pre-commit` git hook
    └── ...

#### Details
##### On pre-commit validation
