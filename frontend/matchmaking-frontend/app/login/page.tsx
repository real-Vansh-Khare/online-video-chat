import Link from "next/link";

export default function login() {
    return (
        <div className="w-[30%] min-w-72 mx-auto mt-24 bg-gray-200 rounded-xl border-2 border-slate-400">
            <div className="text-3xl font-bold text-center p-4 bg-purple-800 text-white rounded-md rounded-b-none tracking-widest">Login</div>
            <form className="flex flex-col w- p-8 text-gray-700 text-xl">
                <label htmlFor="lusername" className="mt-4">Username</label>
                <input type="text" name="lusername" id="lusername" placeholder="Enter username" className="text-black mt-1 p-1 border-purple-700 focus:outline-none focus:border-b-2"></input>
                <label htmlFor="lpassword" className="mt-4">Password</label>
                <input type="password" name="lpassword" id="lpassword" placeholder="Enter password" className="text-black mt-1 p-1 border-purple-700 focus:outline-none focus:border-b-2"></input>
                <Link href="/connect" className="mt-8 p-4 bg-purple-800 text-white rounded-full font-bold ">
                    <button className="w-full">Log in</button>
                </Link>
            </form>
        </div>
    )
}