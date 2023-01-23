import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillCloseCircle } from "react-icons/ai";
import {BsFillPlayFill} from "react-icons/bs"

const JoinDialogBox = ({ dialogRef }) => {
  const navigate = useNavigate();
  const [roomID, setRoomID] = useState("");

  function dialogClickHandler(e) {
    if (e.target.tagName !== "DIALOG") return;

    const rect = e.target.getBoundingClientRect();

    const clickedInDialog =
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width;

    if (clickedInDialog === false) e.target.close();
  }

  function close() {
    dialogRef.current.close();
  }

  useEffect(() => {
    window.addEventListener("mousedown", dialogClickHandler);
  }, []);

  function play() {
    navigate(`/${roomID}`)
  }
  
  return (
    <dialog
      ref={dialogRef}
      className='w-[320px] backdrop:bg-[rgba(0,0,0,0.25)] bg-dark-blue text-light-gray rounded-lg'>
      <div className="flex flex-col gap-4">
        <h3 className="text-center text-lg font-semibold">Join Game</h3>
        <span className="text-center">Enter room name below</span>
        <button
          title='close'
          className='absolute top-2 right-2'
          onClick={close}>
          <AiFillCloseCircle className='text-xl' />
        </button>
        <input
          type='text'
          placeholder='room name...'
          title="room id"
          className='bg-transparent focus:outline-none border w-full border-1 border-light-gray rounded-sm p-2'
          onChange={(e) => setRoomID(e.target.value)}
        />
        <button
          onClick={play}
          className='p-1 text-[12px] text-dark-blue flex flex-1 items-center justify-center px-2 rounded-sm uppercase font-semibold bg-yellow'>
          play
        </button>
      </div>
    </dialog>
  );
};

export default JoinDialogBox;
