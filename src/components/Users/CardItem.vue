<template>
  <v-row class="mt-12">
    <v-col v-for="(item) in items" :key="item._id" cols="3">
      <v-card class="mx-auto my-4 items-stretch" max-width="374">
        <v-img
          height="250"
          :src="item.imgUrl"
        ></v-img>

        <v-card-title>{{ item.name }}</v-card-title>

        <v-card-text>
          <v-row align="center" class="mx-0">
            <v-rating
              :value="4.5"
              color="amber"
              dense
              half-increments
              readonly
              size="14"
            ></v-rating>

            <div class="grey--text ms-4">4.5 (413)</div>
          </v-row>

          <div class="my-4 text-subtitle-1">{{ item.price }} Baht. • Stock ({{ item.stock }})</div>

          <div>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
          </div>
        </v-card-text>

        <!-- <v-divider class="mx-4"></v-divider> -->

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="deep-purple lighten-2" text @click="action(item)">
            Add to cart
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "userProduct",
  props: {
    items: Array,
    action: Function
  }
};
</script>

<style>
  .item-container {
    margin-bottom: 0 !important;
  }
</style>
