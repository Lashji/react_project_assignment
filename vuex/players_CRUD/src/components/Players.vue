<template>
  <form @submit.prevent="add">
    <input
      id="input_player"
      type="text"
      placeholder="name-of-the-player"
      :value="current_player"
    />
    <button id="add_btn">Add Player</button>
  </form>

  <ul id="playerlist">
    <li v-for="(player, index) in state.players" :key="index">
      {{ player.name }}
      <button @click="remove(index)">🗑️</button>
    </li>
  </ul>
</template>
<script>
import Constant from "../Constant";
import { reactive } from "vue";
import { mapActions } from "vuex";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const state = reactive(store.state);

    return {
      state
    };
  },
  methods: {
    ...mapActions({
      add: Constant.ADD_PLAYER,
      remove: Constant.REMOVE_PLAYER
    })
  }
};
</script>
