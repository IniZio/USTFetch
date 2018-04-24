# :meat_on_bone: USTFetch
HKUST Delivery APP

## Demo:
https://www.youtube.com/watch?v=cTqNM9W9eps

### Installation instructions:

1. #### Set up nodejs and react-native dependencies
```sh
node -v && npm -v # your nodejs installation has problem if has error
npm i -g react-native-cli yarn # install react native cli globally, alongside with yarn
```

2. #### Download project

   1. clone this project with [Github Desktop](https://desktop.github.com/) or with command `git clone git@github.com:IniZio/USTFetch.git`
   2. run `cd USTFetch && yarn` to install dependencies

3. #### Set up Expo XDE

   1. Install [Expo XDE](https://docs.expo.io/versions/v15.0.0/introduction/installation.html) and add the project

   2. Open the app in Android Emulator / Real device:

      - Real device (recommended)
        1. Install 'Expo' app on your device

      - GenyMotion (better than android studio)
        2. Install [Genymotion](https://www.genymotion.com/fun-zone/), will need to register an account
        3. Create a device (model must be `Android 6.0 (Marshmallow)` or above), and start the emulator

      -  Android studio

        1. go here : https://developer.android.com/studio/install.html to download
        2. In installer, select 'custom' and select everything, then continue the install process
        3. Tools -> android -> android sdk -> 'SDK Platforms' tab, expand `Android 6.0 (Marshmallow)`, ciick:

          - `Google APIs`
          - `Android SDK Platform 23`
          - `Intel x86 Atom System Image`
          - `Intel x86 Atom_64 System Image`
          - `Google APIs Intel x86 Atom_64 System Image`
        4. Tools -> android -> android sdk -> 'SDK Tools' tab, click 'Show Package Details', expand Android SDK Build Tools, click `Android SDK Build-Tools 23.0.1`.
        5. Click 'Apply'
        6. Set up `ANDROID_HOME` environment variable:

        ​	Windows' Control Panel -> System and Security -> System -> Change settings -> Advanced System Settings -> Environment variables -> New, enter `ANDROID_HOME` for 'variable name', enter `C:\Users\{YOUR USERNAME}\AppData\Local\Android\sdk`

        7. Open android studio, Tools -> android -> android -> AVD manager, create a device (model must be `Android 6.0 (Marshmallow)` or above), and start the emulator

4. #### Fire up!

   1. Start Expo XDE and add this project, then click on it in the list to start the 'server'
   2. Open in real device / android emulator
      - Real device
        1. Press 'send link' to pass the magical link to your phone, open the link and it will launch the project in the Expo mobile app you just installed
      - Android emulator
        1. Do nothing :), it will install automatically


Possible issues;

- watchman error due to user limit in linux: run `./solve.sh` as sudoer
- `No android devices found` error despite having launched android emulator: check if you path contains path to the adb bin, if not then add `export PATH="$HOME/Android/Sdk/platform-tools/adb:$PATH"` to your `.profile` file
