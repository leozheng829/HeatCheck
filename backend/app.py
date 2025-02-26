from flask import Flask, request, jsonify
from flask_cors import CORS
from bs4 import BeautifulSoup
import requests

app = Flask(__name__)
CORS(app)  # Allow frontend to access API

@app.route('/api/stats', methods=['GET'])
def get_player_stats():
    player_name = request.args.get('player')
    opponent_team = request.args.get('team')

    if not player_name or not opponent_team:
        return jsonify({"error": "Missing player or team parameter"}), 400

    # Scrape the stats
    url = f"https://www.statmuse.com/nba/ask/{player_name}-game-log-vs-{opponent_team}-last-10-games"
    page_to_scrape = requests.get(url)
    soup = BeautifulSoup(page_to_scrape.text, "html.parser")
    td_elements = soup.find_all('td', class_='text-right px-2 py-2.5')

    game_data = []
    current_game = []

    for element in td_elements:
        number = element.find('span')
        if number:
            current_game.append(number.text.strip())

        if len(current_game) == 21:
            game_data.append(current_game)
            current_game = []

    if not game_data:
        return jsonify({"error": "No data found"}), 404

    return jsonify({"games": game_data})

if __name__ == '__main__':
    app.run(debug=True, port=5000)