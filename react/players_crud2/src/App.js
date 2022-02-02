import "./App.css";
import { useState, useEffect } from "react";
import { AddPlayer } from "./components/AddPlayer";
import { PlayerInfo } from "./components/PlayerInfo";
import { PlayersList } from "./components/PlayersList";
import { RequestStatus } from "./components/RequestStatus";
import { Logout } from "./components/Logout";
import { AuthForm } from "./components/AuthForm";

const requestStatus = {
  LOADING: "Loading...",
  READY: "",
  ERROR: "An error has occurred!!!",
};

function App() {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [players, setPlayers] = useState(null);
  const [status, setStatus] = useState(requestStatus.READY);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [basicToken, setBasicToken] = useState("");

  const handleLogout = () => {
    console.log("handleLogout");
    setPlayers(null);
    setSelectedPlayer(null);
    setIsLoggedIn(false);
    setBasicToken("");
  };

  const handleDelete = (id) => {
    setStatus(requestStatus.LOADING);

    console.log("Handle delete", id);

    fetch(`/api/players/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: basicToken,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("delete result");

          const p = [...players].filter((i) => i.id !== id);
          setPlayers(p);
          setSelectedPlayer(null);
          setStatus(requestStatus.READY);
        },
        (error) => {
          console.log("delete errror", error);
          setStatus(requestStatus.ERROR);
        }
      );
  };

  const fetchPlayers = async () => {
    setStatus(requestStatus.LOADING);
    fetch("/api/players", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: basicToken,
      },
    })
      .then((res) => res.json())
      .then(
        (res) => {
          setPlayers(res);
          setStatus(requestStatus.READY);

          console.log("Players ", res);
        },
        (error) => {
          setStatus(requestStatus.ERROR);
        }
      );
  };

  const onClick = (url, e) => {
    e.preventDefault();

    console.log("ONCLick");

    setStatus(requestStatus.LOADING);
    fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: basicToken,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("onClick result");

          setSelectedPlayer(result);
          setStatus(requestStatus.READY);
        },
        (error) => {
          console.log("onClick error");
          setStatus(requestStatus.ERROR);
        }
      );
  };

  const handleSubmit = async (e, user) => {
    e.preventDefault();
    setStatus(requestStatus.LOADING);

    console.log("Submit Fetch");

    fetch("/api/players", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: basicToken,
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          const newPlayers = [...players, result];
          console.log("Submit RESULT", newPlayers, result);

          setPlayers(newPlayers);
          setStatus(requestStatus.READY);
        },
        (error) => {
          console.log("req error");
          setStatus(requestStatus.ERROR);
        }
      );
  };

  const login = ({ username, password }) => {
    const token = `${username}:${password}`;
    const hash = btoa(token);
    const btoken = `Basic ${hash}`;

    console.log("Login", btoken);
    setBasicToken(btoken);
    setIsLoggedIn(true);

    setStatus(requestStatus.LOADING);
    fetch("/api/players", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: btoken,
      },
    })
      .then((res) => res.json())
      .then(
        (res) => {
          console.log("Players ", res);
          if (!res.error) {
            setPlayers(res);
            setIsLoggedIn(true);
            setStatus(requestStatus.READY);
          } else {
            handleLogout();
            setStatus(requestStatus.ERROR);
          }
        },
        (error) => {
          console.log("Error", error);
          handleLogout();
          setStatus(requestStatus.ERROR);
        }
      );
  };

  const register = ({ username, password }) => {
    const token = `${username}:${password}`;

    const hash = btoa(token);
    const btoken = `Basic ${hash}`;

    setBasicToken(btoken);
    setStatus(requestStatus.LOADING);

    console.log("REgister");

    fetch("/api/users", {
      method: "POST",
      headers: {
        Authorization: btoken,
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then(
        (res) => {
          console.log("resgister res", res);

          if (!res.error) {
            login({ username, password });
            setStatus(requestStatus.READY);
          } else {
            setStatus(requestStatus.ERROR);
          }
        },
        (error) => {
          console.log("resgister error", error);

          setStatus(requestStatus.ERROR);
        }
      );
  };

  const handleAuth = (mode, { username, password, event }) => {
    // event.preventDefault();
    console.log("mode", mode, username, password);

    if (mode) {
      login({ username, password });
    } else {
      register({ username, password });
    }
  };

  let renderedComponent = <></>;

  if (isLoggedIn) {
    renderedComponent = (
      <div>
        <Logout handleLogout={handleLogout} />
        <AddPlayer handleSubmit={handleSubmit} />
        <PlayersList players={players} selectedPlayer={onClick}></PlayersList>
        <PlayerInfo
          player={selectedPlayer}
          handleDelete={handleDelete}
        ></PlayerInfo>
        <RequestStatus status={status}></RequestStatus>
      </div>
    );
  } else {
    renderedComponent = (
      <div>
        <AuthForm handleSubmit={handleAuth} />
        <RequestStatus status={status}></RequestStatus>
      </div>
    );
  }

  return <div>{renderedComponent}</div>;
}

export default App;
