"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "../components/ui/3d-card";
import Link from "next/link";

function WelcomeCard() {
  return (
    <CardContainer className="inter-var shadow-xl shadow-purple-800">
      <CardBody className="bg-white relative group/card w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
        <CardItem
          translateZ="50"
          className="text-4xl font-bold text-purple-900 text-center"
        >
          Welcome to STUMINGLE!
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-lg text-justify max-w-sm mt-2 "
        >
          This is an online video chat platform. Here, you can connect with anyone and everyone. Thanks to vercel.
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
         <Image src="vercel.svg"  alt="Vercel" width="50" height="50"
         className="h-30 w-full object-cover rounded-xl group-hover/card:shadow-xl"/>
        </CardItem>
        <div className="flex justify-between items-center mt-20">
          <CardItem
            translateZ={20}
            as={Link}
            href="/signup"
            className="px-4 py-2 rounded-xl text-md font-normal"
          >
            Sign up →
          </CardItem>
          <CardItem
            translateZ={20}
            as={Link}
            href="/connect"
            className="px-4 py-2 rounded-xl bg-purple-900 text-white  text-md font-bold"
          >
            Connect
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}


export default function Home() {
  return (
    <main>
      <WelcomeCard />
    </main>
  )
}

