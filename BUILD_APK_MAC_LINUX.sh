#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
npm install
[ -d platforms/android ] || npx cordova platform add android@15.1.0
npx cordova requirements android
npx cordova build android --debug
printf '\nAPK: platforms/android/app/build/outputs/apk/debug/app-debug.apk\n'
