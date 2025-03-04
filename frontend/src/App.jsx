import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import Select from "react-select";

const API_URL = "http://127.0.0.1:5001/api/stats";
const PLAYERS_API_URL = "http://127.0.0.1:5000/api/players";

const nbaTeams = [
  { value: "Hawk", label: "Atlanta Hawks" },
  { value: "Celtic", label: "Boston Celtics" },
  { value: "Net", label: "Brooklyn Nets" },
  { value: "Hornet", label: "Charlotte Hornets" },
  { value: "Bull", label: "Chicago Bulls" },
  { value: "Cavalier", label: "Cleveland Cavaliers" },
  { value: "Maverick", label: "Dallas Mavericks" },
  { value: "Nugget", label: "Denver Nuggets" },
  { value: "Piston", label: "Detroit Pistons" },
  { value: "Warrior", label: "Golden State Warriors" },
  { value: "Rocket", label: "Houston Rockets" },
  { value: "Pacer", label: "Indiana Pacers" },
  { value: "Clipper", label: "Los Angeles Clippers" },
  { value: "Laker", label: "Los Angeles Lakers" },
  { value: "Grizzlie", label: "Memphis Grizzlies" },
  { value: "Heat", label: "Miami Heat" },
  { value: "Buck", label: "Milwaukee Bucks" },
  { value: "Timberwolve", label: "Minnesota Timberwolves" },
  { value: "Pelican", label: "New Orleans Pelicans" },
  { value: "Knick", label: "New York Knicks" },
  { value: "Thunder", label: "Oklahoma City Thunder" },
  { value: "Magic", label: "Orlando Magic" },
  { value: "76er", label: "Philadelphia 76ers" },
  { value: "Sun", label: "Phoenix Suns" },
  { value: "Blazer", label: "Portland Trail Blazers" },
  { value: "King", label: "Sacramento Kings" },
  { value: "Spur", label: "San Antonio Spurs" },
  { value: "Raptor", label: "Toronto Raptors" },
  { value: "Jazz", label: "Utah Jazz" },
  { value: "Wizard", label: "Washington Wizards" },
];

function App() {
  const [player, setPlayer] = useState(null);
  const [playersList, setPlayersList] = useState([]);
  const [team, setTeam] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch players on component mount
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get(PLAYERS_API_URL);
        setPlayersList(
          response.data.map((player) => ({
            value: player.name,
            label: player.name,
          }))
        );
      } catch (error) {
        console.error("Error fetching players:", error);
        setPlayersList([]);
      }
    };

    fetchPlayers();
  }, []);

  const fetchStats = async () => {
    if (!player || !team) {
      setError("Please select a player and a team.");
      return;
    }

    setLoading(true);
    setError("");
    setData(null);

    try {
      const response = await axios.get(API_URL, {
        params: { player: player.value, team: team.value },
      });
      console.log("API Response:", response.data);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data. Please check your inputs.");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h1>NBA Player Stats</h1>
      <div className="input-group">
        {/* Searchable Player Dropdown */}
        <Select
          options={playersList}
          value={player}
          onChange={setPlayer}
          placeholder="Search for a player"
          isSearchable
        />

        {/* Searchable Team Dropdown */}
        <Select
          options={nbaTeams}
          value={team}
          onChange={setTeam}
          placeholder="Select Opponent Team"
          isSearchable
        />

        <button onClick={fetchStats} disabled={loading}>
          {loading ? "Loading..." : "Get Stats"}
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {data && (
        <div className="stats">
          <h2>
            Stats for {player?.label} vs {team?.label}
          </h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
