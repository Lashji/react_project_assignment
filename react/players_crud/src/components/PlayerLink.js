export const PlayerLink = ({ name, onClick, url }) => {

  const test = (e, url) => {
    console.log("onCLick clicked")

    onClick(e, url)
  }

  return <a href={url} onClick={e => test(e, url)}>{name}</a>;
};
