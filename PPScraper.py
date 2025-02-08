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
date = []
min = []
pts = []
reb = []
ast = []
stl = []
blk = []
fgm = []
fga = []
fgPercent = []
threepm = []
threepa = []
threepPercent = []
ftm = []
fta = []
ftPercent = []
tsPercent = []
oreb = []
dreb = []
tov = []
pf = []

for element in td_elements:
    number = element.find('span')
    
    if number:
        current_game.append(number.text.strip())
    
    if len(current_game) == 21:
        game_data.append(current_game)
        current_game = []

for idx, game in enumerate(game_data, start=1):
    # print(f"Game {idx}: {game}")
    date.append(game[0])
    min.append(game[1])
    pts.append(game[2])
    reb.append(game[3])
    ast.append(game[4])
    stl.append(game[5])
    blk.append(game[6])
    fgm.append(game[7])
    fga.append(game[8])
    fgPercent.append(game[9])
    threepm.append(game[10])
    threepa.append(game[11])
    threepPercent.append(game[12])
    ftm.append(game[13])
    fta.append(game[14])
    ftPercent.append(game[15])
    tsPercent.append(game[16])
    oreb.append(game[17])
    dreb.append(game[18])
    tov.append(game[19])
    pf.append(game[20])

# print(date)
# print(min)
# print(pts)
# print(reb)
# print(ast)
# print(stl)
# print(blk)
# print(fgm)
# print(fga)
# print(fgPercent)
# print(threepm)
# print(threepa)
# print(threepPercent)
# print(ftm)
# print(fta)
# print(ftPercent)
# print(tsPercent)
# print(oreb)
# print(dreb)
# print(tov)
# print(pf)