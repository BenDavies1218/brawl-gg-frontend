import DisplayTournamentStats from "../components/DisplayTournamentStats";
import Navbar from "../components/Navbar";

const TournamentPage = () => {
  return (
    <>
      <div className="bg-black h-screen">
          <div className='w-screen min-h-screen fixed z-10 flex justify-center px-6 py-40 pointer-events-none overflow-auto'>
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
              <div className='bg-gradient-to-c from-transparent via-transparent to-black to-70% absolute inset-0 z-20'></div>
          </div>
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