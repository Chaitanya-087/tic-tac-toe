import {useState, useEffect, useContext} from "react";
import {useParams, useNavigate} from "react-router-dom";

import SocketContext from "../helpers/SocketContext/Context";

const initialState = {
  board: new Array(9).fill(""),
  currentplayer: "x",
  isWin: false,
};

function Game() {
  const [state, setState] = useState(initialState);
  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  const {roomID} = useParams();
  
  useEffect(() => {
    socket.on("valid", (data) => {
      if (confirm(`${data.message} ${roomID}`)) {
        navigate("/");
      }
    });
  },[]);

  useEffect(() => {
    socket.emit("join room", roomID);
  }, []);
  
  useEffect(() => {
    socket.on("update", (state) => {
      setState((prev) => {
        return {...prev, ...state};
      });
    });
    return () => {
      socket.emit("leave room", roomID);
      setState(initialState);
    };
  }, []);

  const handleClick = (index) => {
    socket.emit("move", {index, roomID});
  };

  return (
    <div className='bg-dark-blue w-screen h-screen px-3 flex flex-col items-center justify-center'>
      <div className='flex flex-col gap-6 w-70'>
        <div className='grid grid-cols-3 gap-3'>
          {state.board?.map((e, i) => (
            <div
              key={i}
              className={`cell ${e}`}
              onClick={() => handleClick(i)}></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Game;
