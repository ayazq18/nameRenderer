import React from "react";

const borderStyles = [
  { color: "green", border: "3px solid green" },
  { color: "purple", border: "3px solid purple" },
  { color: "blue", border: "3px solid #2196F3" },
  { color: "brown", border: "3px solid #A0522D" },
];

const NameCard = ({ name, location, index }) => {
  const isSpecial = index < 4;
  const style = isSpecial
    ? {
        border: borderStyles[index]?.border,
        color: borderStyles[index]?.color,
        fontWeight: "bold",
      }
    : {
        border: "2px solid black",
        color: "black",
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
