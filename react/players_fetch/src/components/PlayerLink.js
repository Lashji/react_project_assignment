export const PlayerLink = ({ name, onClick, url }) => {
  return <a href={url} onClick={e => onClick(e, url)}>{name}</a>;
};
