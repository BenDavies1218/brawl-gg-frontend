import NavBar from '../components/Navbar'
import ForgotPassword from '../components/ForgotPassword'

export default function ForgotPasswordPage() {

    return (
        <>
        <div className='bg-black'>
            <NavBar />
            <div className='bg-black'>
                <h2 className="text-center text-white text-3xl font-extrabold m-6 leading-[1.15] sm:text-5xl">
                    Forgot Password 
                </h2>
                <div className='h-dvh flex flex-col items-center'>
                    <div class='formcontainer' className='h-2/5 w-1/2 my-10 flex-col content-center flex items-center bg-amber-400 text-center rounded border-white border-2'>
                        <ForgotPassword/>
                    </div>
                </div>
            </div>
        </div>

        </>
    )
}