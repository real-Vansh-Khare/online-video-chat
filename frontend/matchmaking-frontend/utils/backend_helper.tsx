"use client";

import API from '@/lib/api';
import axios from 'axios';
import React, {MouseEvent, useState} from 'react'

type Position = {
  x: number,
  y: number
};

const BackendHelper = () => {

  const [pos, setPos] = useState<Position>({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [rel, setRel] = useState({ x: 0, y: 0 });

  const draggableDivRef = React.useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: MouseEvent) => {
    if (e.button !== 0) return; // Only allow left mouse button
    const position = { x: e.pageX - pos.x, y: e.pageY - pos.y };
    setDragging(true);
    setRel(position);
    e.stopPropagation();
    e.preventDefault();
  };

  const handleMouseUp = (e: MouseEvent) => {
    setDragging(false);
    e.stopPropagation();
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragging) return;
    const newPos = { x: e.pageX - rel.x, y: e.pageY - rel.y };
    setPos(newPos);
    e.stopPropagation();
    e.preventDefault();
  };

  async function dev_clearMatchList() {
    const resp = await axios.post(`${API.DEV}?option=clear_match_list`);
    if(resp.data.done) {
      alert("Match List cleared");
    }
  }

  return (
    <div className='absolute w-60 p-2 z-40 top-3 gap-2 right-3 flex-col flex justify-center items-center bg-blue-200 rounded-xl border shadow-md'
    style={{
      left: pos.x,
      top: pos.y,
      // cursor: 'grab'
    }}
    >
      <h1 className='text-center text-xl'>BG Helper</h1>
      <button className='text-base px-2 py-1 bg-red-400 hover:bg-red-500 mx-auto rounded-full' onClick={dev_clearMatchList}>Clear MatchList</button>
      <div className='ml-auto w-4 h-4 bg-purple-500 rounded-xl cursor-grab' ref={draggableDivRef} onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}
      ></div>
    </div>
  )
}

export default BackendHelper;