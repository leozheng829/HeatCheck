import React, { useState } from "react";
import "../App.css";

const PlayerImage = ({ player }) => {
  if (!player) return null;

  const [imageError, setImageError] = useState(false);

  const formattedName =
    player.label.replace(/\./g, "").replace(/\s/g, "_").trim() + ".jpg";

  const imagePath = `/nba_player_images/${formattedName}`;

  console.log("Attempting to load:", imagePath);

  return (
    <div className="player-image-container">
      <img
        src={imageError ? "/nba_player_images/default.jpg" : imagePath}
        alt={player.label}
        className="player-image"
        onError={() => setImageError(true)}
      />
    </div>
  );
};

export default PlayerImage;
