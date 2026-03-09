export default function Arrow({ style, direction, clickHandler }) {
  return (
    <img
      id={`${direction}_arrow`}
      className="arrow"
      src={`/images/${direction}_arrow.png`}
      onClick={clickHandler}
      style={style}
    />
  );
}
