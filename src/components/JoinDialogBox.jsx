import React, { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

const JoinDialogBox = ({ dialogRef }) => {
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

  return (
    <dialog
      ref={dialogRef}
      className='w-[320px] backdrop:bg-[rgba(0,0,0,0.25)] bg-dark-blue  text-light-gray rounded-lg'>
      <div className="flex flex-col gap-2">
        <h3 className="text-center text-lg font-semibold">Join Game</h3>
        <span className="text-left text-sm">Enter room name below</span>
        <button
          title='close'
          className='absolute top-2 right-2'
          onClick={close}>
          <AiFillCloseCircle className='text-xl' />
        </button>
        <input
          type='text'
          placeholder='room id...'
          title="room id"
          className='bg-transparent focus:outline-none border w-full border-1 border-light-gray rounded-sm p-2'
          onChange={(e) => setRoomID(e.target.value)}
        />
        <Link type="button" to={`/${roomID}`} className='w-full py-2 text-[12px] text-dark-blue text-center rounded-sm uppercase font-semibold bg-yellow'>
          play
        </Link>
      </div>
    </dialog>
  );
};

export default JoinDialogBox;
