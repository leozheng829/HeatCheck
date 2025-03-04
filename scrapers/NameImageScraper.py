import requests
from bs4 import BeautifulSoup
import os
import pandas as pd

IMAGE_DIR = "nba_player_images"
os.makedirs(IMAGE_DIR, exist_ok=True)

BASE_URL = "https://basketball.realgm.com"

def scrape_player_links(url):
    response = requests.get(url)

    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        td_elements = soup.find_all('td', {'data-th': 'Player'})

        players = []
        for td in td_elements:
            link = td.find('a')
            if link:
                player_name = link.text.strip()
                player_url = link['href']
                players.append((player_name, player_url))
        
        return players
    else:
        print(f"Failed to retrieve the webpage. Status code: {response.status_code}")
        return []

def download_image(image_url, player_name):
    try:
        response = requests.get(image_url, stream=True)

        if response.status_code == 200:
            filename = f"{player_name.replace(' ', '_')}.jpg"
            image_path = os.path.join(IMAGE_DIR, filename)

            with open(image_path, "wb") as file:
                for chunk in response.iter_content(1024):
                    file.write(chunk)

            print(f"Saved image for {player_name}")
            return filename
        else:
            print(f"Failed to download image for {player_name}")
            return None
    except Exception as e:
        print(f"Error downloading {player_name}'s image: {e}")
        return None

def scrape_images(player_links):
    player_data = []

    for player_name, player_link in player_links:
        response = requests.get(BASE_URL + player_link)

        if response.status_code == 200:
            soup = BeautifulSoup(response.content, 'html.parser')
            image_tag = soup.find('img', {'style': 'border: 1px solid #000; float: left; margin-right: 15px; margin-top:5px;'})

            if image_tag:
                image_url = BASE_URL + image_tag['src']
                filename = download_image(image_url, player_name)
                player_data.append({"name": player_name, "image_url": image_url, "image_path": filename})
            else:
                print(f"No image found for {player_name}")
                player_data.append({"name": player_name, "image_url": None, "image_path": None})

        else:
            print(f"Failed to retrieve {player_name}'s page")

    return player_data

def save_to_csv(players):
    df = pd.DataFrame(players)
    df.to_csv("nba_players.csv", index=False)
    print("Saved player data to nba_players.csv")

if __name__ == "__main__":
    print("Fetching NBA player names and images...")

    url = 'https://basketball.realgm.com/nba/players'
    player_links = scrape_player_links(url)

    player_data = scrape_images(player_links)

    save_to_csv(player_data)

    print("Scraping complete!")