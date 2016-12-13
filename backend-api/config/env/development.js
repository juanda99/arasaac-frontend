module.exports = {
  env: 'development',
  databaseUrl: process.env.MONGO_URL || 'mongodb://localhost/cervezas',
  jwt: { secret: process.env.JWT_SECRET || 'secret key for testing' },
  // https://developers.facebook.com/
  facebook: {
    clientID: process.env.FACEBOOK_CLIENTID || 'Ie20AZvLJI2lQD5Dsgxgjauns',
    clientSecret: process.env.FACEBOOK_SECRET || 'KTZ6cxoKnEakQCeSpZlaUCJWGAlTEBJj0y2EMkUBujA7zWSvaQ',
    callbackURL: 'http://localhost:3000/auth/facebook/callback'
  },
  // https://apps.twitter.com/
  twitter: {
    clientID: process.env.TWITTER_CLIENTID || 'prueba',
    clientSecret: process.env.TWITTER_SECRET || 'prueba',
    callbackURL: 'http://localhost:3000/auth/twitter/callback'
  },
  github: {
    clientID: process.env.GITHUB_CLIENTID,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: 'http://localhost:3000/auth/github/callback'
  },
  linkedin: {
    clientID: process.env.LINKEDIN_CLIENTID,
    clientSecret: process.env.LINKEDIN_SECRET,
    callbackURL: 'http://localhost:3000/auth/linkedin/callback'
  },
  // https://cloud.google.com/console/project
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID || '251410730550-ahcg0ou5mgfhl8hlui1urru7jn5s12km.apps.googleusercontent.com',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'Y8yR9yZAhm9jQ8FKAL8QIEcd',
    callbackURL: 'http://localhost:3000/auth/google/callback'
  }
}
