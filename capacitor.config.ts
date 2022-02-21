import {CapacitorConfig} from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'de.couponpocket.app',
    appName: 'Couponpocket',
    webDir: 'build',
    bundledWebRuntime: false,
    plugins: {
        SplashScreen: {
            launchShowDuration: 1500,
            launchAutoHide: true,
            androidSplashResourceName: "splash",
            androidScaleType: "CENTER_CROP",
            showSpinner: false,
            splashFullScreen: true
        },
        Keyboard: {
            resize: "native"
        }
    },
    server: {
        url: 'http://localhost:8100',
        cleartext: true
    }
};

export default config;

