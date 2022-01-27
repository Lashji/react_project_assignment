"use strict";

const AuthUserComponent = {
  name: "auth-user",
  props: ["loginView", "isLoggedIn"],
  emits: ["login", "register", "logout"],
  data(){
    console.log(this.username, this.password);
    return {
      username: "",
      password: "",
      state: "login"
    }
  },
  methods: {
    handleSubmit(){
      if (this.state === 'register')
      {
        this.$emit('register', {username: this.username,password: this.password})
      } else {
        this.$emit('login', {username: this.username,password: this.password})
      }
    },
    changeState(){
      if (this.state === 'register')
      {
        this.state = 'login'
      }  else {
        this.state = "register"
      }
    }
  },
  computed: {
    linkText(){
      if (this.state === 'login')
      {
        return "Go to register"
      } else if (this.state === 'register') {
        return "Go to login"
      } else {
        return "logout"
      }
    },
    buttonText(){
      if (this.state === 'register')
      {
        return "register"
      } else{
        return "login"
      }
    }

  },
  template: `
    <div>
      <div v-if="!isLoggedIn">
        <div >
            <a @click="e => changeState()" id="switch-link" href="#">{{linkText}}</a>
            <form action="" @submit.stop.prevent="handleSubmit" id="auth-form">
              <input placeholder="username" required id="auth-username" type="text" v-model="username" />
              <input placeholder="password" type="password" required id="auth-password" v-model="password"/>
              <button id="auth-btn" type="submit">{{buttonText}}</button>
            </form>
        </div>
      </div>
      <div v-else>
        <a @click="$emit('logout')" id="switch-link" href="#">Logout</a>
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
      <auth-user :isLoggedIn="isLoggedIn" @logout="logout" @register="register" @login="login"></auth-user>
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
    login({username, password}){
      
      const token = `${username}:${password}` 
      const hash = btoa(token)
      this.token  =`Basic ${hash}`
      this.isLoggedIn = true
      this.getPlayers()
    },
    logout(){
      this.token = ""
      this.players =  [],
      this.player = null,
      this.requestStatus = ""
      this.isLoggedIn = false
    },
    loginFromRegister(token){
      this.token = token
      this.isLoggedIn = true
      
    },
    register({username, password}){
      console.log("register", username, password);
     
      const token = `${username}:${password}` 

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
          password : password
        })
      }).then(res => {

        if (!res.ok)
          this.requestStatus ="An error has occured!!!"
        else {
          this.login({username, password})
        }
      })
      


    },
    handleSubmit(inputVal){
      console.log("handleSubmit", inputVal)
      fetch("http://localhost:3001/api/players", {
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
      token: "",
      isLoggedIn: false
    }
  },

  created() {
    
  },
};
