import LoginForm from "@/components/form/login-form";
import Link from "next/link";

export default function login() {
    return (
        <div className="w-[30%] min-w-72 mx-auto mt-24 bg-gray-200 rounded-xl border-2 border-slate-400">
            <div className="text-3xl font-bold text-center p-4 bg-purple-800 text-white rounded-md rounded-b-none tracking-widest">Login</div>
            <LoginForm/>
        </div>
    )
}