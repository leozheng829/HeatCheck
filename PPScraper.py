from bs4 import BeautifulSoup
import requests

player_name = input("Please enter the player's name: ")
opponent_team = input("Please enter the opponent's team: ")
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

for idx, game in enumerate(game_data, start=1):
    print(f"Game {idx}: {game}")