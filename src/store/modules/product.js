import axios from "axios";

const BASE_URL = "http://localhost:3000/api/v1"

export default {
    namespaced: true,
    state: {
        products: [],
        selectedProduct: {},
        isLoading: false,
    },
    mutations: {
        SET_PRODUCTS(state, products) {
            state.products = products
        },
        SET_SELECTED_PRODUCT(state, product) {
            state.selectedProduct = product
        },
        SET_LOADING(state, loadState) {
            state.isLoading = loadState
        }
    },
    actions: {
        async fetchProducts(context) {
            try {
                const { data } = await axios.get(`${BASE_URL}/products`)
                context.commit('SET_PRODUCTS', data.data)
                // console.log('fetch products res: ', context.getters.getProducts)
                return data
            } catch (error) {
                const err = error.response?.data?.message ? error.response.data.message : error
                console.error('fetch products failed: ', err)
                return err
            }
        },
        async fetchProduct(context) {
            try {
                const { data } = await axios.get(`${BASE_URL}/products`)
                context.commit('SET_PRODUCTS', data.data)
                console.log('fetch products res: ', context.getters.getProducts)
                return data
            } catch (error) {
                const err = error.response?.data?.message ? error.response.data.message : error
                console.error('fetch products failed: ', err)
                return err
            }
        },
        async addProduct(context, product) {
            try {
                const { data } = await axios.post(`${BASE_URL}/products`, {
                    "name": product.name,
                    "stock": product.stock,
                    "price": product.price,
                    "imgUrl": product.imgUrl
                },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        }
                    }
                );
                context.dispatch('fetchProduct')
                console.log('add products success: ', data.data)
            } catch (error) {
                const err = error.response?.data?.message ? error.response.data.message : error
                console.error('add products failed: ', err)
                return err
            }
        },
        async updateProduct(context, product) {
            try {
                const { data } = await axios.put(`${BASE_URL}/products/${product._id}`, {
                    "name": product.name,
                    "stock": product.stock,
                    "price": product.price,
                    "imgUrl": product.imgUrl
                },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        }
                    }
                );
                context.dispatch('fetchProduct')
                console.log('update products success: ', data.data)
            } catch (error) {
                const err = error.response?.data?.message ? error.response.data.message : error
                console.error('update products failed: ', err)
                return err
            }
        },
        async deleteProduct(context, product) {
            try {
                await axios.delete(`${BASE_URL}/products/${product._id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        }
                    }
                );
                context.dispatch('fetchProduct')
                console.log('delete products success ')
            } catch (error) {
                const err = error.response?.data?.message ? error.response.data.message : error
                console.error('delete products failed: ', err)
                return err
            }
        },
        async getProductFromCart(context, user_id) {
            try {
                const token = localStorage.getItem('token')
                if (!token) {
                    return
                }

                const cartProduct = JSON.parse(localStorage.getItem(`cart${user_id}`))
                if (!cartProduct) {
                    console.log("product store say: Not found cart in local storage")
                    return
                }

                const products = context.getters.getProducts
                let updatedProducts = [...products] // Create a new array to avoid mutating the original

                cartProduct.products.forEach((item) => {
                    const index = updatedProducts.findIndex(prod => prod._id === item.prod_id)
                    if (index !== -1) {
                        // Update the stock
                        updatedProducts[index] = {
                            ...updatedProducts[index],
                            stock: updatedProducts[index].stock - item.count
                        }
                    }
                })
                // Commit the updated products to the store
                context.commit("SET_PRODUCTS", updatedProducts)
            } catch (error) {
                const err = error.response?.data?.message ? error.response.data.message : error
                console.error('get cart from local failed: ', err)
                return err
            }
        },
        updateStock(context, item) {
            try {
                const products = context.getters.getProducts
                const index = products.findIndex((prod) => prod._id === item._id)
                if (products[index].stock <= 0) {
                    return 'Item out of stock!'
                }
                products[index].stock--
                context.commit("SET_PRODUCTS", products)
                // console.log('update stock')
                return true
            } catch (error) {
                const err = error.response?.data?.message ? error.response.data.message : error
                console.error('update stock failed: ', err)
                return err
            }
        },
        setLoadState(context, value) {
            context.commit('SET_LOADING', value)
        }
    },
    getters: {
        getProducts: state => state.products
    }
}