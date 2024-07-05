"use client";

import SocketEvents from '@/enums/socket_enum';
import { socketInit } from '@/sockets/socketInit';
import xlog from '@/utils/logger';
import getRandomUserId from '@/utils/random_id';
import React, { useCallback, useState } from 'react'
import { Socket } from 'socket.io-client';
import VideoCaller from './video-caller';
import FindingMatchModal from './ui/finding-dialog';

export interface MatchDetails {
  matchId: string|null;
  matchFound: boolean;
  isCaller: boolean;
  waiting: boolean;
};

const MatchMaker = () => {
  const [userId, setUserId] = useState<string|null>(null);
  const [matchDetails, setMatchDetails] = useState<MatchDetails>({ matchId: null, matchFound: false, isCaller: false, waiting: false });
  const [socketInstance, setSocketInstance] = useState<Socket|undefined>(undefined);

  const sendMatchRequest = React.useCallback(async () => {
    const userId = getRandomUserId();
    const socket = socketInit(userId, matchDetails, setMatchDetails);
    console.log(userId, "my id");
    
    setUserId(userId);
    setSocketInstance(socket);
    
    socket?.emit(SocketEvents.MATCH_REQUEST, userId, (response: unknown) => {
      if(response === SocketEvents.WAIT) {
        setMatchDetails({ ...matchDetails, waiting: true });
      }
    });
  }, []);

  return (
    <>
      <Heading matchFound={matchDetails.matchFound} />
      {matchDetails.matchFound && <VideoCaller userId={userId} matchDetails={matchDetails}/>}
      {/* {matchDetails.matchFound && " match found with " + matchDetails.matchId} */}
      <button 
        onClick={() => {
          sendMatchRequest()
        }}
        className='px-2 py-1 rounded bg-blue-500 text-white mx-auto hover:bg-blue-700'>
        {!matchDetails.matchFound ? 'Find Match' : 'Next Match'}
      </button>
      {!matchDetails.matchFound && 
        <>
          <p className='text-center text-lg mx-auto max-w-96 m-4 mt-8'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam alias, nostrum facilis enim ut, nulla numquam tenetur vero quisquam veniam, quae rerum tempora quidem consectetur ab libero odio itaque vel.ss</p>
        </>
      }
      {matchDetails.waiting && <FindingMatchModal/>}
    </>
  )
}

const Heading = ({ matchFound }: { matchFound: boolean }) => {
  if(matchFound) {
    return <div className='flex justify-center text-center text-3xl my-8 mx-auto'>Mingle with your match!</div>;
  } else {
    return <div className='flex justify-center text-center text-5xl my-8 mt-16 mx-auto'>Mingle with your match!</div>;
  }
};



export default MatchMaker;