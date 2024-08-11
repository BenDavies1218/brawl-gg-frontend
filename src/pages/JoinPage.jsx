import { useEffect, useState } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { ThreeCircles } from "react-loader-spinner";

const JoinPage = () => {
  const { jwt } = useParams(); // Get JWT from URL parameters
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [goToTournament, setGoToTournament] = useState(false);
  const [tournamentId, setTournamentId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const joinTournament = async () => {
      try {
        const localToken = localStorage.getItem("authToken");
        if (!localToken) {
          navigate("/signup");
          return;
        }

        const response = await fetch(
          `https://brawl-gg-backend.onrender.com/tournament/join/${jwt}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              jwt: localToken,
            },
          }
        );

        const result = await response.json();
        setTournamentId(result.TournamentId);
        if (result.message === "User is already in the tournament!") {
          navigate(`/tournament/${result.TournamentId}`);
        }

        if (!response.ok) {
          throw new Error(`Failed to join the tournament, ${result.message}`);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    joinTournament();
  }, [jwt, navigate]);

  return (
    <div className="joinTournamentCont flex justify-center items-center bg-black mt-12 min-h-screen">
      {loading && (
        <>
          <h3>Attempting to Join Tournament</h3>
          <ThreeCircles
            visible={true}
            height="60"
            width="60"
            color="#fbae3c"
            ariaLabel="three-circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </>
      )}
      {!loading && error && <h4>Error: {error}</h4>}
      {!loading && !goToTournament && (
        <>
          <h4>Successfully joined the tournament!</h4>
          <NavLink
            to={`/tournament/${tournamentId}`} // Use the correct tournament ID
            className="mx-auto max-w-fit px-5 py-2 rounded-md bg-highlight text-white font-bold cursor-pointer relative hover:bg-amber-500 active:bg-amber-400"
          >
            JOIN NOW
          </NavLink>
        </>
      )}
    </div>
  );
};

export default JoinPage;
