<template>
  <div>
    <v-app-bar class="pd" color="lightcoralpink lighten-3" dense>
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
      <div class="flex-box">
        <v-btn v-if="getUser.role === 'admin' && isLogin" @click.stop="drawer = !drawer" dark fab large>
          <v-icon>mdi-cog</v-icon>
        </v-btn>

        <v-avatar size="80">
          <img src="../../../public/img/logos/panda_logo.jpg" alt="Logo" />
        </v-avatar>
        <router-link style="text-decoration: none;" :to="{ name: 'home' }">
          <v-toolbar-title class="header">BlackWhite Market</v-toolbar-title>
        </router-link>
        <v-spacer></v-spacer>

        <input
          type="text"
          name="search"
          id="search"
          class="custom-text-field"
          placeholder="Search by name"
        />

        <v-menu right bottom v-if="isLogin">
          <template v-slot:activator="{ on, attrs }">
            <v-badge color="black" offset-x="10" offset-y="15">
              <template v-slot:badge>
                <div style="font-size: 14px">{{ getCount }}</div>
              </template>
              <v-btn icon color="dark" v-bind="attrs" v-on="on">
                <v-icon size="30">mdi-cart</v-icon>
              </v-btn>
            </v-badge>
          </template>

          <v-list>
            <v-list-item>
              <v-card elevation="0" class="cart-card">
                <v-card-title primary-title>
                  {{ getCount }} Items in cart.</v-card-title
                >
                <v-card-subtitle> Total 999฿ </v-card-subtitle>
                <v-card-actions>
                  <!-- <router-link :to="{ name: 'cart' }"> -->
                  <v-btn block dark @click="$router.push({ name: 'cart' })"
                    >View Cart</v-btn
                  >
                  <!-- </router-link> -->
                </v-card-actions>
              </v-card>
            </v-list-item>
            <!-- <v-list-item v-for="(item, index) in carts" :key="index" @click="() => {}">
            <v-list-item-title>{{ item.topic }}</v-list-item-title>
          </v-list-item> -->
          </v-list>
        </v-menu>

        <b v-if="isLogin">Welcome, {{ getUser.username }}</b>

        <router-link :to="{ name: 'login' }" v-if="!isLogin">
          <v-btn class="custom-button" dark x-large> Login </v-btn>
        </router-link>

        <v-btn v-if="isLogin" outlined class="custom-button" x-large @click="logout()">
          Logout
        </v-btn>

        <!-- <router-link
          :to="{ name: 'dashboard' }"
          v-if="getUser.role === 'admin'"
        >
          <v-btn class="custom-button" dark x-large> dashboard </v-btn>
        </router-link> -->
      </div>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      style="padding: 10px;">
      <v-list-item>
        <v-list-item-title>Hello Admin !</v-list-item-title>
      </v-list-item>
      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          @click="$router.push({name: item.route})">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import router from "@/router/routerIndex";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "userNavBar",
  data() {
    return {
      isLogin: false,
      cartCount: 0,
      drawer: false,
      items: [
          { title: 'Verify Users', icon: 'mdi-account-check', route: 'approve' },
          { title: 'Product Management', icon: 'mdi-cart', route: 'prodManage' },
          { title: 'Order Manament', icon: 'mdi-invoice-text-edit', route: 'orderManage' },
        ],
    };
  },
  computed: {
    ...mapGetters("auth", ["getUser"]),
    ...mapGetters("cart", ["getCart", "getCount"]),
  },
  methods: {
    ...mapActions("auth", ["identify", "removeToken"]),
    ...mapActions("cart", ["getCartFromLocal"]),
    ...mapActions("product", ["fetchProducts" ,"getProductFromCart"]),
    // local function is here
    logout() {
      localStorage.removeItem("token");
      this.isLogin = false;
      this.removeToken()
      if (this.$route.name !== "home") {
        router.push({ name: "home" });
      }
    },
  },
  async created() {
    await this.identify();
    if (this.getUser.token) {
      this.isLogin = true;
    }

    if (this.getUser._id) {
      await this.fetchProducts()
      await this.getCartFromLocal(this.getUser._id);
      await this.getProductFromCart(this.getUser._id)
    }
  },
  watch: {
    isLogin() {}
  }
};
</script>

<style>
.pd {
  padding-left: 100px;
  padding-right: 100px;
  padding-top: 30px;
  padding-bottom: 30px;
  height: 100% !important;
}
.flex-box {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 50px;
}
.custom-text-field {
  width: 100%;
  max-width: 600px;
  height: 60px;
  padding: 10px;
  border: 1px solid grey;
  border-radius: 5px;
  font-size: 18px;
}
.custom-button {
  height: 60px;
  padding: 10px;
}
.header {
  font-size: 24px;
  font-weight: bold;
  margin-left: -20px;
  color: black;
}
.cart-card {
  padding: 5px;
}
</style>
