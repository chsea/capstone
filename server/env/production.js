/*
    These environment variables are not hardcoded so as not to put
    production information in a repo. They should be set in your
    heroku (or whatever VPS used) configuration to be set in the
    applications environment, along with NODE_ENV=production

 */

module.exports = {
    "DATABASE_URI": process.env.MONGOLAB_URI,
    "SESSION_SECRET": process.env.SESSION_SECRET,
    "TWITTER": {
        "consumerKey": process.env.TWITTER_CONSUMER_KEY,
        "consumerSecret": process.env.TWITTER_CONSUMER_SECRET,
        "callbackUrl": process.env.TWITTER_CALLBACK
    },
  "FACEBOOK": {
    "clientID": "569676436533097",
    "clientSecret": "7bffea01bd532e6b5f35081b137f718f",
    "callbackURL": "http://127.0.0.1:1337/auth/facebook/callback"
    },
    "GOOGLE": {
        "clientID": "639827950694-bnuqcu2fdticck9na71q8a2ic8msv4sm.apps.googleusercontent.com",
        "clientSecret": "yHE2WpHvC0q0Bj6Bi3zXwk-A",
        "callbackURL": "http://127.0.0.1:1337/auth/google/callback"
  }
};