import React from "react";
import * as NBAIcons from "react-nba-logos";

const teamMappings = {
  Hawks: NBAIcons.ATL,
  Celtics: NBAIcons.BOS,
  Nets: NBAIcons.BKN,
  Hornets: NBAIcons.CHA,
  Bull: NBAIcons.CHI,
  Cavaliers: NBAIcons.CLE,
  Mavericks: NBAIcons.DAL,
  Nuggets: NBAIcons.DEN,
  Pistons: NBAIcons.DET,
  Warriors: NBAIcons.GSW,
  Rockets: NBAIcons.HOU,
  Pacers: NBAIcons.IND,
  Clippers: NBAIcons.LAC,
  Lakers: NBAIcons.LAL,
  Grizzlies: NBAIcons.MEM,
  Heat: NBAIcons.MIA,
  Bucks: NBAIcons.MIL,
  Timberwolves: NBAIcons.MIN,
  Pelicans: NBAIcons.NOP,
  Knicks: NBAIcons.NYK,
  Thunder: NBAIcons.OKC,
  Magic: NBAIcons.ORL,
  "76ers": NBAIcons.PHI,
  Suns: NBAIcons.PHX,
  Blazers: NBAIcons.POR,
  Kings: NBAIcons.SAC,
  Spurs: NBAIcons.SAS,
  Raptors: NBAIcons.TOR,
  Jazz: NBAIcons.UTA,
  Wizards: NBAIcons.WAS,
};

const TeamLogo = ({ team }) => {
  if (!team) return null;

  const LogoComponent = teamMappings[team.value];

  return (
    <div className="team-logo-container">
      {LogoComponent ? <LogoComponent size={140} /> : <p>Logo not available</p>}
    </div>
  );
};

export default TeamLogo;
