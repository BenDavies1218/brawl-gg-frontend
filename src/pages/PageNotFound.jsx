/* eslint-disable react/no-unescaped-entities */
import NavBar from "../components/Navbar"
import Error from "../assets/icons/error.svg"

export default function PageNotFound(){
	return <>
		<section className="relative h-screen flex flex-col bg-black">
            <NavBar />
                <div className='absolute bottom-0 right-0 left-0 flex justify-center items-center min-h-full z-20'>
                    <div className='flex flex-col justify-center items-center max-w-[1250px] w-full p-6 rounded-lg shadow-2xl text-white m-6'>
						<img
							src={Error}
							alt="Error Icon"
							className="h-[150px] pointer-events-none"
						/>
                        <h2 className="mt-12 text-center text-3xl font-extrabold leading-[1.15] sm:text-5xl">
                            It seems you've made an ERROR 404
                        </h2>
                    </div>
                </div>
		</section>
	</>
}