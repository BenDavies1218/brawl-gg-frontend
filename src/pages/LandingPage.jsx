import { useEffect, useState } from 'react'
import NavBar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import { partnersLogo } from '../data/partners'
import Slider from '../components/Slider'
import FeaturesSection from '../components/FeaturesSection'
import Footer from '../components/Footer'
import ContactSection from '../components/ContactSection'

export default function LandingPage() {
    const [message, setMessage] = useState(null);

    useEffect(() => {
        fetch('https://brawl-gg-backend.onrender.com/', {
            method: 'GET'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(response => {
            setMessage(response);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }, []); // Empty dependency array ensures this runs only once

    useEffect(() => {
        if (message) {
            console.log(JSON.stringify(message, null, 2));
        }
    }, [message]); // Log message only when message changes

    return <>
            <div className='bg-black'>
                <div className='w-screen min-h-screen fixed z-10 flex justify-center px-6 py-40 pointer-events-none overflow-auto'>
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
                    <div className='bg-gradient-to-c from-transparent via-transparent to-black to-70% absolute inset-0 z-20'></div>
                </div>
                <div className='relative z-20'>
                    <NavBar />
                    <div className='overflow-hidden'>
                        <div className="container mx-auto">
                            <HeroSection />
                            <Slider images={partnersLogo} />
                            <FeaturesSection />
                            <ContactSection />
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        </>
}