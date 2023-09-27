//store.js
import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export const store = new Vuex.Store({
  plugins: [createPersistedState({ paths: ["datafavorite", "catava"] })],

  state: {
    datafavorite: [],
    catava: "",
    // המצב הגלובלי שלך כאן. לדוג', count: 0
  },
  mutations: {
    push(state, item) {
      state.datafavorite.push(item);
    },
    remove(state, itemR) {
      let i = state.datafavorite.indexOf(itemR._id);
      state.datafavorite.splice(i, 1);
    },
    rest(state) {
      state.datafavorite = [];
    },
    ctov(state, params) {
      state.catava = params;
    },
    // פונקציות שמשנות את המצב כאן
  },
  actions: {
    // פונקציות אסינכרוניות או פונקציות שמבצעות שינויים דרך הmutations
  },
  getters: {
    // פונקציות שמחזירות מידע מסוים מה-state
  },
});
