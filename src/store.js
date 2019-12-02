import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: null
    },
    mutations: {
        setUser(state, data) {
            // 设置登录信息
            console.log("setUser", data);
            state.user = data;
        }
    },
    actions: {}
})
