"use client"

import MatchMaker from "@/components/matchmaker"

export default function connect() {
    return (
        <>
            <main className="flex flex-col justify-center items-center">
                <MatchMaker/>
            </main>
        </>
    )
}