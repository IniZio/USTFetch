# USTFetch
HKUST-oriented Peer-to-Peer delivery network 



### Installation instructions:

1. #### Set up nodejs and react-native dependencies
```sh
node -v && npm -v # your nodejs installation has problem if has error
npm i -g react-native-cli yarn # install react native cli globally, alongside with yarn
```

2. #### Set up android studio

   a. go here : https://developer.android.com/studio/install.html to download

   b. In installer, select 'custom' and select everything, then continue the install process

   c. Tools -> android -> android sdk -> 'SDK Platforms' tab, expand `Android 6.0 (Marshmallow)`, ciick:

   - `Google APIs`
   - `Android SDK Platform 23`
   - `Intel x86 Atom System Image`
   - `Intel x86 Atom_64 System Image`
   - `Google APIs Intel x86 Atom_64 System Image`

   d. Tools -> android -> android sdk -> 'SDK Tools' tab, click 'Show Package Details', expand Android SDK Build Tools, click `Android SDK Build-Tools 23.0.1`.

   e. Click 'Apply'

   f. Set up `ANDROID_HOME` environment variable:

   ​	Windows' Control Panel -> System and Security -> System -> Change settings -> Advanced System Settings -> Environment variables -> New, enter `ANDROID_HOME` for 'variable name', enter `C:\Users\{YOUR USERNAME}\AppData\Local\Android\sdk`

3. ### Test your [React Native](https://facebook.github.io/react-native/)

   a. Open android studio, Tools -> android -> android -> AVD manager, create a device, model must be `Android 6.0 (Marshmallow)` and start the emulator

   b. clone this project with [Github Desktop](https://desktop.github.com/) or with command `git clone git@github.com:IniZio/USTFetch.git`

   c. run `cd USTFetch && yarn` to install dependencies

   d. run `react-native run-android` to install the app on emulator

   e. run `npm start` to keep the android app running. 

4. #### **DONE!**


