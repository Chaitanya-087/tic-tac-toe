import React, { useEffect } from "react";
import tictac from "../assets/icons8-tic-tac-toe-96.png";
import { BiCopy } from "react-icons/bi";
import { AiFillCloseCircle } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {MdShare} from "react-icons/md"
import {BsFillPlayFill} from "react-icons/bs"
import "react-toastify/dist/ReactToastify.css";

const CreateDialogBox = ({ dialogRef, roomID }) => {
  const navigate = useNavigate();
  function dialogClickHandler(e) {
    if (e.target.tagName !== "DIALOG")
      return;

    const rect = e.target.getBoundingClientRect();

    const clickedInDialog =
      rect.top <= e.clientY &&
      e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX &&
      e.clientX <= rect.left + rect.width;

    if (clickedInDialog === false) e.target.close();
  }

  useEffect(() => {
    window.addEventListener("mousedown", dialogClickHandler);
  }, []);

  function play() {
    navigate(`/${roomID}`);
  }

  function close() {
    dialogRef.current.close();
  }

  function copyCode(code) {
    navigator.clipboard.writeText(code);
    toast.success("code copied👌", {
      position: "bottom-left",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }

  return (
    <>
      <dialog
        className='w-[320px] backdrop:bg-[rgba(0,0,0,0.25)] bg-dark-blue  text-light-gray rounded-lg'
        ref={dialogRef}>
        <div onClick={(e) => e.stopPropagation()}>
          <button
            title='close'
            className='absolute top-2 right-2'
            onClick={close}>
            <AiFillCloseCircle className='text-xl' />
          </button>
          <div className='flex flex-col items-center  gap-4'>
            <img src={tictac} />
            <div className='flex flex-col w-full gap-4'>
              <span>🚀only two players are allowed in room</span>
              <h3 className='flex gap-1'>
                🚀Connect with friend{" "}
                <span className='underline'>{roomID}</span>
                <BiCopy
                  title='copy'
                  className='cursor-pointer'
                  onClick={() => copyCode(roomID)}
                />
              </h3>
              <div className='flex items-center gap-4'>

                <button
                  onClick={play}
                  className='p-1 text-[12px] w-[50px] text-dark-blue flex flex-1 items-center justify-between px-2 rounded-sm uppercase font-semibold bg-yellow'>
                  play <BsFillPlayFill/>
                </button>
                
                <a href={`whatsapp://send?text=URL`} target="_blank" className="flex flex-1">
                  <button className='p-1 text-[12px] w-[50px] ml-auto text-dark-blue flex items-center flex-1 justify-between px-2 rounded-sm uppercase font-semibold bg-cyan'>
                    share <MdShare />
                  </button>
                </a>

              </div>
            </div>
          </div>
        </div>
      </dialog>
      <ToastContainer
        className='z-10'
        position='bottom-left'
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
    </>
  );
};

export default CreateDialogBox;
