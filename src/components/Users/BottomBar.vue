<template>
  <v-footer dark padless>
    <v-card class="flex" flat tile>
      <v-card-title class="teal pd">
        <strong class="subheading">
          Get connected with us on social networks!
        </strong>

        <v-spacer></v-spacer>

        <v-btn v-for="icon in icons" :key="icon" class="mx-4" dark icon>
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="py-2 white--text text-center">
        {{ new Date().getFullYear() }} — <strong>BlackWhite Market</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: "userBottomBar",
  data: () => ({
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
    }),
};
</script>

<style>
.text-center {
    text-align: center;
    width: 100%;
}
.pd {
  padding-left: 100px;
  padding-right: 100px;
}
</style>
