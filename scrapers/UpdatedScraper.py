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
pts_rebs_asts = []
points = []
rebounds = []
three_pt_made = []
assists = []
pts_assists = []
fg_made = []
def_reb = []
off_reb = []
three_pt_attempted = []
ft_made = []
fg_attempted = []
rebs_asts = []
pts_rebs = []
blocks = []
steals = []
blocks_steals = []
turnovers = []
fantasy_score = []

for element in td_elements:
    number = element.find('span')
    if number:
        current_game.append(number.text.strip())
    if len(current_game) == 21:
        game_data.append(current_game)
        current_game = []

for game in game_data:
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
    
    pts_rebs_asts.append(pts + reb + ast)
    points.append(pts)
    rebounds.append(reb)
    three_pt_made.append(threepm)
    assists.append(ast)
    pts_assists.append(pts + ast)
    fg_made.append(fgm)
    def_reb.append(dreb)
    off_reb.append(oreb)
    three_pt_attempted.append(threepa)
    ft_made.append(ftm)
    fg_attempted.append(fga)
    rebs_asts.append(reb + ast)
    pts_rebs.append(pts + reb)
    blocks.append(blk)
    steals.append(stl)
    blocks_steals.append(blk + stl)
    turnovers.append(tov)
    fantasy_score.append(pts + (1.2 * reb) + (1.5 * ast) + (3 * blk) + (3 * stl) - tov)

print("Pts + Rebs + Assists:", pts_rebs_asts)
print("Points:", points)
print("Rebounds:", rebounds)
print("3-PT Made:", three_pt_made)
print("Assists:", assists)
print("Pts + Assists:", pts_assists)
print("FG Made:", fg_made)
print("Defensive Rebounds:", def_reb)
print("Offensive Rebounds:", off_reb)
print("3-PT Attempted:", three_pt_attempted)
print("Free Throws Made:", ft_made)
print("FG Attempted:", fg_attempted)
print("Rebs + Assists:", rebs_asts)
print("Pts + Rebs:", pts_rebs)
print("Blocks:", blocks)
print("Steals:", steals)
print("Blocks + Steals:", blocks_steals)
print("Turnovers:", turnovers)
print("Fantasy Score:", fantasy_score)