import ViewTournamentUserRow from "./ViewTournamentUserRow";

const ViewTournament = ({
  team,
  players,
  gameStats,
  isEditing,
  onStatChange,
}) => {
  return (
    <table className="w-full bg-gray-900 text-gray-100 border border-gray-700 rounded-lg overflow-hidden shadow-md">
      <thead className="bg-gray-800">
        <tr>
          <th colSpan={gameStats.length} className="py-3 text-xl font-semibold text-center border-b border-gray-700">
            {team}
          </th>
        </tr>
        <tr className="bg-gray-700">
          {gameStats.map((stat) => (
            <th key={stat} className="py-2 px-4 text-left border-b border-gray-600">
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
