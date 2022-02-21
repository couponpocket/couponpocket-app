# Resource Generator

This tool will crop and resize JPEG and PNG source images to generate icons and splash screens for modern iOS, Android, and Windows. `cordova-res` was developed for use with Cordova, but Capacitor and other native runtimes are supported.

## Install

```bash
$ npm install -g cordova-res
```

## Usage

`cordova-res` expects a Cordova project structure such as:

```
resources/
├── icon.png
└── splash.png
config.xml
```

* `resources/icon.(png|jpg)` must be at least 1024×1024px
* `resources/splash.(png|jpg)` must be at least 2732×2732px
* `config.xml` is optional. If present, the generated images are registered accordingly

#### Documentation

See the help documentation on the command line with the `--help` flag.

```bash
$ cordova-res --help
```

### Capacitor

To use `cordova-res` in Capacitor and other native runtimes, it is recommended to use `--skip-config` (skips reading & writing to Cordova's `config.xml` file) and `--copy` (copies generated resources into native projects).

For example, to generate icons and splash screens for iOS and Android in Capacitor, run:

```bash
$ cordova-res ios --skip-config --copy
$ cordova-res android --skip-config --copy
```

You can use `--ios-project` and `--android-project` to specify the native project directories into which these resources are copied. By default, `cordova-res` copies Android resources into `android/` and iOS resources into `ios/` (the directories Capacitor uses).