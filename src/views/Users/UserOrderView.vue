<template>
  <div>
    <UserLayout v-if="!getStateLoad">
      <div>User Order View</div>
    </UserLayout>
  </div>
</template>

<script>
import UserLayout from "@/layouts/UserLayout.vue";
import router from "@/router/routerIndex";
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  components: {
    UserLayout
  },
  methods: {
    ...mapActions("auth", ["identify", "setStateLoad"]),
    // Local function here
    async preIdentify() {
      this.setStateLoad(true)
      const res = await this.identify();
      console.log("identify res: ", res);

      if (res !== 'user' && res !== 'admin') {
        alert("Dear shoppolian. Please login before enter this page.");
        router.push({ name: 'home' });
        return;
      }

      this.setStateLoad(false)
      // await setTimeout(() => {
      //   this.setStateLoad(false);
      // }, 3000)

    },
  },
  computed: {
    ...mapGetters("auth", ["getUser", "getStateLoad"]),
  },
  async created() {
    await this.preIdentify()
  },
};
</script>

<style></style>
