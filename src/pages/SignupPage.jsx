import NavBar from '../components/Navbar';
import SignupForm from '../components/SignupForm';

export default function SignupPage(){

    return (
        <>
        <div className='bg-black'>
            <NavBar />
            <div className='flex justify-center items-center h-[850px]'>
                <SignupForm />
                <div className='w-screen min-h-screen fixed flex justify-center px-6 py-40 pointer-events-none overflow-auto'>
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
                    <div className='bg-gradient-to-c from-transparent via-transparent to-black to-70% absolute inset-0'></div>
                </div>
            </div>
        </div>
        </>
    )
}