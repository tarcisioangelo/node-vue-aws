import { createStore } from 'vuex'

interface DrawerState {
    isDrawerOpen: boolean
}

const state: DrawerState = {
    isDrawerOpen: false,
}

export default createStore({
    state,
    mutations: {
        toggleDrawer(state: DrawerState) {
            state.isDrawerOpen = !state.isDrawerOpen
        },
        openDrawer(state: DrawerState) {
            state.isDrawerOpen = true
        },
        closeDrawer(state: DrawerState) {
            state.isDrawerOpen = false
        },
    },
    actions: {
        toggleDrawer({ commit }) {
            commit('toggleDrawer')
        },
        openDrawer({ commit }) {
            commit('openDrawer')
        },
        closeDrawer({ commit }) {
            commit('closeDrawer')
        },
    },
    getters: {
        isDrawerOpen: (state: DrawerState) => state.isDrawerOpen,
    },
})
