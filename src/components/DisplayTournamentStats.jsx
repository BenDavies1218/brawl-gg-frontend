import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ViewTournament from "../components/ViewTournament";
import "../styles/TournamentTable.css";
import copyIcon from "../assets/copy-3-svgrepo-com.svg";

const TournamentPage = () => {
  const { id } = useParams(); // GET THE TOURNAMENT ID FROM URL PARAMETERS
  const [isEditing, setIsEditing] = useState(false); // STATE TO TOGGLE EDIT MODE
  const [tournamentData, setTournamentData] = useState(null); // STATE TO HOLD TOURNAMENT DATA
  const [playerStats, setPlayerStats] = useState([]); // STATE TO HOLD PLAYER STATS

  useEffect(() => {
    // FETCH THE TOURNAMENT DATA FROM THE BACKEND
    const fetchTournamentData = async () => {
      try {
        const response = await fetch(
          `https://brawl-gg-backend.onrender.com/tournament/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch tournament data"); // ERROR HANDLING FOR FAILED REQUEST
        }
        const data = await response.json(); // PARSE JSON RESPONSE

        setTournamentData(data.tournament); // SET TOURNAMENT DATA IN STATE
        setPlayerStats(data.tournament.playerStats); // SET PLAYER STATS IN STATE
        console.log(data);
      } catch (error) {
        console.error("Error fetching tournament data:", error); // HANDLE ANY ERRORS GRACEFULLY
      }
    };

    fetchTournamentData();
  }, [id]);

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

  // FUNCTION TO TOGGLE THE EDIT STATE AND SAVE TOURNAMENT IF EDITING IS DONE
  const handleEditToggle = async () => {
    if (isEditing) {
      try {
        const response = await fetch(
          `https://brawl-gg-backend.onrender.com/tournament/${id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              jwt: localStorage.getItem("authToken"),
            },
            body: JSON.stringify({
              playerStats,
              tournamentName: tournamentData.tournamentName,
              gameStats: tournamentData.gameStats,
              // Include any other fields that might have been edited
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to save tournament data");
        }

        const updatedData = await response.json();
        setTournamentData(updatedData.tournament); // Update with the new tournament data
        console.log("Tournament saved successfully:");
      } catch (error) {
        console.error("Error saving tournament data:", error);
      }
    }
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

  const handleJoinLinkClick = () => {
    const joinLink = tournamentData.joinlink;
    if (joinLink) {
      navigator.clipboard
        .writeText(joinLink)
        .then(() => {
          alert("Join link copied to clipboard!");
        })
        .catch((error) => {
          console.error("Failed to copy join link:", error);
        });
    }
  };

  return (
    <div className="bg-white rounded-lg flex-col justify-center text-center gap-8 p-8 min-h-vh">
      <h1>{tournamentData.tournamentName}</h1>
      <div>
        <button
          className="max-w-fit px-5 py-2 rounded-md bg-highlight text-white font-bold cursor-pointer relative hover:bg-amber-500 active:bg-amber-400 mx-8"
          onClick={handleEditToggle}
        >
          {isEditing ? "Save" : "Edit"}
        </button>
        <button
          className="m-8 mx-auto max-w-fit pl-2 pr-5 py-2 rounded-md bg-highlight text-white font-bold cursor-pointer relative hover:bg-amber-500 active:bg-amber-400"
          onClick={handleJoinLinkClick}
        >
          <img
            src={copyIcon}
            alt="copy to clipboard"
            className="inline-block w-6 h-6 mr-2"
          />
          Invite Players
        </button>
      </div>

      <div className="tourn-container">
        {Object.keys(groupedByTeams).map((team, teamIndex) => (
          <div className="team-container" key={teamIndex}>
            <ViewTournament
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

export default TournamentPage;