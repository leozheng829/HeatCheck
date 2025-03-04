from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import os

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

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

if __name__ == '__main__':
    print("✅ Flask API running at http://127.0.0.1:5000")
    app.run(debug=True, port=5000)