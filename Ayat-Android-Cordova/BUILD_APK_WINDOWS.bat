@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo.
echo ============================================
echo          AYAT Android APK Builder
echo ============================================
echo.
where node >nul 2>nul || (echo ERROR: Install Node.js 22 LTS and reopen CMD. & pause & exit /b 1)
where java >nul 2>nul || (echo ERROR: Install JDK 17 and configure JAVA_HOME. & pause & exit /b 1)
if not defined ANDROID_HOME if not defined ANDROID_SDK_ROOT (echo ERROR: Android SDK is missing. Install Android SDK command line tools or Android Studio, then set ANDROID_HOME. & pause & exit /b 1)
call npm install || (echo npm install FAILED & pause & exit /b 1)
if not exist "platforms\android" (
 call npx cordova platform add android@15.1.0 || (echo Platform setup FAILED & pause & exit /b 1)
)
call npx cordova requirements android
echo.
call npx cordova build android --debug || (echo BUILD FAILED: Check the requirements above. & pause & exit /b 1)
echo.
echo APK output: platforms\android\app\build\outputs\apk\debug\app-debug.apk
pause
