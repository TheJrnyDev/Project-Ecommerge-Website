export default {
    namespaced: true,
    state: {
        carts: {},
    },
    mutations: {
        ADD_TO_CART(state, item) {
            // this logic will do when not found cart in localStorage
            if (!state.carts.user_id) {
                const cartObj = {
                    user_id: item.user_id,
                    products: [{ prod_id: item.prod_id, count: 1, price: item.price, imgUrl: item.imgUrl, name: item.name }],
                    count: 1,
                    productsCount: function () {
                        this.count = this.products.length;
                        return this.count;
                    }
                }
                state.carts = cartObj
                console.log('add new cart to local storage: ', state.carts)
                return
            }

            const index = state.carts.products.findIndex(cartItem => cartItem.prod_id === item.prod_id)
            // if product is already exits
            if (index != -1) {
                state.carts.products[index].count++
                console.log('update product to local cart success: ', state.carts.products[index])
            } else {
                const prodObj = {
                    prod_id: item.prod_id, 
                    count: 1, 
                    price: item.price, 
                    imgUrl: item.imgUrl, 
                    name: item.name
                }
                state.carts.products.push(prodObj)
                console.log('add new product to local cart success: ', state.carts)
            }
        },
        SET_CARTS(state, items) {
            // set items object to carts object
            state.carts = items
        }
    },
    actions: {
        addCart(context, item) {
            try {
                console.log('user_id on add cart: ', item.user_id)
                context.dispatch('getCartFromLocal')
                context.commit("ADD_TO_CART", item)
                localStorage.setItem(`cart${item.user_id}`, JSON.stringify(context.getters.getCart));
            } catch (error) {
                console.error('failed to add item to cart: ', error)
            }
        },
        getCartFromLocal(context, user_id) {
            try {
                const products = JSON.parse(localStorage.getItem(`cart${user_id}`))
                if (products) {
                    context.commit("SET_CARTS", products)
                    console.log('found cart in local storage: ', context.getters.getCart)
                } else {
                    console.log('no products in local storage')
                }
            } catch (error) {
                console.error('failed to get product from local storage: ', error)
            }
        },
    },
    getters: {
        getCart: state => state.carts,
        getCount: state => state.carts?.products?.length || 0
    }

}