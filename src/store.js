import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    own: null
  },
  mutations: {
    setOwn(data) {
      // 设置登录信息
      console.log("setOwn", data);
      this.state.own = data;
    }
  },
  actions: {}
})
