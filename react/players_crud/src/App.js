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
    console.log("id: ", id);

    const response = await fetch(`/api/players/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      console.log("Error when trying to delete player");
      setStatus(requestStatus.ERROR);
      return;
    }

    await response.json();

    const p = [...players].filter((i) => i.id !== id);
    setPlayers(p);
    setSelectedPlayer(null);
    setStatus(requestStatus.READY);
  };

  const fetchPlayers = async () => {
    setStatus(requestStatus.LOADING);

    const response = await fetch("/api/players", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      console.log("res not ok", response.statusText);
      setStatus(requestStatus.ERROR);
      return;
    } else {
      console.log("res ok ");
    }

    const data = await response.json();

    setPlayers(data);
    setStatus(requestStatus.READY);

    console.log("Players ", data);
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const onClick = (e, url) => {
    e.preventDefault();
    setStatus(requestStatus.LOADING);

    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          console.log("res not ok", res.status);
          setStatus(requestStatus.ERROR);
          return;
        }

        return res.json();
      })
      .then((res) => {
        setSelectedPlayer(res);
        setStatus(requestStatus.READY);
      });
  };

  const handleSubmit = async (e, user) => {
    e.preventDefault();
    console.log("USER", user);

    const response = await fetch("/api/players", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      console.log("req error");
      setStatus(requestStatus.ERROR);
      return;
    }

    const data = await response.json();

    setPlayers([...players, data]);
    setStatus(requestStatus.READY);
    console.log("handleSubmit");
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
