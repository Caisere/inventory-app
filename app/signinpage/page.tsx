import { stackServerApp } from "@/stack/server";
import { SignIn } from "@stackframe/stack";
import { redirect } from "next/navigation";
import { Suspense } from "react";

async function SignInPage () {
    const user = await stackServerApp.getUser()

    if(user) {
        redirect('/dashboard')
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100">
            <div className="max-w-md w-full space-y-8">
                <Suspense>
                    <SignIn />
                </Suspense>
            </div>
        </div>
    )
}

export default SignInPage;