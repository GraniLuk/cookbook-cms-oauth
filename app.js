require('dotenv').config({ silent: true })
const middleWarez = require('./index.js')
const express = require('express')

const app = express()
const port = process.env.PORT || 3000

app.use((req, res, next) => {
  console.log('Request URL:', req.originalUrl)
  next()
})

app.get('/api/test', (req, res) => {
  res.send('Test route is working!')
})

// Initial page redirecting to Github
app.get('/api/auth', middleWarez.auth)

// Callback service parsing the authorization token
// and asking for the access token
app.get('/api/callback', middleWarez.callback)

app.get('/api/success', middleWarez.success)
app.get('/', middleWarez.index)

app.listen(port, () => {
  console.log(`Netlify CMS OAuth provider listening on port ${port}`)
})
