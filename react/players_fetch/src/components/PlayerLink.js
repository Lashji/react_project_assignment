export const PlayerLink = ({ name, onClick, url }) => {
  return <a href="#" onClick={e => onClick(e, url)}>{name}</a>;
};
