import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

export default function Template(){

    return (<>
        <Outlet />
        <div className='w-screen min-h-screen fixed flex justify-center px-6 py-40 pointer-events-none overflow-auto'>
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
            <div className='bg-gradient-to-c from-transparent via-transparent to-black to-70% absolute inset-0 z-1'></div>
        </div>
        <Footer />
    </>);
}

