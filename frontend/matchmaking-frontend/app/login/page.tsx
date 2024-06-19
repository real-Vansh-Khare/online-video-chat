import LoginForm from "@/components/form/login-form";
import Link from "next/link";
import { FaBolt } from "react-icons/fa6";

export default function login() {

    return (
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="text-4xl text-purple-500 flex items-center justify-center">
                <FaBolt  />
            </div>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Log in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <LoginForm/>

          <p className="mt-10 text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <Link href="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Head to signup page
            </Link>
          </p>
        </div>
      </div>
    )
}