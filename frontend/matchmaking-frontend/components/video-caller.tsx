import React, { useEffect, useRef, useState } from 'react';
import { MatchDetails } from './matchmaker';
import Peer, { MediaConnection } from 'peerjs';
import xlog from '@/utils/logger';

interface VideoCallerProps {
  userId: string | null;
  matchDetails: MatchDetails;
}



const VideoCaller: React.FC<VideoCallerProps> = ({ userId, matchDetails }) => {
  const userVideo = useRef<HTMLVideoElement>(null);
  const matchVideo = useRef<HTMLVideoElement>(null);
  const [peer, setPeer] = useState<Peer | null>(null);
  const [userStream, setUserStream] = useState<MediaStream | null>(null)
  const prevId = useRef<string | null>(null)

  function caller(peerI: Peer, stream: MediaStream) {
    setTimeout(() => {
        if(matchDetails.matchId)
        {
            const call = peerI.call(matchDetails.matchId, stream)
            call.on("stream", (remoteStream: MediaStream) => {
                matchVideo.current!.srcObject = remoteStream
            })
            prevId.current = matchDetails.matchId
        }
    }, 500)
  }
  function reciever(peerI: Peer, stream: MediaStream) {
    peerI.on("call", (call: MediaConnection) => {
        call.answer(stream)
        call.on("stream", (remoteStream: MediaStream) => {
            matchVideo.current!.srcObject = remoteStream
        })
        prevId.current = matchDetails.matchId
    })
  }

  useEffect(() => {
      // Initialize PeerJS with userId
    if(peer) peer.destroy()
    matchVideo.current!.srcObject = null
    if(userId)
    {
        if(prevId.current == matchDetails.matchId) xlog("New match not found yet")
        else
        {
            const peerInstance = new Peer(userId)
            setPeer(peerInstance)
            if(matchDetails.matchFound && prevId.current!=matchDetails.matchId)
            {
                peerInstance.on('open', (id) => {
                    if(userStream) {
                        if(matchDetails.isCaller)
                        {
                            caller(peerInstance, userStream)
                        }
                        else
                        {
                            reciever(peerInstance, userStream)
                        }
                    }
                    else
                    {
                        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                            .then(stream => {
                                setUserStream(stream)
                                userVideo.current!.srcObject = stream;
                                if (matchDetails.isCaller && matchDetails.matchId) {
                                    caller(peerInstance, stream)
                                }
                                else {
                                    reciever(peerInstance, stream)
                                }
                        });
                    }
                });
          
                peerInstance.on('error', (err) => {
                    console.error('PeerJS error:', err.type);
                });
        
                return () => {
                    peerInstance.destroy()
                }
            }
        }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchDetails, userId]);

  return (
      <div className='flex flex-col items-center justify-center relative m-4'>
        <div className='px-1 border-slate-800 border-2 min-w-full max-w-[60rem] mx-auto rounded-xl'>
            <video ref={matchVideo} autoPlay playsInline muted className='w-full m-4 z-20 mx-auto rounded-xl'/>
        </div>
        <div className='p-1 mx-auto max-w-40'
            style={{
                position: (matchDetails.matchFound ? 'absolute' : 'static'),
                bottom: 2,
                right: 3,
            }}
        >
            <video ref={userVideo} autoPlay playsInline muted className='w-full m-4 z-20 mx-auto rounded-xl'/>
        </div>
      </div>
  );
};

export default VideoCaller;