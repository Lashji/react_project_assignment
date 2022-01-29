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

let shouldFetch = true;

function App() {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [players, setPlayers] = useState(null);
  const [status, setStatus] = useState(requestStatus.LOADING);

  const fetchPlayers = async () => {
    console.log("fetchPlayers");
    setStatus(requestStatus.LOADING);

    const response = await fetch("/api/players/", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      console.log("res not ok", response.statusText);
      setStatus(requestStatus.ERROR);
    }

    const data = await response.json();

    setStatus(requestStatus.READY);
    setPlayers(data);
    console.log("fetching done", data);
  };

  // if (shouldFetch) {
  //   fetchPlayers();
  //   shouldFetch = false;
  // }

  useEffect(() => {
    fetchPlayers();
  }, []);

  const onClick = (e, url) => {
    e.preventDefault();
    setStatus(requestStatus.LOADING);

    fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          setStatus(requestStatus.ERROR);
        }

        return res.json();
      })
      .then((res) => {
        setSelectedPlayer(res);
        setStatus(requestStatus.READY);
      });
  };

  return (
    <>
      <PlayersList players={players} onClick={onClick}></PlayersList>
      <PlayerInfo player={selectedPlayer}></PlayerInfo>
      <RequestStatus status={status}></RequestStatus>
    </>
  );
}

export default App;
