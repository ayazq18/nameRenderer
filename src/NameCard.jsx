import React from "react";

// Define the border styles
const borderStyles = [
  { color: "green", border: "3px solid green" },
  { color: "purple", border: "3px solid purple" },
  { color: "blue", border: "3px solid #2196F3" },
  { color: "brown", border: "3px solid #A0522D" },
];

const getRandomStyle = () => {
  const randomIndex = Math.floor(Math.random() * borderStyles.length);
  return borderStyles[randomIndex];
};

const NameCard = ({ name, location }) => {
  const randomStyle = getRandomStyle(); // get a random style for this render

  const style = {
    border: randomStyle.border,
    color: randomStyle.color,
    fontWeight: "bold",
  };

  return (
    <div className="card" style={style}>
      <div className="card-name">{name}</div>
      <div className="card-location">{location}</div>
      <div className="card-with-family">WITH FAMILY</div>
    </div>
  );
};

export default NameCard;
