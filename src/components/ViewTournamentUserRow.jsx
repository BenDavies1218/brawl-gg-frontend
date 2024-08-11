const ViewTournamentUserRow = ({
  userData,
  gameStats,
  isEditing,
  onStatChange,
}) => {
  // FUNCTION TO HANDLE INPUT CHANGE FOR A STAT
  const handleInputChange = (stat, value) => {
    // CALL ONSTATCHANGE CALLABCK WITH PLAYER NAME, STAT, AND NEW VALUE
    onStatChange(userData.player, stat, value);
  };

  return (
    <tr>
      {gameStats.map((stat) => (
        <td key={stat} className="py-3 px-4 text-white border-b border-temp-black">
          {stat === "player" ? (
            <span className="font-semibold">{userData.player}</span> // DISPLAY PLAYER NAME IF STAT IS 'PLAYER'
          ) : isEditing ? (
            <input
              value={userData.stats[stat] || ""} // SET VALUE TO CURRENT STAT OR EMPTY STRING
              onChange={(e) => handleInputChange(stat, e.target.value)} // HANDLE INPUT CHANGE
              type="number" // SET INPUT TYPE TO NUMBER
              min="0"
              className="w-16 font-semibold text-[#fbae3c] text-right bg-temp-black border-2 border-highlight rounded-md outline-none focus:border-[#fbae3c] transition-colors duration-300"
            />
          ) : (
            <span className="font-semibold text-[#fbae3c] text-right transition-colors duration-300">{userData.stats[stat] || 0}</span> // DISPLAY STAT VALUE OR 0 IF NOT EDITING
          )}
        </td>
      ))}
    </tr>
  );
};

export default ViewTournamentUserRow;
