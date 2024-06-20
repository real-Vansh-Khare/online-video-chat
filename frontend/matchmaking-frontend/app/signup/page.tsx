import SignupForm from "@/components/form/signup-form";

export default function signup() {
    return (
        <div className="w-[40%] min-w-72 mx-auto mt-24 bg-gray-200 rounded-xl border-2 border-slate-400">
            <div className="text-3xl font-bold text-center p-4 bg-purple-800 text-white rounded-md rounded-b-none tracking-widest">Signup</div>
            <SignupForm/>
        </div>
    )
}