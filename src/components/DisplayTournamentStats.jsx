import { useState, useEffect } from "react";
import TournamentTable from "../components/TournamentTable";

const DisplayTournamentStats = (props) => {
  const [isEditing, setIsEditing] = useState(false); // STATE TO TOGGLE EDIT MODE
  const [tournamentData, setTournamentData] = useState(null); // STATE TO HOLD TOURNAMENT DATA
  const [playerStats, setPlayerStats] = useState([]); // STATE TO HOLD PLAYER STATS

  useEffect(() => {
    // FETCH THE TOURNAMENT DATA FROM THE BACKEND
    const fetchTournamentData = async () => {
      // TEST TOURNAMENT ID 66b1f03a70efe80851429717
      try {
        const response = await fetch(
          `https://brawl-gg-backend.onrender.com/tournament/${props.id}`
        ); // FETCH REQUEST TO BACKEND
        if (!response.ok) {
          throw new Error("Failed to fetch tournament data"); // ERROR HANDLING FOR FAILED REQUEST
        }
        const data = await response.json(); // PARSE JSON RESPONSE

        setTournamentData(data.tournament); // SET TOURNAMENT DATA IN STATE
        setPlayerStats(data.tournament.playerStats); // SET PLAYER STATS IN STATE
      } catch (error) {
        console.error("Error fetching tournament data:", error); // HANDLE ANY ERRORS GRACEFULLY
      }
    };

    fetchTournamentData();
  }, [id]);

  console.log(id)

  // SIMPLE LOADING DIV IF WE DONT HAVE ANY TOURNAMENT DATA
  if (!tournamentData) {
    return <div>Loading...</div>;
  }

  // FUNCTION TO GROUP THE PLAYER BY THE TEAM THEY ARE IN THIS IS SO WE CAN PARSE ALL OF THE PLAYER TO THERE RESPECTIVE TEAMS
  const groupedByTeams = playerStats.reduce((acc, player) => {
    if (!acc[player.team]) {
      acc[player.team] = []; // INITIALIZE TEAM ARRAY IF NOT EXISTS
    }
    acc[player.team].push(player); // PUSH PLAYER INTO TEAM ARRAY
    return acc;
  }, {});

  // FUNCTION TO TOGGLE THE EDIT STATE
  const handleEditToggle = () => {
    setIsEditing(!isEditing); // TOGGLE IS EDITING STATE
  };

  // FUNCTION TO HANDLE THE STAT CHANGE OF THE PLAYERS
  const handleStatChange = (playerName, stat, value) => {
    setPlayerStats((prevStats) =>
      prevStats.map((player) =>
        player.player === playerName
          ? {
              ...player,
              stats: {
                ...player.stats,
                [stat]: value === "" ? 0 : parseInt(value), // UPDATE STAT VALUE
              },
            }
          : player
      )
    );
  };

  return (
    <div className="App">
      <h1>{tournamentData.tournamentName}</h1>
      <button onClick={handleEditToggle}>{isEditing ? "Save" : "Edit"}</button>
      <div className="tourn-container">
        {Object.keys(groupedByTeams).map((team, teamIndex) => (
          <div className="team-container" key={teamIndex}>
            <TournamentTable
              team={team}
              players={groupedByTeams[team]}
              gameStats={tournamentData.gameStats}
              isEditing={isEditing}
              onStatChange={handleStatChange}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayTournamentStats;
