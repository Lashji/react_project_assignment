"use strict";

const AddPlayerComponent = {
  name: "add-player",
  emits: ["add-player"],
  data(){
    return {
      inputVal : ""
    }
  },
  template: `
    <div>
      <form id="submit-player" action="" @submit.stop.prevent="$emit('add-player',inputVal)">
        <input name="player-name" id="input-player" required="true" type="text" v-model:value="inputVal">
        <button id="add-btn"  type="submit">Add</button>
      </form>
    </div>
  `
};

const ListPlayersComponent = {
  name: "list-players",
  props: ["players"],
  emits: ["player-clicked"],
  template: `
   <div>
    <h3>Players List</h3>
    <ol id="players-list">
      <list-player
        v-for="player in players"
        :key="player.id"
        :player="player"
        @player-clicked="i => $emit('player-clicked', i)"
      ></list-player>
    </ol>
  </div>
  `
};

const ListPlayerComponent = {
  name: "list-player",
  props: ["player"],
  emits: ["player-clicked"],
  template: `<li :id="'player-'+player.id"
>
        <a @click.stop.prevent="$emit('player-clicked', player.id)" href="#"
          >{{player.name}}</a>
      </li>
  `
};

const ShowPlayerComponent = {
  name: "show-player",
  props: ["player"],
  emits: ["delete-player"],
  template: `<div>
    <h3>Selected Player</h3>
    <div v-if="player !== null" id="selected-player">
      <div class='player-id'>{{player.id}}</div>
      <div class="player-name">{{player.name}}</div>
      <div class="player-status">
        {{player.isActive ? "active" : "not active"}}
      </div>
      <button class="delete-btn" @click="$emit('delete-player', player.id)">Delete</button>
      </div>
  </div>
  `
};

const RequestStatusComponent = {
  name: "request-status",
  props: ["requestStatus"],
  template: `
  <div id="request-status">{{requestStatus}}</div>
  `
};

const App = {
  template: `
    <div>
      <add-player @add-player="handleSubmit"></add-player>
      <list-players @player-clicked=getPlayer :players=players></list-players>
      <show-player @delete-player="deletePlayer" :player=player ></show-player>
      <request-status :requestStatus=requestStatus></request-status>
    </div>
  `,
  methods: {
    getPlayers(){
      console.log("getPlayers")
      const url = "http://localhost:3001/api/players"
      this.makeRequest(url, (res) => {
        this.players = res
      })
    },
    getPlayer(id)
    {
      this.makeRequest("http://localhost:3001/api/players/" + id, (res) => {
        this.player = res
      })

    },
    deletePlayer(id)
    {
      console.log("id:", id)

      fetch(`http://localhost:3001/api/players/${id}`, {
        method : "DELETE",
      })

    },
    async handleSubmit(inputVal){
      console.log("handleSubmit", inputVal)
      const response = await  fetch("http://localhost:3001/api/players/", {
          method : "POST",
          headers: {
            "Content-Type": 'application/json'
          },
          body: JSON.stringify({name: inputVal, isActive: false})
        }
      ).then(res => {
          if (!res.ok)
            this.requestStatus ="An error has occured!!!"
            else {
            return res.json()
          }
        })
        .then(res => {
          console.log("response", res)
          return res
        })
    },
    makeRequest(url, callback)
    {
      this.requestStatus = "Loading..."
      fetch(url)
      .then(res => {
        if (!res.ok)
          this.requestStatus = "An error has occured!!!"
        else 
          return res.json()
      })
      .then(res => {
        this.requestStatus = ""
        callback(res)
      })
    }
  },
  data() {
    return {
      players: [],
      player: null,
      requestStatus: ""
    }
  },
  created() {
    console.log("list players")
    this.getPlayers()
  },
};
