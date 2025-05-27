import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import Select from "react-select";
import StatsVisualization from "/src/components/StatsVisualization.jsx";
import "./index.css";
import TeamLogo from "./components/teamlogo.jsx";

const API_BASE_URL = "https://heatcheckbackend.onrender.com/api";
const API_URL = `${API_BASE_URL}/stats`;
const PLAYERS_API_URL = `${API_BASE_URL}/players`;

// Better default images with NBA theme
const DEFAULT_PLAYER_IMAGE =
  "https://cdn.nba.com/headshots/nba/latest/1040x760/fallback.png";
const DEFAULT_TEAM_IMAGE = DEFAULT_PLAYER_IMAGE;
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
        const sortedPlayers = response.data
          .map((player) => ({
            value: player.name,
            label: player.name,
            image_url: player.image_url || DEFAULT_PLAYER_IMAGE,
          }))
          .sort((a, b) => {
            const firstNameA = a.label.split(" ")[0];
            const firstNameB = b.label.split(" ")[0];
            return firstNameA.localeCompare(firstNameB);
          });
        setPlayersList(sortedPlayers);
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
    <div className="min-h-screen bg-dark-gradient text-white overflow-hidden relative">
      {/* Background glow effects */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-30 animate-pulse-glow"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-30 animate-pulse-glow"></div>
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-3xl">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Welcome to Heat Check (A Statistics Dashboard)
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Created by a a fan for fans.
          </p>
        </div>

        {/* Comparison Section */}
        <div className="comparison-container glass-card animate-slide-up mb-8">
          <div className="comparison-content">
            <div className="player-section">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <img
                  src={player?.image_url || DEFAULT_PLAYER_IMAGE}
                  alt={player ? player.label : "Select Player"}
                  className="w-20 h-20 rounded-full object-cover border-4 border-white/10 group-hover:border-primary/50 transition-all duration-300 aspect-square"
                />
                <div className="absolute -top-1 -right-1 w-7 h-7 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xs z-10">
                  P
                </div>
              </div>
              <div className="player-info text-center mt-2">
                <div className="player-name font-semibold text-lg">
                  {player ? player.label : "Select Player"}
                </div>
                <div className="text-sm text-gray-400">NBA Player</div>
              </div>
            </div>
            <div className="versus-section flex flex-col items-center justify-center">
              <div className="versus font-bold text-2xl text-gray-300">VS</div>
              <div className="text-xs text-gray-500 mt-1">Comparison</div>
            </div>
            <div className="team-section">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                {team ? (
                  <TeamLogo team={team} />
                ) : (
                  <img
                    src={DEFAULT_TEAM_IMAGE}
                    alt="NBA"
                    className="w-20 h-20 rounded-full object-cover aspect-square"
                  />
                )}
                <div className="absolute -top-1 -right-1 w-7 h-7 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xs z-10">
                  T
                </div>
              </div>
              <div className="team-info text-center mt-2">
                <div className="team-name font-semibold text-lg">
                  {team ? team.label : "NBA"}
                </div>
                <div className="text-sm text-gray-400">NBA Team</div>
              </div>
            </div>
          </div>
        </div>

        {/* Selection Section */}
        <div className="glass-card rounded-2xl p-8 mb-8 animate-slide-up">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1 w-full">
              <div className="text-sm font-medium text-gray-300 mb-2">
                Select NBA Player
              </div>
              <Select
                options={playersList}
                value={player}
                onChange={setPlayer}
                placeholder="Search for a player"
                isSearchable
                className="w-full"
                classNamePrefix="select"
                menuPlacement="top"
                styles={{
                  control: (base) => ({
                    ...base,
                    backgroundColor: "rgba(255, 255, 255, 0.03)",
                    borderColor: "rgba(255, 255, 255, 0.08)",
                    "&:hover": {
                      borderColor: "rgba(255, 255, 255, 0.15)",
                    },
                    boxShadow: "none",
                  }),
                  menu: (base) => ({
                    ...base,
                    backgroundColor: "#1e293b",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    boxShadow:
                      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                  }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isFocused
                      ? "rgba(255, 255, 255, 0.05)"
                      : "transparent",
                    color: state.isSelected ? "var(--primary)" : "white",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                    },
                    cursor: "pointer",
                  }),
                  singleValue: (base) => ({
                    ...base,
                    color: "white",
                  }),
                  input: (base) => ({
                    ...base,
                    color: "white",
                  }),
                  placeholder: (base) => ({
                    ...base,
                    color: "#94a3b8",
                  }),
                }}
              />
            </div>
            <div className="flex-1 w-full">
              <div className="text-sm font-medium text-gray-300 mb-2">
                Select NBA Team
              </div>
              <Select
                options={nbaTeams}
                value={team}
                onChange={setTeam}
                placeholder="Select Opponent Team"
                isSearchable
                className="w-full"
                classNamePrefix="select"
                menuPlacement="top"
                styles={{
                  control: (base) => ({
                    ...base,
                    backgroundColor: "rgba(255, 255, 255, 0.03)",
                    borderColor: "rgba(255, 255, 255, 0.08)",
                    "&:hover": {
                      borderColor: "rgba(255, 255, 255, 0.15)",
                    },
                    boxShadow: "none",
                  }),
                  menu: (base) => ({
                    ...base,
                    backgroundColor: "#1e293b",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    boxShadow:
                      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                  }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isFocused
                      ? "rgba(255, 255, 255, 0.05)"
                      : "transparent",
                    color: state.isSelected ? "var(--primary)" : "white",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                    },
                    cursor: "pointer",
                  }),
                  singleValue: (base) => ({
                    ...base,
                    color: "white",
                  }),
                  input: (base) => ({
                    ...base,
                    color: "white",
                  }),
                  placeholder: (base) => ({
                    ...base,
                    color: "#94a3b8",
                  }),
                }}
              />
            </div>
            <div className="w-full md:w-auto">
              <button
                onClick={fetchStats}
                disabled={loading}
                className="w-full h-12 px-6 text-lg font-semibold rounded-lg transition-all duration-300 bg-primary hover:bg-primary/90 disabled:bg-gray-600"
              >
                {loading ? "Loading..." : "Get Stats"}
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && <p className="error animate-fade-in">{error}</p>}

        {/* Stats Visualization */}
        {data && <StatsVisualization statsData={data} />}
      </div>
    </div>
  );
}

export default App;
