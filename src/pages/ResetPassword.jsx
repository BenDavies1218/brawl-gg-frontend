import NavBar from '../components/Navbar'
import ResetPassword from '../components/ResetPassword'

export default function ResetPasswordPage() {

    return (
        <>
        <div className='bg-black'>
            <NavBar />
            <div className='flex flex-col justify-center items-center h-[850px]'>
                <h2 className="text-center text-white text-3xl font-extrabold m-6 leading-[1.15] sm:text-5xl">
                    Reset Password
                </h2>
                <ResetPassword />
                <div className='w-screen min-h-screen fixed flex justify-center px-6 py-40 pointer-events-none overflow-auto'>
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
                    <div className='bg-gradient-to-c from-transparent via-transparent to-black to-70% absolute inset-0'></div>
                </div>
            </div>
        </div>
        </>
    )
}