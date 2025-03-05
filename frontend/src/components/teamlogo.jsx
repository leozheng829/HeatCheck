import React from "react";
import * as NBAIcons from "react-nba-logos";

const teamMappings = {
  Hawk: NBAIcons.ATL,
  Celtic: NBAIcons.BOS,
  Net: NBAIcons.BKN,
  Hornet: NBAIcons.CHA,
  Bull: NBAIcons.CHI,
  Cavalier: NBAIcons.CLE,
  Maverick: NBAIcons.DAL,
  Nugget: NBAIcons.DEN,
  Piston: NBAIcons.DET,
  Warrior: NBAIcons.GSW,
  Rocket: NBAIcons.HOU,
  Pacer: NBAIcons.IND,
  Clipper: NBAIcons.LAC,
  Laker: NBAIcons.LAL,
  Grizzlie: NBAIcons.MEM,
  Heat: NBAIcons.MIA,
  Buck: NBAIcons.MIL,
  Timberwolve: NBAIcons.MIN,
  Pelican: NBAIcons.NOP,
  Knick: NBAIcons.NYK,
  Thunder: NBAIcons.OKC,
  Magic: NBAIcons.ORL,
  "76er": NBAIcons.PHI,
  Sun: NBAIcons.PHX,
  Blazer: NBAIcons.POR,
  King: NBAIcons.SAC,
  Spur: NBAIcons.SAS,
  Raptor: NBAIcons.TOR,
  Jazz: NBAIcons.UTA,
  Wizard: NBAIcons.WAS,
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
