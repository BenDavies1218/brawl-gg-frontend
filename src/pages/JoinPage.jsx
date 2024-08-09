import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ThreeCircles } from "react-loader-spinner";

const JoinPage = () => {
  const { jwt } = useParams(); // Get JWT from URL parameters
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const joinTournament = async () => {
      try {
        const response = await fetch(
          `https://brawl-gg-backend.onrender.com/join/${jwt}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmI1ZmZiZmYxZDE1ZmMxNTYyZTQ2ZTAiLCJ1c2VybmFtZSI6IkJlbm55IiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTcyMzIwNjU0OSwiZXhwIjoxNzIzODExMzQ5fQ.JrqRRnU3Bv6vPtBAGESGeFRIMHxjpdf1p03dO1eaaaA",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to join the tournament");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    joinTournament();
  }, [jwt]);

  return (
    <div className="joinTournamentCont">
      <h3>Attempting to Join Tournament</h3>
      {loading && (
        <ThreeCircles
          visible={true}
          height="60"
          width="60"
          color="#fbae3c"
          ariaLabel="three-circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      )}
      {!loading && error && <h4>Error: {error}</h4>}
      {!loading && !error && <h4>Successfully joined the tournament!</h4>}
    </div>
  );
};

export default JoinPage;
