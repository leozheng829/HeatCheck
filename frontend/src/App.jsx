import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import Select from "react-select";
import TeamLogo from "/src/components/teamlogo.jsx";
import PlayerImage from "/src/components/playerimage.jsx";
import StatsVisualization from "/src/components/StatsVisualization.jsx";
import "./App.css";

const API_BASE_URL = "http://127.0.0.1:5000/api";
const API_URL = `${API_BASE_URL}/stats`;
const PLAYERS_API_URL = `${API_BASE_URL}/players`;

const nbaTeams = [
  { value: "Hawks", label: "Atlanta Hawks" },
  { value: "Celtics", label: "Boston Celtics" },
  { value: "Nets", label: "Brooklyn Nets" },
  { value: "Hornets", label: "Charlotte Hornets" },
  { value: "Bull", label: "Chicago Bulls" },
  { value: "Cavaliers", label: "Cleveland Cavaliers" },
  { value: "Mavericks", label: "Dallas Mavericks" },
  { value: "Nuggets", label: "Denver Nuggets" },
  { value: "Pistons", label: "Detroit Pistons" },
  { value: "Warriors", label: "Golden State Warriors" },
  { value: "Rockets", label: "Houston Rockets" },
  { value: "Pacers", label: "Indiana Pacers" },
  { value: "Clippers", label: "Los Angeles Clippers" },
  { value: "Lakers", label: "Los Angeles Lakers" },
  { value: "Grizzlies", label: "Memphis Grizzlies" },
  { value: "Heat", label: "Miami Heat" },
  { value: "Bucks", label: "Milwaukee Bucks" },
  { value: "Timberwolves", label: "Minnesota Timberwolves" },
  { value: "Pelicans", label: "New Orleans Pelicans" },
  { value: "Knicks", label: "New York Knicks" },
  { value: "Thunder", label: "Oklahoma City Thunder" },
  { value: "Magic", label: "Orlando Magic" },
  { value: "76ers", label: "Philadelphia 76ers" },
  { value: "Suns", label: "Phoenix Suns" },
  { value: "Blazers", label: "Portland Trail Blazers" },
  { value: "Kings", label: "Sacramento Kings" },
  { value: "Spurs", label: "San Antonio Spurs" },
  { value: "Raptors", label: "Toronto Raptors" },
  { value: "Jazz", label: "Utah Jazz" },
  { value: "Wizards", label: "Washington Wizards" },
];

function App() {
  const [player, setPlayer] = useState(null);
  const [playersList, setPlayersList] = useState([]);
  const [team, setTeam] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      <h1>🏀 NBA Player Stats 🏀</h1>
      <div className="input-group">
        <Select
          options={playersList}
          value={player}
          onChange={setPlayer}
          placeholder="Search for a player"
          isSearchable
        />

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

      {player && team && (
        <div className="comparison-container">
          <div className="player-section">
            <PlayerImage player={player} />
            <div className="player-name">{player.label}</div>
          </div>
          <div className="versus">VS.</div>
          <div className="team-section">
            <TeamLogo team={team} />
            <div className="team-name">{team.label}</div>
          </div>
        </div>
      )}

      {error && <p className="error">{error}</p>}
      {data && <StatsVisualization statsData={data} />}
    </div>
  );
}

export default App;
