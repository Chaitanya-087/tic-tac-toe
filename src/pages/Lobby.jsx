import {useCallback, useContext, useEffect, useRef, useState} from "react";
import Avatar from "../components/Avatar";
import CreateDialogBox from "../components/CreateDialogBox";
import SocketContext from "../helpers/SocketContext/Context";
import {MdEdit} from "react-icons/md";
import JoinDialogBox from "../components/JoinDialogBox";
import {BsCheckCircleFill} from "react-icons/bs";

const getUser = () => {
  let user = localStorage.getItem("user");
  return user ? user : "player$";
};

const Lobby = () => {
  const socket = useContext(SocketContext);
  const createDialogRef = useRef(null);
  const joinDialogRef = useRef(null);
  const [user, setUser] = useState(getUser());
  const [roomID, setRoomID] = useState("");
  const [isChange, setChange] = useState(false);

  useEffect(() => {
    localStorage.setItem("user", user);
  }, [user]);
  
  const handleRoomCreated = useCallback((roomid) => {
    setRoomID(roomid);
  }, []);

  useEffect(() => {
    socket.on("room created", handleRoomCreated);
    return () => {
      socket.off("room created", handleRoomCreated);
    };
  }, [socket, handleRoomCreated]);

  const handleCreateRoom = useCallback(() => {
    createDialogRef.current.showModal();
    socket.emit("create room");
  }, [socket]);

  const handleJoinRoom = useCallback(() => {
    joinDialogRef.current.showModal();
  }, []);

  return (
    
    <div className='bg-dark-blue w-screen h-screen px-3 flex flex-col items-center justify-center'>
      <div className='w-full flex flex-col gap-4 sm:w-80'>
        <div className='flex items-center justify-center'>
          <div className='w-6 h-6 flex items-center justify-center relative'>
            <span className='absolute w-6 h-2 rounded-sm bg-cyan rotate-45'></span>
            <span className='absolute w-6 h-2 rounded-sm bg-cyan -rotate-45'></span>
          </div>
          <div className='w-6 h-6 flex items-center justify-center'>
            <span className='w-2 h-2 rounded-full shadow-[0_0_0_8px_rgb(243,178,54)]'></span>
          </div>
        </div>

        <div className='bg-dark-gray flex items-center p-3 rounded-lg gap-3 py-4 shadow-md'>
          <Avatar />
          <div className='flex items-center justify-between w-full text-light-gray gap-2'>
            {!isChange ? (
              <h3 className='text-md font-bold' title='user'>
                {user}
              </h3>
            ) : (
              <input
                type='text'
                className='bg-transparent w-full focus:outline-none border rounded-sm p-1'
                value={user}
                onChange={(e) => setUser(e.target.value)}
              />
            )}
            <div className='flex items-center justify-center'>
              {isChange ? (
                <BsCheckCircleFill
                  className='text-2xl cursor-pointer'
                  onClick={() => setChange(!isChange)}
                />
              ) : (
                <MdEdit
                  className='text-2xl cursor-pointer'
                  onClick={() => setChange(!isChange)}
                />
              )}
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-4'>
          <div className='flex items-center gap-2'>
            <button
              onClick={handleCreateRoom}
              className='p-4 text-[12px] flex-1 rounded-lg uppercase font-semibold bg-yellow shadow-[0_5px_0_rgb(203,140,21)]'>
              create
            </button>
            <button
              onClick={handleJoinRoom}
              className='p-4 text-[12px] flex-1 rounded-lg uppercase font-semibold bg-yellow shadow-[0_5px_0_rgb(203,140,21)]'>
              join
            </button>
          </div>
          <button className='p-4 text-[12px] rounded-lg uppercase font-semibold bg-cyan shadow-[0_5px_0_rgb(27,158,155)]'>
            new game (vs cpu)
          </button>
        </div>
      </div>
      <CreateDialogBox
        roomID={roomID}
        dialogRef={createDialogRef}
        setRoomID={setRoomID}
        socket={socket}
      />
      <JoinDialogBox dialogRef={joinDialogRef} />
    </div>
  );
};

export default Lobby;
