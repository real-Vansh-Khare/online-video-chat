import Link from "next/link";

export default function signup() {
    return (
        <div className="w-[40%] min-w-72 mx-auto mt-24 bg-gray-200 rounded-xl border-2 border-slate-400">
            <div className="text-3xl font-bold text-center p-4 bg-purple-800 text-white rounded-md rounded-b-none tracking-widest">Signup</div>
            <form className="flex flex-col w- p-8 text-gray-700 text-xl">
                <label htmlFor="semail" className="mt-4">Email address</label>
                <input type="email" name="semail" id="semail" placeholder="Enter email" className="text-black mt-1 p-1 border-purple-700 focus:outline-none focus:border-b-2"></input>
                <label htmlFor="susername" className="mt-4">Username</label>
                <input type="text" name="susername" id="susername" placeholder="Enter username" className="text-black mt-1 p-1 border-purple-700 focus:outline-none focus:border-b-2"></input>
                <label htmlFor="spassword" className="mt-4">Password</label>
                <input type="password" name="spassword" id="spassword" placeholder="Enter password" className="text-black mt-1 p-1 border-purple-700 focus:outline-none focus:border-b-2"></input>
                <Link href="/login" className="mt-8 p-4 bg-purple-800 text-white rounded-full font-bold ">
                    <button className="w-full">Submit</button>
                </Link>
            </form>
        </div>
    )
}