import { NavLink } from "react-router-dom";
import Logo from "../assets/logo-transparent.svg";

export default function Footer() {
    return <>
        <div className="sticky inset-x-0 top-0 w-full z-50 overflow-hidden">
            <div className="mx-auto w-full h-24 max-w-screen=xl px-2.5 lg:px-20 content-center bg-black">
                <div className="flex items-center justify-between   mt-5 mb-5">
                    <img 
                        src={Logo}
                        alt="logo"
                        className="h-10 w-10 pointer-events-none"
                    />
                    <p className="absolute left-0 right-0 text-white text-center">© Brawlz.gg 2024</p>
                    <div>
                        <NavLink 
                            to="/privacy"
                            className=" max-w-fit px-2 py-2 text-white text-xs"
                            >
                                Privacy Policy
                        </NavLink>
                        <NavLink
                            to="/tos"
                            className="mx-auto max-w-fit px-2 py-2 text-white text-xs"
                            >
                                Terms of Service
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    </>
}