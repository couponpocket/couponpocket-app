import {CapacitorConfig} from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'de.couponpocket.app',
    appName: 'Coupon Pocket',
    webDir: 'build',
    bundledWebRuntime: false,
    plugins: {
        SplashScreen: {
            launchShowDuration: 0
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

