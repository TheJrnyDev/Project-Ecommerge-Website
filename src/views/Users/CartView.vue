<template>
  <div>
    <UserLayout v-if="!getStateLoad">
      <div class="flex-container">
        <div class="left">
          <div class="box-container" style="height: 100%">
            <v-simple-table fixed-header style="height: 100%">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left table-header">Name</th>
                    <th class="text-left table-header">Picture</th>
                    <th class="text-left table-header">Price</th>
                    <th class="text-left table-header">Count</th>
                    <th class="text-left table-header">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="product in carts" :key="product._id">
                    <td class="table-cell">{{ product.name }}</td>
                    <td class="table-cell">
                      <v-img
                        :lazy-src="product.imgUrl"
                        max-height="150"
                        max-width="200"
                        :src="product.imgUrl"
                      >
                      </v-img>
                    </td>
                    <td class="table-cell">{{ product.price }}</td>
                    <td class="table-cell">{{ product.count }}</td>
                    <td class="table-cell">
                      {{ getSum(product.price, product.count) }}฿
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </div>
        </div>
        <div class="right d-flex flex-column">
          <v-card
            style="
              padding: 20px;
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            "
          >
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">Total Price:</h3>
                <div>9999฿</div>
              </div>
            </v-card-title>
            <v-card-title primary-title>
              <div>
                <div>Enter your address:</div>
                <div style="margin-top: 10px">
                  <v-textarea
                    outlined
                    style="font-size: 12px"
                    v-model="address"
                  ></v-textarea>
                </div>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn flat dark block @click="submitOrder()">Order!</v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </div>
    </UserLayout>
  </div>
</template>

<script>
import UserLayout from "@/layouts/UserLayout.vue";
import router from "@/router/routerIndex";
import axios from "axios";
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      carts: {},
      address: "",
    };
  },
  components: {
    UserLayout,
  },
  methods: {
    ...mapActions("auth", ["identify", "setStateLoad"]),
    ...mapActions("cart", ["getCartFromLocal"]),

    // Local function here
    async preIdentify() {
      this.setStateLoad(true);
      const res = await this.identify();
      console.log("identify res: ", res);

      if (res !== "user" && res !== "admin") {
        alert("Dear shoppolian. Please login before enter this page.");
        router.push({ name: "home" });
        return;
      }

      this.setStateLoad(false);
    },

    getSum(price, count) {
      return price * count;
    },

    async submitOrder() {
      if (this.address === "") {
        alert("Please enter your address");
      }

      const obj = this.getCart;

      try {
        const res = await axios.post(
          `http://localhost:3000/api/v1/orders`,
          {
            user_id: obj.user_id,
            products: obj.products,
            address: this.address,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        // update stock
        const products = obj.products;
        for (let index = 0; index < products.length; index++) {
          // bug
          await axios.put(
            `http://localhost:3000/api/v1/products/${products[index].prod_id}`,
            {
              name: products[index].name,
              stock: Number(products[index].count),
              price: Number(products[index].price),
              imgUrl: products[index].imgUrl,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
        }

        console.log("make order result: ", res);

        // setTimeout(() => {
        //   localStorage.removeItem(`cart${this.getUser._id}`);
        // }, 10000);
      } catch (error) {
        console.log("error to make order", error);
      }
    },
  },
  computed: {
    ...mapGetters("auth", ["getUser", "getStateLoad"]),
    ...mapGetters("cart", ["getCart"]),
    ...mapGetters("product", ["getProducts"]),
  },
  async created() {
    await this.preIdentify();
    await this.getCartFromLocal(this.getUser._id);
    const cartObj = this.getCart;
    this.carts = cartObj.products;
    console.log("cart result: ", this.getCart);
  },
};
</script>

<style>
.flex-container {
  display: flex;
  gap: 20px;
  justify-content: space-between;
  align-items: stretch;
  height: 100%;
  width: 100%;
}
.left {
  flex: 1;
  height: 100%;
}
.right {
  height: 100%;
  width: 20%;
}
</style>
