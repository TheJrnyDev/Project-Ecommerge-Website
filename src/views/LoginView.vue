<template>
  <div class="containers">
    <div class="card-container">
      <v-card class="card-content">
        <v-card-title>
            <v-spacer></v-spacer>
            <router-link :to="{name: 'home'}">
              <div style="font-size: 12px;">Back to home page</div>
            </router-link>
        </v-card-title>
        <v-card-title primary-title>
          <div class="text-center">
            <h3 class="headline mb-0">Login</h3>
          </div>
        </v-card-title>
        <div class="text-center" v-if="!isFailed">
          Welcome Shoppolian!
        </div>
        <div class="text-center" v-if="isFailed" style="color: red">
          {{ errorMessage }}
        </div>
        <br />
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-text-field
              v-for="(item, index) in formData"
              :key="index"
              :prepend-inner-icon="item.icon"
              :name="item.name"
              :label="item.label"
              :id="item.id"
              :hint="item.hint"
              :outlined="item.outlined"
              :type="item.type"
              v-model="$data[item.vModel]"
              :rules="item.rules"
              required
            ></v-text-field>
          </v-form>
          <div class="text-center">
            Do you have an account?
            <router-link :to="{ name: 'register' }">
              <b><u>Register here.</u></b>
            </router-link>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn
            :disabled="!valid"
            class="custom-btn"
            color="primary"
            rounded
            block
            @click="preLogin()"
          >
            <span><v-icon>mdi-login</v-icon> Login</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
/* import store here */
import router from "@/router/routerIndex";
import { mapGetters, mapActions } from "vuex";

export default {
  data: () => ({
    isFailed: false,
    errorMessage: '',
    username: "",
    password: "",
    valid: true,
    formData: [
      {
        icon: "mdi-account",
        name: "username",
        id: "username",
        label: "Username",
        hint: "Type your username",
        outlined: true,
        type: "text",
        vModel: "username",
        rules: [(v) => !!v || "Username is required"],
      },
      {
        icon: "mdi-lock",
        name: "password",
        id: "password",
        label: "Password",
        hint: "Type your password",
        outlined: true,
        type: "password",
        vModel: "password",
        rules: [(v) => !!v || "Password is required"],
      },
    ],
  }),
  computed: {
    ...mapGetters("auth", ["getUser"]),
  },
  methods: {
    ...mapActions("auth", ["login"]),
    async preLogin() {
      const userData = {
        username: this.username,
        password: this.password,
      };

      const response = await this.login(userData);
      console.log(response);

      if (response.status !== 200) {
        this.isFailed = true;
        this.errorMessage = response.message
        return;
      }

      this.isFailed = false;

      console.log("response", this.getUser.role);

      alert("Login success!");

      router.push({ name: "home" });

    },
  },
};
</script>

<style scoped>
.text-center {
  text-align: center;
  width: 100%;
}

.containers {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.card-container {
  width: 500px;
  margin: auto;
}

.card-content {
  padding: 20px;
}

.custom-btn {
  padding: 25px !important;
}

.card-action-custom {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
}
</style>
