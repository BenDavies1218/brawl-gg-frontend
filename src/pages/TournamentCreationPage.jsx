import NavBar from '../components/Navbar'
import TournamentForm from '../components/TournamentForm'

export default function TournamentCreationPage() {
  return (
    <>
      <div className="bg-black h-screen flex flex-col">
        <NavBar />
        <div className="flex-1 overflow-y-auto">
          <h2 className="text-center text-white text-3xl font-extrabold m-6 leading-[1.15] sm:text-5xl">
            Tournament Form
          </h2>
          <div className="h-full flex flex-col items-center justify-center">
            <div className="formcontainer w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/2 mx-auto p-4 bg-amber-400 text-center rounded border-white border-2">
              <div className="flex flex-col items-center">
                <TournamentForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}