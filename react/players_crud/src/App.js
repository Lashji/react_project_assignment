import "./App.css";
import { useState, useEffect } from "react";
import { AddPlayer } from "./components/AddPlayer";
import { PlayerInfo } from "./components/PlayerInfo";
import { PlayersList } from "./components/PlayersList";
import { RequestStatus } from "./components/RequestStatus";

const requestStatus = {
  LOADING: "Loading...",
  READY: "",
  ERROR: "An error has occurred!!!",
};

function App() {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [players, setPlayers] = useState(null);
  const [status, setStatus] = useState("An error has occurred!!!");

  const handleDelete = async (id) => {
    fetch(`/api/players/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
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
  }, []);

  const onClick = (e, url) => {
    e.preventDefault();
    // setStatus(requestStatus.LOADING);
    console.log("on click");
    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
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

  return (
    <div>
      <AddPlayer handleSubmit={handleSubmit} />
      <PlayersList players={players} selectedPlayer={onClick}></PlayersList>
      <PlayerInfo
        player={selectedPlayer}
        handleDelete={handleDelete}
      ></PlayerInfo>
      <RequestStatus status={status}></RequestStatus>
    </div>
  );
}

export default App;
