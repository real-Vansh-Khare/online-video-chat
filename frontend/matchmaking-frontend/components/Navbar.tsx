import Link from "next/link";

export default function Navbar() {
    return (
        <>
        <div className="flex justify-between bg-purple-900 text-white px-4 text-xl">
            <div className="font-bold tracking-widest text-2xl my-4">STUMINGLE</div>
            <div className="flex justify-around w-[40%] max-md:hidden">
                <Link href="/" className="hover:bg-purple-300 hover:text-purple-900 flex items-center px-1">Home</Link>
                <Link href="/connect" className="hover:bg-purple-300 hover:text-purple-900 flex items-center px-1">Connect</Link>
                <Link href="/login" className="hover:bg-purple-300 hover:text-purple-900 flex items-center px-1">Login</Link>
            </div>
            <div className="my-4">
                <label htmlFor="mobile-toggle" className="md:hidden bg-purple-700 p-2 border rounded-full hover:bg-purple-950 hover:text-purple-200">menu</label>
                <Link href="/signup" className="max-md:hidden bg-purple-700 p-2 border rounded-full hover:bg-purple-950 hover:text-purple-200">Signup</Link>
            </div>
        </div>
        <MobileNavbar />
        </>
    )
}

function MobileNavbar() {
    return (
        <>
        <input type="checkbox" className="peer hidden" id="mobile-toggle"></input>
        <div className="bg-gray-300 h-screen hidden peer-checked:block fixed bottom-0 right-0 left-0 top-16 z-10">
            <div className="flex flex-col justify-start">
                <Link href="/" className="text-center text-2xl font-medium py-6 hover:bg-purple-400 hover:text-purple-900">Home</Link>
                <Link href="/connect" className="text-center text-2xl font-medium py-6 hover:bg-purple-400 hover:text-purple-900">Connect</Link>
                <Link href="/login" className="text-center text-2xl font-medium py-6 hover:bg-purple-400 hover:text-purple-900">Login</Link>
                <Link href="/signup" className="text-center text-2xl font-medium py-6 hover:bg-purple-400 hover:text-purple-900">Signup</Link>
            </div>
        </div>
        </>
    )
}