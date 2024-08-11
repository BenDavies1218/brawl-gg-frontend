import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/Navbar';
import UserRow from '../components/UserRow';
import TournamentTable from '../components/TournamentTable';

export default function Dashboard() {
    const [userData, setUserData] = useState(null); // Initialize to null
    const [loading, setLoading] = useState(true); // Track loading state
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const localToken = localStorage.getItem('authToken');
                if (!localToken) {
                    navigate('/login');
                    return;
                }

                const response = await fetch('https://brawl-gg-backend.onrender.com/user/dashboard', {
                    method: 'GET',
                    headers: {
                        'jwt': localToken,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setUserData(data); // Update state with fetched data
            } catch (error) {
                console.error('Error:', error);
                navigate('/login'); // Redirect on error
            } finally {
                setLoading(false); // Set loading to false
            }
        };

        fetchData();
    }, [navigate]);

    if (loading) {
        return <>
            <div className='w-screen min-h-screen fixed flex justify-center px-6 py-40 pointer-events-none overflow-auto'>
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
                <div className='bg-gradient-to-c from-transparent via-transparent to-black to-70% absolute inset-0'></div>
            </div>
            <div className='h-screen bg-black flex flex-col justify-center items-center'>
                <div className='text-4xl font-bold text-highlight'>Loading...</div>;
            </div>
        </>
    }

    console.log(userData);

    return (
        <div>
            <div className='bg-black h-screen'>
                <div className='w-screen min-h-screen fixed z-10 flex justify-center px-6 py-40 pointer-events-none overflow-auto'>
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
                    <div className='bg-gradient-to-c from-transparent via-transparent to-black to-70% absolute inset-0 z-20'></div>
                </div>
                <div className='relative z-20'>
                    <NavBar />
                    <div className='overflow-hidden'>
                        <div className="flex flex-col container mx-auto h-full">
                            {userData ? (
                                <>
                                    <UserRow user={userData.userData} />
                                    <TournamentTable user={userData.userData}/>
                                </>
                            ) : (
                                <div>No user data available.</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
