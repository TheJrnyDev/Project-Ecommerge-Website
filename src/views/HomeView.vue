<template>
  <div class="containers">
    <UserLayout>
      <div class="banner-container">
        <!-- Left section with image -->
        <div style="max-height: 400px">
          <v-img
            src="../../public/img/bg-banner.jpg"
            max-width="400px"
            max-height="400px"
            cover
          ></v-img>
        </div>

        <!-- Right section with information -->
        <v-card flat tile class="card-container">
          <!-- Header section -->
          <v-card-title class="text-h4 pa-4">
            Pandamonium of Choices <br />
            Bamboo-zling Deals!
          </v-card-title>

          <v-card-text style="margin-top: 20px;">
            <p>
              Black White Market is an e-commerce platform that offers a wide
              range of products, emphasizing simplicity, clarity, and ease of
              use - just like the straightforward colors of a panda.
            </p>
          </v-card-text>
          <v-spacer></v-spacer>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="info" text>Let's shop now</v-btn>
          </v-card-actions>
        </v-card>
      </div>

      <!-- products -->
      <div>
        <CardItem :items="getProducts" :action="addToCart" />
      </div>
    </UserLayout>
  </div>
</template>

<script>
// import
import UserLayout from "@/layouts/UserLayout.vue";
import { mapActions, mapGetters } from "vuex";
import CardItem from "@/components/Users/CardItem.vue";

// structure
export default {
  name: "Home",

  components: {
    UserLayout,
    CardItem,
  },
  data() {
    return {
      isLogin: false,
    };
  },
  methods: {
    ...mapActions("product", ["fetchProducts"]),
    ...mapActions("cart", ["addCart"]),
    ...mapActions("product", ["updateStock"]),

    // local method
    async addToCart(item) {
      if (!this.getUser.token) {
        alert(
          "We are glad to see your interest in our products. Please login before adding our product :)"
        );
        return;
      }
      item.user_id = this.getUser._id;

      const newItemOrder = {
        user_id: item.user_id,
        prod_id: item._id,
        price: item.price,
        imgUrl: item.imgUrl,
        name: item.name,
      };

      if (item.stock <= 0) {
        return alert("Item out of stock!");
      }

      this.addCart(newItemOrder);

      const res = await this.updateStock(item);
      if (res !== true) {
        console.log("result about update stock: ", res);
        alert(res);
      }
      console.log("item selected: ", item);
    },
    checkCart() {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      console.log("Current cart:", cart);
    },
  },
  computed: {
    ...mapGetters("auth", ["getUser"]),
    ...mapGetters("product", ["getProducts"]),
  },
  async created() {
    await this.fetchProducts();
  },
};
</script>

<style>
.banner-container {
  display: flex;
  justify-content: center;
  align-items: stretch;
  border-radius: 100px;
}
.card-container {
  min-width: 500px;
  max-width: 600px;
  padding: 10px;
  max-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
