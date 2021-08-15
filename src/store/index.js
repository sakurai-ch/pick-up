import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({
    key: 'pickUp',
    paths: ['markers'],
    storage: window.sessionStorage
  })],
  state: {
    markers: [
      { name: "田中", position: { lat: 36.22, lng: 140.10 } },
      { name: "鈴木", position: { lat: 36.19, lng: 140.20 } },
      { name: "櫻井", position: { lat: 36.25, lng: 140.15 } },
    ]
  },
  mutations: {
    addMarker(state, targetData) {
      this.state.markers.push(targetData);
    },
    deleteMarker(state, targetNum) {
      this.state.markers.splice(targetNum, 1);
    }
  },
  actions: {
  },
  modules: {
  }
})
