import Image from "next/image";
import React from "react";

export default function FindingMatchModal() {
  return (
    <>
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*body*/}
                <div className="relative pt-6 px-6 flex-auto">
                  <p className="mt-4 text-blueGray-500 text-3xl leading-relaxed">
                    Finding Match
                  </p>
                </div>
                {/*footer*/}
                <div className="mx-auto">
                  <Image src={"/loading_spinner.svg"} className="w-24 mx-auto" width={400} height={400} alt="..."/>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    </>
  );
}
