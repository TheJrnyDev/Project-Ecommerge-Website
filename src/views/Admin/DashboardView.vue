<template>
  <div>
    <div v-if="!getStateLoad">Hello Admin</div>
    <LoadCircleVue v-if="getStateLoad"></LoadCircleVue>
  </div>
</template>

<script>
import router from "@/router/routerIndex";
import { mapGetters, mapActions } from "vuex";
import LoadCircleVue from "@/components/LoadCircle.vue";

export default {
  components: {
    LoadCircleVue,
  },
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters("auth", ["getUser", "getStateLoad"]),
  },
  methods: {
    ...mapActions("auth", ["identify", "setStateLoad"]),
    async preIdentify() {
      this.setStateLoad(true);
      const res = await this.identify();
      console.log("identify res: ", res);
      // check role here
      await setTimeout(() => {
        if (res !== "admin") {
          alert("Dear shoppolian. Only admin can enter this page");
          router.push({ name: "home" });
        } else {
          // hide loading
          this.setStateLoad(false);
        }
      }, 2000);
    },
  },
  created() {
    console.log("current user in dashboard : ", this.getUser);
    this.preIdentify();
  },
  watch: {
    getStateLoad(newValue, oldValue) {
      console.log(`Loading state is change from ${oldValue} to ${newValue} `);
    },
  },
};
</script>

<style></style>
