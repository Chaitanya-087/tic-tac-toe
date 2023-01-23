import { useState, useEffect, useRef, useContext } from "react";
import SocketContext from "../helpers/SocketContext/Context";

const initialState = {
  board: new Array(9).fill(""),
  currentplayer: "x",
  isWin: false,
};

function Game() {
  const once = useRef(false);
  const [state, setState] = useState(initialState);
  const socket = useContext(SocketContext)
  const roomID = window.location.pathname.slice(1,)
  socket.emit('join room',roomID)
  useEffect(() => {
    if (once.current === false) {
      socket.on("update", (state) => {
        setState((prev) => {
          return { ...prev, ...state };
        });
        
      });

      return () => {
        once.current = true;
        socket.emit("leave room", roomID);
        setState(initialState);
      };

    }

  }, []);

  const handleClick = (index) => {
    console.log(index)
    socket.emit("move", { index, roomID });
  };

  return (
    <div className='bg-dark-blue w-screen h-screen px-3 flex flex-col items-center justify-center'>
      <div className='flex flex-col gap-6 w-70'>
        <div className='grid grid-cols-3 gap-3'>
          {state.board?.map((e, i) => (
            <div key={i} className={`cell ${e}`} onClick={() => handleClick(i)}></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Game;
