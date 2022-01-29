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
  const [status, setStatus] = useState(requestStatus.LOADING);

  useLayoutEffect(() => {
    fetch("http://localhost:3001/api/players/",{
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then((res) => {
        let status = requestStatus.LOADING;
        if (!res.ok) {
          console.log("res not ok", res.statusText);
          status = requestStatus.ERROR;
        } else {
          status = requestStatus.READY;
        }

        setStatus(status);

        return res.json();
      })
      .then((res) => {
        setPlayers(res);
      });
  }, []);

  const onClick = (e, url) => {
    e.preventDefault();

    fetch(url)
      .then((res) => {
        let status = requestStatus.LOADING;

        if (!res.ok) {
          status = requestStatus.ERROR;
        } else {
          status = requestStatus.READY;
        }
        setStatus(status);

        return res.json();
      })
      .then((res) => {
        console.log("player", res);
        setSelectedPlayer(res);
      });
  };

  return (
    <div>
      <PlayersList players={players} onClick={onClick}></PlayersList>
      <PlayerInfo player={selectedPlayer}></PlayerInfo>
      <RequestStatus status={status}></RequestStatus>
    </div>
  );
}

export default App;
