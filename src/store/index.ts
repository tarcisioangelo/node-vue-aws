import { createStore } from 'vuex'
import drawerModule from './drawer'
import userModule from './user'

const store = createStore({
    modules: {
        drawer: drawerModule,
        user: userModule,
    },
})

export default store
