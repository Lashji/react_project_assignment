import "./App.css";
import { PlayerInfo } from "./components/PlayerInfo";
import { PlayersList } from "./components/PlayersList";
import { RequestStatus } from "./components/RequestStatus";
import { useState, useEffect } from "react";

const requestStatus = {
  LOADING: "Loading...",
  READY: "",
  ERROR: "An error has occurred!!!",
};

const fetchPlayers = async (url) => {
  const response = await fetch(url);
  let status = requestStatus.LOADING;
  if (!response.ok) {
    status = requestStatus.ERROR;
  } else {
    status = requestStatus.READY;
  }

  const players = await response.json();

  return { players, status };
};

const handleDelete = () => {
  console.log("handleDelete");
};

function App() {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [players, setPlayers] = useState([]);
  const [status, setStatus] = useState(requestStatus.LOADING);

  const playersUrl = "/api/players/";

  useEffect(() => {
    const fetchData = async () => {
      const { players, status } = await fetchPlayers(playersUrl);

      setPlayers(players);
      setStatus(status);
    };

    fetchData();
  }, []);

  const fetchPlayer = async (e, url) => {
    e.preventDefault();

    const response = await fetch(url);

    let status = requestStatus.LOADING;

    if (!response.ok) {
      status = requestStatus.ERROR;
    } else {
      status = requestStatus.READY;
    }

    const player = await response.json();

    setSelectedPlayer(player);
    setStatus(status);
  };

  return (
    <div>
      <PlayersList players={players} fetchPlayer={fetchPlayer}></PlayersList>
      <PlayerInfo
        handleDelete={handleDelete}
        player={selectedPlayer}
      ></PlayerInfo>
      <RequestStatus status={status}></RequestStatus>
    </div>
  );
}

export default App;
