
import React from 'react'
import { MatchDetails } from './matchmaker';

interface VideoCallerProps {
  userId: string | null;
  matchDetails: MatchDetails;
};

const VideoCaller: React.FC<VideoCallerProps> = ({ userId, matchDetails }) => {
  return (
    <div>{userId} VideoCaller Component</div>
  )
}

export default VideoCaller;