<template>
  <div>
    <UserLayout v-if="!getStateLoad">
      <div class="box-container">
        <div class="flex-box">
          <v-spacer></v-spacer>
          <v-btn large color="success" @click="addDialog = true">
            <v-icon left>mdi-plus</v-icon>
            Create new item
          </v-btn>
        </div>
        <v-simple-table fixed-header>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left table-header">ID</th>
                <th class="text-left table-header">Picture</th>
                <th class="text-left table-header">Name</th>
                <th class="text-left table-header">Price</th>
                <th class="text-left table-header">Stock</th>
                <th class="text-left table-header">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in getProducts" :key="product._id">
                <td class="table-cell">{{ product._id }}</td>
                <td class="table-cell">
                  <v-img
                    :lazy-src="product.imgUrl"
                    max-height="150"
                    max-width="200"
                    :src="product.imgUrl"
                  >
                  </v-img>
                </td>
                <td class="table-cell">{{ product.name }}</td>
                <td class="table-cell">{{ product.price }}</td>
                <td class="table-cell">{{ product.stock }}</td>
                <td class="table-cell">
                  <v-btn icon large color="black" @click="editProductDialog(product)">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn icon large color="error" @click="deleteProductDialog(product)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>

        <v-dialog v-model="addDialog" max-width="500px">
          <v-card>
            <v-card-title>Add New Product</v-card-title>
            <v-card-text>
              <v-form ref="form" @submit.prevent="preAddProduct" v-model="valid">

                <v-text-field
                  v-model="product.name"
                  label="Name"
                  type="text"
                  :rules="[(v) => !!v || 'Name is required']"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="product.imgUrl"
                  label="Image URL"
                  type="text"
                  :rules="[(v) => !!v || 'Image URL is required']"
                  required
                ></v-text-field>

                <v-img
                  v-if="product.imgUrl"
                  :src="product.imgUrl"
                  max-height="200"
                  contain
                ></v-img>

                <v-text-field
                  v-model.number="product.stock"
                  label="Stock"
                  type="number"
                  :rules="[
                    (v) => !!v || 'Stock is required',
                    (v) => v > 0 || 'Stock must be greater than 0',
                  ]"
                  required
                ></v-text-field>

                <v-text-field
                  v-model.number="product.price"
                  label="Price"
                  type="number"
                  :rules="[
                    (v) => !!v || 'Price is required',
                    (v) => v > 0 || 'Price must be greater than 0',
                  ]"
                  required
                ></v-text-field>

                <v-btn
                    type="submit"
                    color="primary"
                    class="mt-4"
                    :disabled="!valid"
                    block
                  >
                    <v-icon left>mdi-plus</v-icon>
                    Add
                  </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>

        <v-dialog v-model="editDialog" max-width="500px">
          <v-card>
            <v-card-title>Edit Product</v-card-title>
            <v-card-text>
              <v-form ref="editForm" @submit.prevent="editProduct" v-model="editValid">

                <v-text-field
                  v-model="selectedProduct._id"
                  label="ID"
                  type="text"
                  readonly
                  required
                ></v-text-field>

                <v-text-field
                  v-model="selectedProduct.name"
                  label="Name"
                  type="text"
                  :rules="[(v) => !!v || 'Name is required']"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="selectedProduct.imgUrl"
                  label="Image URL"
                  type="text"
                  :rules="[(v) => !!v || 'Image URL is required']"
                  required
                ></v-text-field>

                <v-img
                  v-if="selectedProduct.imgUrl"
                  :src="selectedProduct.imgUrl"
                  max-height="200"
                  contain
                ></v-img>

                <v-text-field
                  v-model.number="selectedProduct.stock"
                  label="Stock"
                  type="number"
                  :rules="[
                    (v) => !!v || 'Stock is required',
                    (v) => v > 0 || 'Stock must be greater than 0',
                  ]"
                  required
                ></v-text-field>

                <v-text-field
                  v-model.number="selectedProduct.price"
                  label="Price"
                  type="number"
                  :rules="[
                    (v) => !!v || 'Price is required',
                    (v) => v > 0 || 'Price must be greater than 0',
                  ]"
                  required
                ></v-text-field>

                <v-btn
                    type="submit"
                    color="primary"
                    class="mt-4"
                    :disabled="!editValid"
                    block
                  >
                    <v-icon left>mdi-content-save</v-icon>
                    Save
                  </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>

        <v-dialog v-model="deleteDialog" max-width="500px">
          <v-card>
            <v-card-title>Confirm Delete</v-card-title>
            <v-card-text>Is sure that you want to delete this item?</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn outlined @click="deleteDialog = false">No</v-btn>
              <v-btn color="error" @click="removeProduct()">Yes</v-btn>
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
      addDialog: false,
      editDialog: false,
      deleteDialog: false,
      valid: false,
      product: {
        name: "",
        imgUrl: "",
        stock: null,
        price: null,
      },
      selectedProduct: {},      
      editValid: false,
    };
  },
  computed: {
    ...mapGetters("auth", ["getUser", "getStateLoad"]),
    ...mapGetters("product", ["getProducts"]),
  },
  methods: {
    ...mapActions("auth", ["identify", "setStateLoad"]),
    ...mapActions("product", ["fetchProducts", "addProduct", "updateProduct", "deleteProduct"]),

    // local method
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
    async preAddProduct() {
      if (this.$refs.form.validate()) {
        await this.addProduct(this.product)

        this.addDialog = false;
        setTimeout(() => {
          this.resetForm();
        }, 1500)
      }
    },
    resetForm() {
      this.$refs.form.reset();
      this.product = {
        name: "",
        imgUrl: "",
        stock: null,
        price: null,
      };
    },
    editProductDialog(product) {
      this.editDialog = true
      this.selectedProduct = product
    },
    async editProduct() {
      if (this.$refs.editForm.validate()) {
        console.log('edit product: ', this.selectedProduct)
        await this.updateProduct(this.selectedProduct)
        this.editDialog = false;
      }
    },    
    async deleteProductDialog(product) {
      this.deleteDialog = true
      this.selectedProduct = product
    },
    async removeProduct() {
      console.log('remove product: ', this.selectedProduct)
      await this.deleteProduct(this.selectedProduct)
      this.deleteDialog = false;
    }
  },
  async created() {
    this.preIdentify();
    this.fetchProducts();
    // console.log("get product on prodManagement: ", this.getProducts);
  },
  watch: {
    getStateLoad(newValue, oldValue) {
      console.log(`Loading state is change from ${oldValue} to ${newValue} `);
    },
  },
};
</script>

<style scoped>
.box-container {
  padding: 20px 120px 20px 120px;
  background-color: white;
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
.flex-box {
  display: flex;
  margin-bottom: 20px;
}
</style>
