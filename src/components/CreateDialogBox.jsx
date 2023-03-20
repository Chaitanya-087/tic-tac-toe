import React, {useEffect} from "react";
import tictac from "../assets/icons8-tic-tac-toe-96.png";
import {BiCopy} from "react-icons/bi";
import {AiFillCloseCircle} from "react-icons/ai";
import {ToastContainer, toast} from "react-toastify";
import {MdShare} from "react-icons/md";
import "react-toastify/dist/ReactToastify.css";
import {Link} from "react-router-dom";

const CreateDialogBox = ({dialogRef, roomID, setRoomID}) => {
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

  useEffect(() => {
    window.addEventListener("mousedown", dialogClickHandler);
  }, []);

  function close() {
    setRoomID("");
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
        <div>
          <button
            title='close'
            className='absolute top-2 right-2'
            onClick={close}>
            <AiFillCloseCircle className='text-xl' />
          </button>
          <div className='flex flex-col items-center  gap-4'>
            <img src={tictac} />
            <div className='flex flex-col w-full gap-4'>
              <span>🚀Players: 2 / room</span>
              <h3 className='flex gap-1'>
                🚀Connect: {roomID && <span className='underline'>{roomID}</span>}
                <BiCopy
                  title='copy'
                  className='cursor-pointer'
                  onClick={() => copyCode(roomID)}
                />
              </h3>
              <div className='flex items-center gap-4'>
                <Link
                  type='button'
                  to={`/${roomID}`}
                  className='py-2 flex-1 text-[12px] text-dark-blue text-center rounded-sm uppercase font-semibold bg-yellow'>
                  play
                </Link>

                <a
                  href={`whatsapp://send?text=https://wondrous-griffin-5bc529.netlify.app/${roomID}`}
                  target='_blank'
                  className='flex flex-1 p-2 rounded-sm  bg-cyan'>
                  <button className='flex items-center flex-1 justify-between text-[12px] font-semibold  text-dark-blue  uppercase'>
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
