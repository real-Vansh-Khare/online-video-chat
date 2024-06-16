import Link from "next/link";

export default function Navbar() {
    return (
        <div className="flex justify-between bg-purple-900 text-white px-4 text-xl">
            <div className="font-bold tracking-widest text-2xl my-4">STUMINGLE</div>
            <div className="flex justify-around w-[40%]">
                <Link href="/" className="hover:bg-purple-300 hover:text-purple-900 flex items-center px-1">Home</Link>
                <Link href="/" className="hover:bg-purple-300 hover:text-purple-900 flex items-center px-1">Connect</Link>
                <Link href="/" className="hover:bg-purple-300 hover:text-purple-900 flex items-center px-1">Login</Link>
            </div>
            <div className="my-4">
                <Link href="/" className="bg-purple-700 p-2 border rounded-full hover: hover:bg-purple-950 hover:text-purple-200">Signup</Link>
            </div>
        </div>
    )
}