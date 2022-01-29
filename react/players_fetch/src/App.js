import "./App.css";
import { PlayerInfo } from "./components/PlayerInfo";
import { PlayersList } from "./components/PlayersList";
import { RequestStatus } from "./components/RequestStatus";
import { useState, useEffect, useLayoutEffect } from "react";

const requestStatus = {
  LOADING: "Loading...",
  READY: "",
  ERROR: "An error has occurred!!!",
};

function App() {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [players, setPlayers] = useState(null);
  const [status, setStatus] = useState("An error has occurred!!!");

  const fetchPlayers = async () => {
    // setStatus(requestStatus.LOADING);

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
    // setStatus(requestStatus.LOADING);

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
        // setStatus(requestStatus.READY);
      });
  };

  console.log("LOADING APP", requestStatus.ERROR);

  return (
    <>
      <PlayersList players={players} onClick={onClick}></PlayersList>
      <PlayerInfo player={selectedPlayer}></PlayerInfo>
      <RequestStatus status={status}></RequestStatus>
    </>
  );
}

export default App;
