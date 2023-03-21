import {useState, useEffect, useContext} from "react";
import {useParams} from "react-router-dom";

import SocketContext from "../helpers/SocketContext/Context";

const initialState = {
  board: new Array(9).fill(""),
  turn: "",
  currentplayer: "x",
  winner: "",
};

function Game() {
  const {roomID} = useParams();
  const socket = useContext(SocketContext);
  const [users, setUsers] = useState([]);
  const [userID, setUserID] = useState("");
  const [state, setState] = useState(initialState);
  const [isMyTurn, setIsMyTurn] = useState(false);
  const [invalidRoom, setInvalidRoom] = useState(false);

  useEffect(() => {
    const joinRoom = async () => {
      await socket.emit("join room", roomID);
    };
    const handleInvalidRoom = () => {
      setInvalidRoom(true);
    };
    const handleUserID = (id) => {
      setUserID(id);
      console.log("user id set to", id);
    };
    const handleInitialState = ({users, state}) => {
      setUsers(users);
      setState(state);
    };
    const handleUpdate = (state) => {
      setState(state);
    };
    const handleError = (error) => {
      console.error(error);
      setInvalidRoom(true);
    };

    joinRoom();
    socket.on("invalid room", handleInvalidRoom);
    socket.on("userID", handleUserID);
    socket.on("initial state", handleInitialState);
    socket.on("update", handleUpdate);
    socket.on("error", handleError);

    return () => {
      socket.emit("leave room", roomID);
      socket.off("invalid room", handleInvalidRoom);
      socket.off("userID", handleUserID);
      socket.off("initial state", handleInitialState);
      socket.off("update", handleUpdate);
      socket.off("error", handleError);
      setUsers([]);
      setState(initialState);
      setIsMyTurn(false);
    };
  }, []);

  useEffect(() => {
    setIsMyTurn(userID === state.turn);
  }, [userID, users, state.turn]);

  if (invalidRoom) {
    return <div>Invalid room. Go back to home.</div>;
  }

  const handleClick = (index) => {
    if (isMyTurn) {
      socket.emit("move", {index, roomID});
      socket.emit("change player", roomID);
    }
  };

  return (
    <>
      {isMyTurn ? null : (
        <div className='w-screen h-screen absolute top-0 left-0 bg-dark-blue opacity-50 flex items-center justify-center z-10'></div>
      )}
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
    </>
  );
}

export default Game;
