import DisplayTournamentStats from "../components/DisplayTournamentStats";
import Navbar from "../components/Navbar";
const TournamentPage = () => {
  return (
    <>
      <div className="bg-black">
        <div className="relative z-20">
          <Navbar />
          <div className="overflow-hidden">
            <div className="flex flex-col container mx-auto h-full">
              <DisplayTournamentStats />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TournamentPage;