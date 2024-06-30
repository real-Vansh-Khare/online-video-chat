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
  }, [matchDetails, userId]);

  return (
      <div className='flex flex-col lg:flex-row gap-6'>
        <video ref={userVideo} autoPlay playsInline muted className='max-w-[500px] m-4'/>
        <video ref={matchVideo} autoPlay playsInline muted className='max-w-[500px] m-4'/>
      </div>
  );
};

export default VideoCaller;