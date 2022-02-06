/** @format CONTAINERS*/
import "./App.css";

import { AddPlayer } from "./components/AddPlayer";
import { PlayerInfo } from "./components/PlayerInfo";
import { PlayersList } from "./components/PlayersList";
import { RequestStatus } from "./components/RequestStatus";

function App() {
  return (
    <div>
      <AddPlayer />
      <PlayersList></PlayersList>
      <PlayerInfo></PlayerInfo>
      <RequestStatus></RequestStatus>
    </div>
  );
}

export default App;
