import { createStore } from "vuex";
import Constant from "../Constant";

export default createStore({
  state: {
    players: [{ name: "Kurri" }, { name: "Gretzky" }],
    notifications: []
  },
  mutations: {
    addPlayer(state, name) {
      state.players.push({ name: name });
    },
    removeIndex(state, index) {
      state.players.splice(index, 1);
    },
    removeLast(state) {
      state.players.pop();
    },
    addNotification(state, status) {
      state.notifications.push(status);
    },
    removeAllNotifications(state) {
      state.notifications = [];
    }
  },

  actions: {
    [Constant.REMOVE_PLAYER]({ commit }, ind) {
      commit("removeIndex", ind);
    },
    [Constant.REMOVE_LAST]({ commit }) {
      commit("removeLast");
    },
    [Constant.REMOVE_DELAY]({ commit }) {
      commit("addNotification", "The last item will be removed with delay");
      setTimeout(() => {
        commit("removeLast");
        commit("removeAllNotifications");
      }, 1000);
    },
    [Constant.ADD_PLAYER]({ commit }, e) {
      const form = e.target;
      const inputElem = form.querySelector("#input_player");
      const inputVal = inputElem.value;
      commit("addPlayer", inputVal);
    }
  },
  getters: {
    players: state => state.players,
    notifications: state => {
      return state.notifications;
    }
  }
});
