from flask import Flask, request, jsonify
from flask_cors import CORS
from bs4 import BeautifulSoup
import requests
import pandas as pd
import os

app = Flask(__name__)
CORS(app)  # Allow requests from frontend

# Load players data
CSV_PATH = "nba_players.csv"

if not os.path.exists(CSV_PATH):
    raise FileNotFoundError(f"Error: CSV file not found at path: {CSV_PATH}")

try:
    df = pd.read_csv(CSV_PATH, encoding="utf-8", on_bad_lines="skip")
    required_columns = {"name", "image_url"}
    if not required_columns.issubset(df.columns):
        raise ValueError(f"Error: CSV is missing required columns: {required_columns - set(df.columns)}")

    df = df.dropna(subset=["name", "image_url"])
except Exception as e:
    raise RuntimeError(f"Error reading CSV: {e}")

@app.route("/api/players", methods=["GET"])
def get_players():
    """Returns a list of players for the searchable dropdown."""
    players = df[["name", "image_url"]].to_dict(orient="records")
    return jsonify(players)

@app.route('/api/stats', methods=['GET'])
def get_player_stats():
    player_name = request.args.get('player')
    opponent_team = request.args.get('team')

    if not player_name or not opponent_team:
        return jsonify({"error": "Missing player or team parameter"}), 400

    url = f"https://www.statmuse.com/nba/ask/{player_name}-game-log-vs-{opponent_team}-last-10-games"
    page_to_scrape = requests.get(url)
    soup = BeautifulSoup(page_to_scrape.text, "html.parser")
    td_elements = soup.find_all('td', class_='text-right px-2 py-2.5')

    game_data = []
    current_game = []
    
    stats = {
        "pts_rebs_asts": [],
        "points": [],
        "rebounds": [],
        "three_pt_made": [],
        "assists": [],
        "pts_assists": [],
        "fg_made": [],
        "def_reb": [],
        "off_reb": [],
        "three_pt_attempted": [],
        "ft_made": [],
        "fg_attempted": [],
        "rebs_asts": [],
        "pts_rebs": [],
        "blocks": [],
        "steals": [],
        "blocks_steals": [],
        "turnovers": [],
        "fantasy_score": []
    }

    for element in td_elements:
        number = element.find('span')
        if number:
            current_game.append(number.text.strip())
        if len(current_game) == 21:
            game_data.append(current_game)
            current_game = []

    if not game_data:
        return jsonify({"error": "No data found"}), 404

    for game in game_data:
        try:
            pts = int(game[2])
            reb = int(game[3])
            ast = int(game[4])
            stl = int(game[5])
            blk = int(game[6])
            fgm = int(game[7])
            fga = int(game[8])
            threepm = int(game[10])
            threepa = int(game[11])
            ftm = int(game[13])
            oreb = int(game[17])
            dreb = int(game[18])
            tov = int(game[19])

            stats["pts_rebs_asts"].append(pts + reb + ast)
            stats["points"].append(pts)
            stats["rebounds"].append(reb)
            stats["three_pt_made"].append(threepm)
            stats["assists"].append(ast)
            stats["pts_assists"].append(pts + ast)
            stats["fg_made"].append(fgm)
            stats["def_reb"].append(dreb)
            stats["off_reb"].append(oreb)
            stats["three_pt_attempted"].append(threepa)
            stats["ft_made"].append(ftm)
            stats["fg_attempted"].append(fga)
            stats["rebs_asts"].append(reb + ast)
            stats["pts_rebs"].append(pts + reb)
            stats["blocks"].append(blk)
            stats["steals"].append(stl)
            stats["blocks_steals"].append(blk + stl)
            stats["turnovers"].append(tov)
            stats["fantasy_score"].append(pts + (1.2 * reb) + (1.5 * ast) + (3 * blk) + (3 * stl) - tov)
        
        except ValueError:
            continue

    return jsonify(stats)

if __name__ == '__main__':
    print("✅ Flask API running at http://127.0.0.1:5000")
    app.run(debug=True, port=5000)