/** @format COMPONENTS */

import { useDispatch } from "react-redux";
import { getSelectedPlayer } from "../redux/actionCreators/thunks/PlayerLink";

export const PlayerLink = ({ name, url }) => {
  const dispatch = useDispatch();
  const onClick = (url, e) => {
    e.preventDefault();
    dispatch(getSelectedPlayer(url));
  };

  return (
    <a href={url} onClick={(e) => onClick(url, e)}>
      {name}
    </a>
  );
};
