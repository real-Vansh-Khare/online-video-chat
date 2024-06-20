"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBolt } from "react-icons/fa6";


const NavbarLinks = () => {
    const links = [
        { name: 'Home', path: '/'},
        { name: 'Connect', path:'/connect'},
        { name: 'Login', path:'/login'}
    ]
    const pathname= usePathname();
    return(
        <div className="flex justify-around gap-12">
            <div className="py-2 text-3xl flex items-center">
                <FaBolt className="text-purple-500"/>
            </div>
            {links.map((link, idx) => (
                <Link href={link.path} key={idx} className={pathname == link.path?"text-[rgb(17,24,39)] border-b-2 border-[rgb(99,102,241)] flex items-center py-4 max-md:hidden":"hover:text-[rgb(55,65,81)] text-[rgb(107,114,128)] border-b-2 border-white hover:border-gray-300 flex items-center py-4 max-md:hidden"}>{link.name}</Link>
            ))}
        </div>
    );
}

const MobileNavbarLinks = () => {
    const mobileLinks = [
        { name: 'Home', path: '/'},
        { name: 'Connect', path:'/connect'},
        { name: 'Login', path: '/login'},
        { name: 'Signup', path: '/signup'}
    ]
    const pathname = usePathname();
    return (
        <div className="flex flex-col justify-start gap-1 text-xl">
            {mobileLinks.map((link, idx) => (
                <Link href={link.path} key={idx} className={pathname == link.path?"text-xl text-[rgb(67,56,202)] bg-[rgb(238,242,255)] border-l-4 border-[rgb(99,102,241)] flex items-center p-4":"text-xl hover:text-[rgb(55,65,81)] hover:bg-gray-50 text-[rgb(107,114,128)] border-l-4 border-white hover:border-gray-300 flex items-center p-4"}>{link.name}</Link>
            ))}
        </div>
    );
}

export { NavbarLinks, MobileNavbarLinks };