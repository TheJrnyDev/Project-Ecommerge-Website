import axios from 'axios'
const BASE_URL = "http://localhost:3000/api/v1"

export default {
    namespaced: true,
    state: {
        user: {},
        isLoading: false,
        users: []
    },
    mutations: {
        // Mutation should be synchonus function only.
        SET_USER(state, user) {
            state.user = user
        },
        SET_LOADING(state, loadState) {
            state.isLoading = loadState
        },
        SET_APPROVE_LIST(state, approveList) {
            state.users = approveList
        }
    },
    actions: {
        // Using actions to make an asynchonus function.
        async login(context, formData) {
            try {
                console.log(BASE_URL)
                const { data } = await axios.post(`${BASE_URL}/login`, formData)
                context.commit('SET_USER', data.data)
                console.log('login res: ', context.getters.getUser)
                localStorage.setItem('token', context.getters.getUser.token)
                return data
            } catch (error) {
                // alert('Login Failed ' + error)
                const err = error.response?.data?.message ? error.response.data.message : error
                console.error('Login failed: ', err)
                return err
            }
        },
        async register(_, formData) {
            try {
                const { data } = await axios.post(`${BASE_URL}/register`, formData)
                return data
            } catch (error) {
                const err = error.response?.data?.message ? error.response.data.message : error
                console.error('Login failed: ', err)
                return err
            }
        },
        async approve(context, users) {
            try {
                const { data } = await axios.put(`${BASE_URL}/approve/${users.user_id}`,
                    {
                        value: users.value
                    },
                    { // config here
                        headers: {
                            Authorization: `Bearer ${context.state.user.token}`,
                        },
                    }
                )
                return data
            } catch (error) {
                const err = error.response?.data?.message ? error.response.data.message : error
                console.error('Login failed: ', err)
                return err
            }
        },
        async identify(context) {
            try {
                if (!localStorage.getItem('token')) {
                    return
                }
                const user = await axios.get(`${BASE_URL}/identify`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                })
                // console.log('res: ', user)
                const userObj = user.data.data
                const updateUserState = {
                    username: userObj.username,
                    role: userObj.role,
                    _id: userObj._id,
                    token: localStorage.getItem('token')
                }
                context.commit('SET_USER', updateUserState)
                // console.log('users: ', context.getters.getUser)
                return context.getters.getUser.role
            } catch (error) {
                const err = error.response?.data?.message ? error.response.data.message : error
                console.error('Identify failed:  ', err)
                return err
            }
        },
        async getUsers(context) {
            try {
                // console.log(localStorage.getItem('token'))
                if (!localStorage.getItem('token')) {
                    return
                }
                const { data } = await axios.get(`${BASE_URL}/users`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                })
                context.commit("SET_APPROVE_LIST", data.data)
            } catch (error) {
                const err = error.response?.data?.message ? error.response.data.message : error
                console.error('Identify failed: ', err)
                return err
            }
        },
        setStateLoad(context, value) {
            context.commit("SET_LOADING", value)
        },
        removeToken(context) {
            const user = context.getters.getUser
            delete user.token
            context.commit("SET_USER", user)
        }
    },
    getters: {
        getUser: state => state.user,
        getStateLoad: state => state.isLoading,
        getAllUsers: state => state.users
    }
}