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
  const [status, setStatus] = useState("An error has occurred!!!");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [basicToken, setBasicToken] = useState("");

  const handleLogout = () => {
    console.log("handleLogout");
    setPlayers(null);
    setSelectedPlayer(null);
    setIsLoggedIn(false);
    setBasicToken("");
  };

  const handleDelete = async (id) => {
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
          const p = [...players].filter((i) => i.id !== id);
          setPlayers(p);
          setSelectedPlayer(null);
          setStatus(requestStatus.READY);
        },
        (error) => {
          setStatus(requestStatus.ERROR);
        }
      );
  };

  const fetchPlayers = async () => {
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

  useEffect(() => {
    console.log("fetch players useeffect");
    fetchPlayers();
  }, [basicToken]);

  const onClick = (e, url) => {
    e.preventDefault();
    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: basicToken,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setSelectedPlayer(result);
          setStatus(requestStatus.READY);
        },
        (error) => {
          setStatus(requestStatus.ERROR);
        }
      );
  };

  const handleSubmit = async (e, user) => {
    e.preventDefault();
    console.log("USER", user);

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
          setPlayers([...players, result]);
          setStatus(requestStatus.READY);
          console.log("handleSubmit");
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
    setBasicToken(`Basic ${hash}`);
    setIsLoggedIn(true);
    fetchPlayers();
  };

  const register = ({ username, password }) => {
    const token = `${username}:${password}`;

    const hash = btoa(token);

    const basicToken = `Basic ${hash}`;

    fetch("/api/users", {
      method: "POST",
      headers: {
        Authorization: basicToken,
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
          login({ username, password });
          setStatus(requestStatus.READY);
        },
        (error) => {
          setStatus(requestStatus.ERROR);
        }
      );
  };

  const handleAuth = (e, { username, password, mode }) => {
    if (mode === "REGISTER") {
      register({ username, password });
    } else if (mode === "LOGIN") {
      login({ username, password });
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
    renderedComponent = <AuthForm handleSubmit={handleAuth} />;
  }

  return <div>{renderedComponent}</div>;
}

export default App;
