# Coupon Pocket App

This repository is for contains the frontend of the Coupon Pocket app. The app was implemented using Ionic, React and Capacitor. Redux and `@capacitor/storage` are used for data storage.

## Table of Contents
- [Getting Started](#getting-started)
- [Deploying](#deploying)

## Getting Started

* [Download the installer](https://nodejs.org/) for Node LTS.
* Clone this repository: `git clone https://github.com/couponpocket/couponpocket-app.git`.
* Run `npm install` from the project root.
* Run `npx cap serve` in a terminal from the project root.
* Profit. :tada:

### Specially for m1 macbooks

* Run `sudo arch -x86_64 gem install ffi` to install ffi for x86_64
* Add Alias to use arch for npx `alias npx="arch -x86_64 npx"`


## Deploying

### Android

1. Run `npm run b+s`
2. Run `npx cap build android`

### iOS

1. Run `npm run b+s`
2. Run `npx cap build ios`