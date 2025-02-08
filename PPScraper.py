from bs4 import BeautifulSoup
import requests

player_name = input("Please enter the players name: ")
opponent_team = input("Please enter the opponents team: ")
url = f"https://www.statmuse.com/nba/ask/{player_name}-game-log-vs-{opponent_team}-last-10-games"

page_to_scrape = requests.get(url)
soup = BeautifulSoup(page_to_scrape.text, "html.parser")
td_elements = soup.find_all('td', class_='text-right px-2 py-2.5')

print(td_elements)