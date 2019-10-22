import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        loginInfo: null
    },
    mutations: {
        setLoginInfo(state, data) {
            // 设置登录信息
            console.log("setLoginInfo", data);
            state.loginInfo = data;
        }
    },
    actions: {}
})
