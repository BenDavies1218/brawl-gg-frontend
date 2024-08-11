import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TournamentTable = (props) => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const ids = props.user.yourTournaments || []; // Default to empty array if undefined
  const navigate = useNavigate(); // Use the useNavigate hook

  useEffect(() => {
    const fetchTournaments = async () => {
      if (ids.length === 0) {
        setLoading(false); // No IDs to fetch
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Create an array of fetch promises for each ID
        const fetchPromises = ids.map((id) =>
          fetch(`https://brawl-gg-backend.onrender.com/tournament/${id}`).then(
            (response) => {
              if (!response.ok) {
                throw new Error(`Network response was not ok for ID ${id}`);
              }
              return response.json();
            }
          )
        );

        // Wait for all fetch promises to complete
        const results = await Promise.all(fetchPromises);

        // Combine results into a single array
        setTournaments(results);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTournaments();
  }, [ids]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleViewTournament = (TournamentId) => {
    navigate(`/tournament/${TournamentId}`);
  };

  console.log(tournaments);

  return (
    <div className="border-2 border-white bg-black text-white rounded-lg shadow-md mt-5 mx-auto p-4 max-w-full w-full h-[400px] overflow-y-scroll no-scrollbar flex justify-center items-center">
      {tournaments.length > 0 ? (
        <table className="w-full bg-white border-2 border-white rounded-lg ">
          <thead>
            <tr className="bg-black text-white">
              <th className="px-6 py-3 border-b border-white text-left">
                Name
              </th>
              <th className="px-6 py-3 border-b border-white text-right">
                Game
              </th>
              <th className="px-6 py-3 border-b border-white text-right">
                Players
              </th>
              <th className="px-6 py-3 border-b border-white text-right">
                View Tournament
              </th>
            </tr>
          </thead>
          <tbody>
            {tournaments.map((tournament) => (
              <tr
                key={tournament.tournament._id}
                className="bg-black hover:bg-black/90"
              >
                <td className="px-6 py-4 border-b border-white text-left">
                  {tournament.tournament.tournamentName}
                </td>
                <td className="px-6 py-4 border-b border-white text-right">
                  {tournament.tournament.game}
                </td>
                <td className="px-6 py-4 border-b border-white text-right">
                  {tournament.tournament.maximumPlayers}
                </td>
                <td className="px-6 py-4 border-b border-white text-right">
                  <button
                    onClick={() =>
                      handleViewTournament(tournament.tournament._id)
                    }
                    className="max-w-fit px-5 py-2 rounded-md bg-highlight text-white font-bold cursor-pointer relative hover:bg-amber-500 active:bg-amber-400"
                  >
                    View Tournament
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center text-white py-10">No tournaments found</div>
      )}
    </div>
  );
};

export default TournamentTable;