import ViewTournamentUserRow from "./ViewTournamentUserRow";

const ViewTournament = ({
  team,
  players,
  gameStats,
  isEditing,
  onStatChange,
}) => {
  return (
    <table>
      <tbody>
        <tr>
          <td colSpan={gameStats.length} className="team-header text-xl">
            {team}
          </td>
        </tr>
        <tr>
          {gameStats.map((stat) => (
            <th key={stat}>{stat.charAt(0).toUpperCase() + stat.slice(1)}</th> // RENDER EACH STAT HEADER
          ))}
        </tr>
        {players.map((userStat, playerIndex) => (
          <ViewTournamentUserRow
            key={userStat.player + playerIndex}
            userData={userStat}
            gameStats={gameStats}
            isEditing={isEditing}
            onStatChange={onStatChange}
          />
        ))}
      </tbody>
    </table>
  );
};

export default ViewTournament;
