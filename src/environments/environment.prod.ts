import packageInfo from '../../package.json';

export const environment = {
  appVersion: packageInfo.version,
  production: true,
  apiUrl: 'https://testabrnd.bracbank.com/api/bio',
  fingerUrl: 'http://localhost:9090',
  authorizationKey: 'miorOgkekFjrtWzyOQUdLBxjKTqN6nXjsc/5DSA/DOSyIsNR5VRv9hOzWf/iNIkT',
  outputFormat: 'B',
  minFingerPrintCaptureQuality:60,
  publicKey: `-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDSjNP5touwtzFwvoCCQLm6U/Yt
K69CccZsqX8PGoz9gem2SY4PHGTJkXiRp7F0xRZ+k4ugk9eghaZDiIwpooFj82Od
74B9IdeK5QXBRzFwA+TtgIYLVGyELOfdV0pvEpAurshesPw9iIgXYDN/pJMkgJ8g
Q21dBXzZV7SAVR9DRQIDAQAB-----END PUBLIC KEY-----`
};
