import { NavLink } from 'react-router-dom'
import Demo from '../assets/demo.png'

export default function HeroSection() {
    return <>
        <section className="hero-section relative text-center h-[750px] mt-32 flex flex-col overflow-hidden">
        <div className='absolute m-auto left-0 right-0 top-32 bottom-0 z-10 bg-gradient-to-b from-transparent to-opacity-0'>
                <h1 className="text-center text-6xl font-extrabold leading-[1.15] text-white sm:text-8xl">
                    Brawlz.gg
                </h1>
                <div className='mx-auto mt-5 flex max-w-fit space-x-4'>
                    <NavLink
                        to="/signup"
                        className="rounded-md mx-auto max-w-fit px-5 py-2 text-base font-medium shadow-sm bg-highlight text-white cursor-pointer hover:bg-amber-500 active:bg-amber-400"
                        >
                            Get Started
                    </NavLink>
                </div>  
            </div>
            <div className='absolute mx-auto left-0 right-0 top-48 bottom-0'>
                <img 
                    src={Demo}
                    alt="Demo"
                    className='mx-auto max-h-[300px] sm:max-h-[700px] rounded-lg blur-[3px] pointer-events-none'
                />
            </div>
        </section>
    </>
}