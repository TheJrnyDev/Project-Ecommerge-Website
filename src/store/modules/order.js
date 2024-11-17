// import axios from "axios";

// const BASE_URL = "http://localhost:3000/api/v1"

// export default {
//     namespaced: true,
//     state: {
//         orders: [],
//         isLoading: false,
//     },
//     mutations: {
//         ADD_TO_CART(state, product) {
//             state.orders = product
//         },
//         REMOVE_FROM_CART(state, product) {
//             state.selectedProduct = product
//         },
//         SET_ORDERS(state, orders) {
//             state.orders = orders
//         },
//         SET_LOADING(state, loadState) {
//             state.isLoading = loadState
//         }
//     },
//     actions: {
//         addToCart(context, data) {
//             try {
//                 const orderObj = {
//                     user_id: data.user_id,
//                     products: [{ product_id: data._id, count: data.count }]
//                 }
//                 const response = axios.post(`${BASE_URL}/order`, orderObj)
//                 if (!response) {
//                     return
//                 }
//                 console.log('create order success, ', response.data)
//             } catch (error) {
//                 const err = error.response?.data?.message ? error.response.data.message : error
//                 console.error('create order failed: ', err)
//                 return err
//             }
//         },
//         async fetchOrders(context) {
//             try {
//                 const response = axios.get(`${BASE_URL}/order`, orderObj)
//                 if (!response) {
//                     return
//                 }
//                 console.log('fetch order success, ', response.data)
//             } catch (error) {
//                 const err = error.response?.data?.message ? error.response.data.message : error
//                 console.error('fetch order failed: ', err)
//                 return err
//             }
//         }
//         async createOrder(context) {
//             const order = localStorage.getItem("order")
//         }
//     },
//     getters: {
//         getProducts: state => state.products
//     }
// }