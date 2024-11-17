<template>
  <div>
    <UserLayout v-if="!getStateLoad">
      <div>
        <v-simple-table fixed-header class="table-container">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left table-header">ID</th>
                <th class="text-left table-header">Username</th>
                <th class="text-left table-header">Approve Status</th>
                <th class="text-left table-header">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in getAllUsers" :key="user._id">
                <td class="table-cell">{{ user._id }}</td>
                <td class="table-cell">{{ user.username }}</td>
                <td
                  class="table-cell"
                  :class="{
                    'red--text': !user.isApprove,
                    'green--text': user.isApprove,
                  }"
                >
                  <b>{{ user.isApprove }}</b>
                </td>
                <td class="table-cell">
                  <v-btn
                    v-if="!user.isApprove"
                    min-width="150"
                    color="success"
                    @click="openApproveDialog(user)"
                  >
                    <v-icon>mdi-check-bold</v-icon>
                    Approve
                  </v-btn>
                  <v-btn
                    v-if="user.isApprove"
                    min-width="150"
                    dark
                    @click="openApproveDialog(user)"
                  >
                    <v-icon>mdi-close-thick</v-icon>
                    Revoke
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>

        <v-dialog v-model="dialog" max-width="400">
          <v-card>
            <v-card-title>{{ dialogHeader }}</v-card-title>
            <v-card-text>{{ dialogContext }}</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red" text @click="closeDialog">No</v-btn>
              <v-btn color="green" text @click="approveUser">Yes</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </UserLayout>
    <LoadCircleVue v-if="getStateLoad"></LoadCircleVue>
  </div>
</template>

<script>
import router from "@/router/routerIndex";
import { mapGetters, mapActions } from "vuex";

import LoadCircleVue from "@/components/LoadCircle.vue";
import UserLayout from "@/layouts/UserLayout.vue";
export default {
  components: {
    LoadCircleVue,
    UserLayout,
  },
  data() {
    return {
      isLoading: false,
      dialog: false,
      dialogHeader: "",
      dialogContext: "",
      selectedUser: null,
    };
  },
  computed: {
    ...mapGetters("auth", ["getUser", "getStateLoad", "getAllUsers"]),
  },
  methods: {
    ...mapActions("auth", ["identify", "setStateLoad", "getUsers", "approve"]),

    // Local Method
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
    openApproveDialog(user) {
      if (user.isApprove === false) {
        this.dialogHeader = "Confirm Approval";
        this.dialogContext = "Are you sure you want to approve this user?";
      } else {
        this.dialogHeader = "Confirm Revoke";
        this.dialogContext =
          "Are you sure you want to revoke approval for this user?";
      }
      this.selectedUser = user;
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
      this.selectedUser = null;
    },
    async approveUser() {
      if (this.selectedUser) {
        console.log(`Approving user: ${this.selectedUser.username}`);
        // update ui by easy way
        this.selectedUser.isApprove = !this.selectedUser.isApprove;

        const response = await this.approve({
          user_id: this.selectedUser._id,
          value: this.selectedUser.isApprove,
        });
        console.log("try to approve result: ", response);
      }
      this.closeDialog();
    },
    // END METHOD
  },
  async created() {
    this.preIdentify();
    await this.getUsers();
  },
  watch: {
    getStateLoad(newValue, oldValue) {
      console.log(`Loading state is change from ${oldValue} to ${newValue} `);
    },
  },
};
</script>

<style scoped>
.table-container {
  padding: 20px 120px 20px 120px;
}
.table-header {
  font-size: 14px !important;
}
.table-content {
  font-size: 14px;
}
.table-cell {
  font-size: 14px;
}
</style>
