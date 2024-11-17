<template>
  <div class="container">
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
            <h3 class="headline mb-0">Register</h3>
          </div>
        </v-card-title>
        <div class="text-center" v-if="!isFailed">
          Join us become to panshop !!
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
            Are you have an account?
            <router-link :to="{ name: 'login' }"
              ><b><u>Get back to loggin</u></b></router-link
            >
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn
            :disabled="!valid"
            class="custom-btn"
            flat
            color="primary"
            rounded
            block
            @click="submitForm()"
          >
            Register
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      isFailed: false,
      valid: true,
      errorMessage: "",
      username: "",
      name: "",
      password: "",
      conpwd: "",
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
          rules: [
            (v) => !!v || "Username is required",
            (v) =>
              (v || "").length >= 4 ||
              "Username must require at least 4 character",
          ],
        },
        {
          icon: "mdi-account-box",
          name: "name",
          id: "name",
          label: "Your name",
          hint: "Type your name",
          outlined: true,
          type: "text",
          vModel: "name",
          rules: [(v) => !!v || "Name is required"],
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
          rules: [
            (v) => !!v || "Password is required",
            (v) =>
              (v || "").length >= 8 ||
              "Password must require at least 8 character",
          ],
        },
        {
          icon: "mdi-lock",
          name: "conpwd",
          id: "conpwd",
          label: "Confirm Password",
          hint: "Confirm your password",
          outlined: true,
          type: "password",
          vModel: "conpwd",
          rules: [
            (v) => !!v || "Password is required",
            (v) => v === this.password || "Password not match",
            (v) =>
              (v || "").length >= 8 ||
              "Password must require at least 8 character",
          ],
        },
      ],
    };
  },
  computed: {
    ...mapGetters("auth", ["getUser"]),
  },
  methods: {
    ...mapActions("auth", ["register"]),
    async submitForm() {
      const userData = {
        username: this.username,
        password: this.password,
      };

      const response = await this.register(userData);

      if (response.status !== 201) {
        this.isFailed = true;
        this.errorMessage = response.message;
        return;
      }

      this.isFailed = false;

      alert("Register Success")

    },
  },
};
</script>

<style scoped>
@import "../assets/globalCSS.css";

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
