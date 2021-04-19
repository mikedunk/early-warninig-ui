
require('dotenv').config()

module.exports = {
    base_url: process.env.VUE_APP_BASE_URL,
    api_url:process.env.API_SERVER,
    configureWebpack: {
        devtool: 'source-map'
      }
}