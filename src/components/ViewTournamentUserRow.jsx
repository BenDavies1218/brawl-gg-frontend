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
        <td key={stat}>
          {stat === "player" ? (
            userData.player // DISPLAY PLAYER NAME IF STAT IS 'PLAYER'
          ) : isEditing ? (
            <input
              value={userData.stats[stat] || ""} // SET VALUE TO CURRENT STAT OR EMPTY STRING
              onChange={(e) => handleInputChange(stat, e.target.value)} // HANDLE INPUT CHANGE
              type="number" // SET INPUT TYPE TO NUMBER
            />
          ) : (
            userData.stats[stat] || 0 // DISPLAY STAT VALUE OR 0 IF NOT EDITING
          )}
        </td>
      ))}
    </tr>
  );
};

export default ViewTournamentUserRow;
