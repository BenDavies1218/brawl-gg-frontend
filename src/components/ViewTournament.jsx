import ViewTournamentUserRow from "./ViewTournamentUserRow";

const ViewTournament = ({
  team,
  players,
  gameStats,
  isEditing,
  onStatChange,
}) => {
  return (
    <table className="w-full bg-black text-gray-100 border-2 border-temp-black rounded-lg overflow-hidden shadow-lg">
      <thead className="bg-black border-2 border-temp-black ">
        <tr>
          <th colSpan={gameStats.length} className="py-4 text-2xl font-bold text-center bg-temp-black">
            {team}
          </th>
        </tr>
        <tr className="bg-black border-2 border-temp-black">
          {gameStats.map((stat) => (
            <th key={stat} className="py-3 px-4 text-center bg-highlight">
              {stat.charAt(0).toUpperCase() + stat.slice(1)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
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
