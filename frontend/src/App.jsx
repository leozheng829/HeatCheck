import { useState } from "react";
import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api/stats";

function App() {
  const [player, setPlayer] = useState("");
  const [team, setTeam] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchStats = async () => {
    setLoading(true);
    setError("");
    setData(null);

    try {
      const response = await axios.get(API_URL, {
        params: { player, team },
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
        <input
          type="text"
          placeholder="Enter Player Name"
          value={player}
          onChange={(e) => setPlayer(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Opponent Team"
          value={team}
          onChange={(e) => setTeam(e.target.value)}
        />
        <button onClick={fetchStats} disabled={loading}>
          {loading ? "Loading..." : "Get Stats"}
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {data && (
        <div className="stats">
          <h2>
            Stats for {player} vs {team}
          </h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
