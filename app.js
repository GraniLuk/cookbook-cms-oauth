require('dotenv').config({ silent: true })
const express = require('express')
const middleWarez = require('./index.js')
const port = process.env.PORT || 3000

const app = express()

app.use((req, res, next) => {
  console.log('Request URL:', req.originalUrl);
  next();
});

app.get('/test', (req, res) => {
  res.send('Test route is working!');
});

// Initial page redirecting to Github
app.get('/auth', middleWarez.auth)

// Callback service parsing the authorization token
// and asking for the access token
app.get('/callback', middleWarez.callback)

app.get('/success', middleWarez.success)
app.get('/', middleWarez.index)

app.listen(port, () => {
  console.log("Netlify CMS OAuth provider listening on port " + port)
})
