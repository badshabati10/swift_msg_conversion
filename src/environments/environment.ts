// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import packageInfo from '../../package.json';

export const environment = {
  appVersion: packageInfo.version,
  production: false,
  apiUrl: 'http://localhost:8080/api/swift',
  fingerUrl: 'http://localhost:4200',
  authorizationKey: 'miorOgkekFjrtWzyOQUdLBxjKTqN6nXjsc/5DSA/DOSyIsNR5VRv9hOzWf/iNIkT',
  outputFormat: 'B',
  minFingerPrintCaptureQuality:60,
  publicKey: `-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDSjNP5touwtzFwvoCCQLm6U/Yt
K69CccZsqX8PGoz9gem2SY4PHGTJkXiRp7F0xRZ+k4ugk9eghaZDiIwpooFj82Od
74B9IdeK5QXBRzFwA+TtgIYLVGyELOfdV0pvEpAurshesPw9iIgXYDN/pJMkgJ8g
Q21dBXzZV7SAVR9DRQIDAQAB
-----END PUBLIC KEY-----`
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
