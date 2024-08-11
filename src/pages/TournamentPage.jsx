import { NavLink } from "react-router-dom";
import DisplayTournamentStats from "../components/DisplayTournamentStats";
import Navbar from "../components/Navbar";
import BackArrow from "../assets/icons/back-arrow.svg";

const TournamentPage = () => {
  return (
    <>
      <div className="bg-black h-screen">
        <div className="relative z-20">
          <Navbar />
          <div className="overflow-hidden">
            <div className="flex flex-col justify-center container mx-auto h-full">
            <NavLink
                  to="/dashboard"
                  className="flex flex-row items-center mr-5 mx-auto max-w-fit px-4 py-2 rounded-md bg-highlight text-white font-bold cursor-pointer relative hover:bg-amber-500 active:bg-amber-400"
                  >
                    <img
                      src={BackArrow}
                      alt="back arrow icon"
                      className="w-5 h-5 mr-1"
                    />
                      Back
              </NavLink>
              <DisplayTournamentStats />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TournamentPage;