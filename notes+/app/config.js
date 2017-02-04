var github = {
  clientID: '85c5da0fd2f70f73affc',
  clientSecret: 'b263b07ef930222140bce4631002d39843456ab1',
  callbackURL: "http://localhost:3000/auth/github/callback"
}

var google = {
  clientID: '708247688332-d0pj8ho0q4t4e8qcp59k0gognv1dl5du.apps.googleusercontent.com',
  clientSecret: 'bpMYJojvU-oVypOmtp4g9isU',
  callbackURL: 'http://localhost:3000/auth/google/callback'
}

module.exports = {github: github, google: google};
