import Link from "next/link";
import { MobileNavbarLinks,NavbarLinks } from "./NavbarLinks";
import { IoIosMenu } from "react-icons/io";

export default function Navbar() {
    return (
        <>
        <div className="flex flex-wrap items-center justify-between px-4 text-lg text-gray-700 border-2 bg-white">
            <NavbarLinks />
            <div className="max-md:hidden py-4">
                <Link href="/signup" className=" hover:text-purple-400 text-purple-500 flex items-center">Sign Up</Link>
            </div>
            <label htmlFor="mobile-toggle" className="md:hidden p-4 border text-3xl"><IoIosMenu /></label>
        </div>
        <MobileNavbar />
        </>
    )
}

function MobileNavbar() {
    return (
        <>
        <input type="checkbox" className="peer hidden" id="mobile-toggle"></input>
        <div className="bg-white hidden peer-checked:block">
            <MobileNavbarLinks />
        </div>
        </>
    )
}