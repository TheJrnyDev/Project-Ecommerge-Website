const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: ['vuetify'],
  chainWebpack: config => {
    config.plugin('define').tap(args => {
      const env = process.env
      for (let key in env) {
        if (key.startsWith('VUE_APP_')) {
          args[0]['process.env'][key] = JSON.stringify(env[key])
        }
      }
      return args
    })
  }
})