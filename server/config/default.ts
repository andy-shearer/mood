require("dotenv").config();

export default {
  port: 1337,
  origin: "http://localhost:3000",
  dbUri:
    "mongodb+srv://emmy123:emmy123@devnetwork.r0rje.mongodb.net/mood?retryWrites=true&w=majority",
  saltWorkFactor: 10,
  accessTokenTtl: "15m",
  refreshTokenTtl: "1y",
  privateKey: `-----BEGIN RSA PRIVATE KEY-----
MIICWgIBAAKBgHyr6+Aj3E8sHnV+f2yv87NYoFuGQpb8PIsNcbf3eWfz5rmgagtd
T3Sz7P5nTuwDGpd/1eFMkmrB3UBnlwGm1KP07/RGU0HsbYWKiSySeQT+PuY8yz4h
2SOLK3qlLaqkoTRmkN0xeLZdE6y40mtqjFjA1hx9XH8VIrkjtfKHZ93VAgMBAAEC
gYAyP903n1yZ8K9qLg1QEm9Id01S9n96eboxVb7jJnUhqBXz9asoX3i6EhdQxvTx
faLHM3hScdmF/BOgdOBRgxurVMeM9/ii2kWMH5Gd+gYzFk16Rf7c9MKOxCMLTPfa
Fq5RuTwwpk6sR7PlA/8T3IMP0aElcWa6MqPo2AjcOADxIQJBAMsdsVYCuONiuJk5
Wu+sOg6RJ8jN7bnMx0EYUcEwNPbThyKVWadKV8zAqwC1UuRUjwKQvwO2Iuxw6t4i
+C4dwGkCQQCdIaqEGoHQ6kC3OUL2MXxmxYfqJYFLOIxpEeo8M0acrLZU1jZmjVwC
4qWI+TWuIMv0tU9+qxpep9QbSJB9gUSNAkAofeXheK91HTQhz65SQ2pbhxKAVJVE
yg8a6gc6VSrp3ed9vHpgAFEaj3pHrN42iKjt4P9DdSbnLeeUmzIQt3upAkBYNmY7
84Wde2UJd6QYAoAMUiiTUqrbR8vL0LrnQQILQwq5Zej0ebeGBydXVlDEiLT3lDIk
snoDWcTB7GLxknihAkBRFnXYg0OpKuIcJrkZAO4gM1VRT+YWXezYnzuwZ0/6CabO
vELb8iR2wv1AA+OVTa863fuzps8PoXWhpafmkJI7
-----END RSA PRIVATE KEY-----`,
  publicKey: `-----BEGIN PUBLIC KEY-----
MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgHyr6+Aj3E8sHnV+f2yv87NYoFuG
Qpb8PIsNcbf3eWfz5rmgagtdT3Sz7P5nTuwDGpd/1eFMkmrB3UBnlwGm1KP07/RG
U0HsbYWKiSySeQT+PuY8yz4h2SOLK3qlLaqkoTRmkN0xeLZdE6y40mtqjFjA1hx9
XH8VIrkjtfKHZ93VAgMBAAE=
-----END PUBLIC KEY-----`,
  googleClientId: process.env.GOOGLE_CLIENT_ID as string,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  googleOauthRedirectUrl: process.env.OAUTH_REDIRECT_URL as string,
  //   accessTokenPrivateKey: ``,
  //   accessTokenPublicKey: ``,
  //   refreshTokenPrivateKey: ``,
  //   refreshTokenPublicKey: ``,
};
