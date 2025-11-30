const generateScript = require('./login_script.js')

module.exports = (oauth2, oauthProvider) => {
  function callbackMiddleWare(req, res, next) {
    console.log('Inside callback middleware');
    const code = req.query.code
    var options = {
      code: code,
      redirect_uri: process.env.REDIRECT_URL
    }

    if (oauthProvider === 'gitlab') {
      options.client_id = process.env.OAUTH_CLIENT_ID
      options.client_secret = process.env.OAUTH_CLIENT_SECRET
      options.grant_type = 'authorization_code'
    }

    oauth2.getToken(options)
      .then(result => {
        const token = oauth2.createToken(result)
        const content = {
          token: token.token.token.access_token,
          provider: oauthProvider
        }
        return { message: 'success', content }
      })
      .catch(error => {
        console.error('Access Token Error', error.message)
        return { message: 'error', content: JSON.stringify(error) }
      })
      .then(result => {
        const script = generateScript(oauthProvider, result.message, result.content)
        return res.send(script)

      })
  }
  return callbackMiddleWare
}