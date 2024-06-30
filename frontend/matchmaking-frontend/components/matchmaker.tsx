"use client";

import SocketEvents from '@/enums/socket_enum';
import { socketInit } from '@/sockets/socketInit';
import xlog from '@/utils/logger';
import getRandomUserId from '@/utils/random_id';
import React, { useCallback, useState } from 'react'
import { Socket } from 'socket.io-client';
import VideoCaller from './video-caller';

export interface MatchDetails {
  matchId: string|null;
  matchFound: boolean;
  isCaller: boolean;
};

const MatchMaker = () => {
  const [userId, setUserId] = useState<string|null>(null);
  const [matchDetails, setMatchDetails] = useState<MatchDetails>({ matchId: null, matchFound: false, isCaller: false });
  const [socketInstance, setSocketInstance] = useState<Socket|undefined>(undefined);

  const sendMatchRequest = React.useCallback(async () => {
    const userId = getRandomUserId();
    const socket = socketInit(userId, matchDetails, setMatchDetails);
    xlog(userId, "my id");
    
    setUserId(userId);
    setSocketInstance(socket);
    
    socket?.emit(SocketEvents.MATCH_REQUEST, userId, (response: unknown) => {
      // xlog(response, "Match Request response");
    });
  }, []);

  return (
    <>
      <div className='ml-4'>Matchmaker</div>
      <button 
      onClick={() => sendMatchRequest()}
      className='px-2 py-1 rounded bg-blue-500 text-white ml-4'>Next Match</button>
      {matchDetails.matchFound && <VideoCaller userId={userId} matchDetails={matchDetails}/>}
      {matchDetails.matchFound && " match found with " + matchDetails.matchId}
    </>
  )
}

export default MatchMaker