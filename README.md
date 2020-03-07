# Q-todo-app

## Install

Ensure [node](https://nodejs.org/en/) v8 and npm v5 or later is installed.

```
$ node -v
v8.4.0
$ npm -v
5.3.0
```

After cloning the repository, navigate to the project folder and install npm dependencies.

```
$ cd todo-app
$ npm install
```

## Web Server

To start the development server, run

```
$ npm start
```

A browser window will open to http://localhost:8100/ionic-lab. In Ionic lab you may select different platforms to emulate. While developing, make sure you test styles on both iOS and Android platforms.

## Device

Cordova plugins and platforms must be restored when building or running on a native or emulated device. You **do not** need to restore Cordova if you are only using the Ionic Lab dev server.

### iOS

To build for iOS, install Xcode. iOS can only be built on OS X. Next, install `ios-deploy` globally and restore the ios platform.

```
$ npm install -g ios-deploy
$ npm run restore:ios
```

You will receive a build error the first time since code signing has not been set up.

#### Signing Certificates

TODO: Instructions on downloading and installing certs from ItunesConnect.

Launch Xcode and open the project at `platforms/ios/Todo App.xcodeproj`. Click on "Todo App" in the file explorer and choose the Todo App under General > Signing.

### Android

To build for Android, Android Studio must be installed and its build tools made available on the system PATH. As part of this process, a JDK will be used/installed and also made available on the PATH. Ensure Android Studio uses JDK 1.8+.

You may also be required to [install Gradle](https://gradle.org/install/) if you receive an error when building for Android.

```
$ npm run restore:android
```

### Cleaning

Anytime cordova plugins change, either by adding/removing a plugin or changing code in `plugins-override/`, platforms must be removed and re-added.

```
$ npm run clean
$ npm run restore:ios && npm run restore:android
```

## NPM Scripts

All scripts may be run using `npm run <task>`.

| Task              | Description                                                                                                                         |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `clean`           | Removes all platform, plugin, and build folders. Follow with `npm run restore:{platform}`.                                          |
| `restore:ios`     | Adds Cordova iOS platform and plugins, required before building releases.                                                           |
| `restore:android` | Adds Cordova Android platform and plugins, required before building releases.                                                       |
| `start`           | Starts development server at [http://localhost:8100/ionic-lab](http://localhost:8100/ionic-lab)                                     |
| `build`           | Builds and prepares app for Android and iOS platforms. Run this after making code changes before running in Android Studio or Xcode |
| `release:android` | Production Android build in `platforms/android/`                                                                                    |
| `release:ios`     | Production iOS build in `platforms/ios/`                                                                                            |
| `changelog`       | Updates `CHANEGLOG.md` for the current package version.                                                                             |
| `sourcemaps`      | Syncs sourcemaps with Ionic for error monitoring`    

### Android

To build signed release apks, ensure `com.todo.app.keystore` and `build.json` are present in the `.keystore/` folder. View the README in the folder for further instructions.

```sh
$ npm run release:android
```

Three APKs will be generated in the `.releases/` folder: two Crosswalk-enabled APKs for x86 and armv7 architectures for Android 4.4, and a regular release APK for Android 5+. The APKs may be uploaded as a multi-APK release to the Google Play Developer console.

### iOS

```sh
$ npm run release:ios
```

An Xcode project will be created at `platforms/ios/Todo App.xcodeproj`. Open this project and select "Generic iOS Device" as the build target. Next, create a new archive by selecting Product > Archive. The archive may then be uploaded to Itunesconnect.

Todo App has several "modes" available which define the update channel it looks to as well as which server it communicates with. You can change the channel by logging out and typing the channel name as the username and `mode` as the password. After changing channels, enter a username/password for the server whose channel you changed to.

| Mode        | Deploy Channel | Server                        |
| ----------- | -------------- | ----------------------------- |
| develop  | develop     | http://localhost:8100/home       |
