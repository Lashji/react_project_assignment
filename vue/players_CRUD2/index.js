"use strict";

const AuthUserComponent = {
  name: "auth-user",
  props: ["loginView", "isLoggedIn"],
  emits: ["login", "register", "logout", "change-view"],
  template: `
    <div>
      <div v-if="!isLoggedIn">
        <div v-if="loginView">
          <a @click="$emit('change-view', loginView)" id="switch-link" href="#">Go to register</a>
            <form action="" @submit.stop.prevent="form => $emit('login', form)" id="auth-form">
              <input placeholder="username" required id="auth-username" type="text" />
              <input placeholder="password" type="password" required id="auth-password"/>
            <button id="auth-btn" type="submit">login</button>
          </form>
        </div>
        <div v-else>
          <a @click="$emit('change-view', loginView)" id="switch-link" href="#">Go to login</a>
          <form action="" @submit.stop.prevent="form => $emit('register', form)" id="auth-form">
            <input placeholder="username" required id="auth-username" type="text" />
            <input placeholder="password" type="password" required id="auth-password"/>
          <button id="auth-btn" type="submit">register</button>
          </form>
        </div>
      </div>
      <div v-else>
        <a @click="$emit('logout')" id="switch-link" href="#">logout</a>
      </div>
    </div>
  `
};


const AddPlayerComponent = {
  name: "add-player",
  emits: ["add-player"],
  data(){
    return {
      inputVal : "",
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
      <auth-user :isLoggedIn="isLoggedIn" @logout="logout" @register="register" @login="login" @change-view="handleViewChange" :loginView="loginView"></auth-user>
      <div v-if="isLoggedIn">
        <add-player @add-player="handleSubmit"></add-player>
        <list-players @player-clicked=getPlayer :players=players></list-players>
        <show-player @delete-player="deletePlayer" :player=player ></show-player>
        <request-status :requestStatus=requestStatus></request-status>
      </div>
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
      fetch(`http://localhost:3001/api/players/${id}`, {
        method : "DELETE",
        headers: {
          'Authorization': this.token,
          "Content-type": 'application/json'
        },
      }).then(res => {
        if (!res.ok)
            this.requestStatus ="An error has occured!!!"
            else {
            return res.json()
          }
      }).then(res => {
        console.log("delete res=>" , res);
        this.players = this.players.filter(i => i.id !== res.id)
        this.player = null;
      }) 
    },
    login(form){
      const username = form.srcElement[0].value
      const pw = form.srcElement[1].value

      const token = `${username}:${pw}` 
      const hash = btoa(token)
      const basicToken =`Basic ${hash}`

      this.token = basicToken
      this.loginView = true

      this.isLoggedIn = true
        
      this.getPlayers()

    },
    logout(){
      this.token = ""
      this.loginView = true
      this.players =  [],
      this.player = null,
      this.requestStatus = ""
      this.isLoggedIn = false
    },
    loginFromRegister(token){
      this.token = token
      this.isLoggedIn = true
      this.getPlayers()
    },
    register(form){
      console.log("register");
      const username = form.srcElement[0].value
      const pw = form.srcElement[1].value
      const token = `${username}:${pw}` 

      const hash = btoa(token)

      const basicToken =`Basic ${hash}`

      fetch("http://localhost:3001/api/users", {
        method: "POST",
        headers: {
          'Authorization': basicToken,
          "Content-type": 'application/json'
        },
        body: JSON.stringify({
          username : username,
          password : pw
        })
      }).then(res => {{

        if (!res.ok)
          this.requestStatus ="An error has occured!!!"
        else {
          return res.json()
      }
        }}).then(res => {
          this.loginFromRegister(basicToken)
      })

    },
    handleViewChange(view){
      console.log("change loginView", view)
      this.loginView = !view
    },
    handleSubmit(inputVal){
      console.log("handleSubmit", inputVal)
      const response = fetch("http://localhost:3001/api/players/", {
          method : "POST",
          headers: {
          'Authorization': this.token,
          "Content-type": 'application/json'
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
          this.players.push(res)
        })
    },
    makeRequest(url, callback)
    {
      this.requestStatus = "Loading..."
      fetch(url,{
      headers: {
          'Authorization': this.token,
          "Content-type": 'application/json'
        },
      })
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
      requestStatus: "",
      loginView: true,
      token: "",
      isLoggedIn: false
    }
  },

  created() {
    
  },
};
