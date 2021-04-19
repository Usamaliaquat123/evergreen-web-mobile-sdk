#/bin/bash
cd ~/Desktop/DART/nativeTarget/evergreen/android
sudo sudo ./gradlew clean
cd ..
react-native run-android
npm start 