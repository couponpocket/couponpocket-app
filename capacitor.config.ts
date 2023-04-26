import {CapacitorConfig} from '@capacitor/cli';

const env = process.env.NODE_ENV || 'development';

const config: CapacitorConfig = {
    appId: 'de.couponpocket.app',
    appName: 'Coupon Pocket',
    webDir: 'build',
    loggingBehavior: env === 'development' ? 'debug' : 'production',
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
    }
};

if (env === 'development') {
    config.server = {
        url: 'http://localhost:8100',
        cleartext: true
    };
}

export default config;

