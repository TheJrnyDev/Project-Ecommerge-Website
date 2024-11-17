import Vue from 'vue'
import Vuex from 'vuex'

// import local modules here
import auth from './modules/auth'
import product from './modules/product'
import cart from './modules/cart'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    product,
    cart
  }
})
