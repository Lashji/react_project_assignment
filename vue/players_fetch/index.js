"use strict";

const template= `
<div>
  <div>
    <h3>Players List</h3>
    <ol id="players-list">
      <li
        v-for="player in players"
        :key="player.id"
        :id="'player-'+player.id"
      >
        <a @click.stop.prevent="getPlayer(player.id)" href="#"
          >{{player.name}}</a
        >
      </li>
    </ol>
  </div>
  <div>
    <h3>Selected Player</h3>
    <div v-if="selectedPlayer !== null" id="selected-player">
      <div class='player-id'>{{selectedPlayer.id}}</div>
      <div class="player-name">{{selectedPlayer.name}}</div>
      <div class="player-status">
        {{selectedPlayer.isActive ? "active" : "not active"}}
      </div>
    </div>
  </div>
  <div id="request-status">{{reqStatus}}</div>
</div>
`

const App = {
  template: template,
  created() {
    this.getPlayers();
  },
  data(){
    let players = [] 

    return {
      players,
      selectedPlayer : null
      ,reqStatus : ""
    }
  },
  methods: {
    getPlayers(){
      this.reqStatus = "Loading..."

      fetch("http://localhost:3001/api/players")
      .then(res => {
        if (!res.ok)
          this.reqStatus = "An error has occured!!!"
        else 
          return res.json()
      }
      )
      .then(res => {
        this.reqStatus = ""
        this.players =  res
      })
    },
    getPlayer(id){
      this.reqStatus = "Loading..."

      fetch(`http://localhost:3001/api/players/${id}`)
      .then(res => {
        if (!res.ok)
          this.reqStatus = "An error has occured!!!"
        else 
          return res.json()
      }
      )
      .then(res => {

        if (!res.ok)
          this.reqStatus = "An error has occured!!!"

        this.selectedPlayer = res
        this.reqStatus = ""
      })

    }
  },
};