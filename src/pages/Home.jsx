import {useCallback, useContext, useEffect, useState} from "react";
import Avatar from "../components/Avatar";
import CreateDialogBox from "../components/CreateDialogBox";
import SocketContext from "../helpers/SocketContext/Context";
import {MdEdit} from "react-icons/md";
import {BsCheckCircleFill} from "react-icons/bs";
import JoinDialogBox from "../components/JoinDialogBox";
import styles from "../styles/Home.module.css";
import { useNavigate } from "react-router-dom";

const getUser = () => {
    let user = localStorage.getItem("user");
    return user ? user : "$player";
};

const Home = () => {
    const socket = useContext(SocketContext);
    const [user, setUser] = useState(getUser());
    const [roomID, setRoomID] = useState("");
    const [isEditing, setEditing] = useState(false);
    const [isCreating, setCreating] = useState(false);
    const [isJoining, setJoining] = useState(false);
    const navigate = useNavigate();
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
        setCreating(true);
        socket.emit("create room");
    }, [socket]);

    const handleJoinRoom = useCallback(() => {
        setJoining(true);
    }, []);

    const handleNewGame = useCallback(() => {
        navigate("/ai");
    }, [navigate]);

    return (
        <main className={styles.container}>
            <section className={styles.content}>
                <div className={styles.title}>
                    <span className={styles.x}></span>
                    <span className={styles.o}></span>
                </div>
                <div className={styles.user}>
                    <Avatar />
                    <div className={styles.body}>
                        {isEditing ? (
                            <input
                                type='text'
                                className={styles.input}
                                value={user}
                                autoFocus='on'
                                onChange={(e) => setUser(e.target.value)}
                            />
                        ) : (
                            <p className={styles.name} title='user'>
                                {user}
                            </p>
                        )}
                        <button onClick={() => setEditing(!isEditing)}>
                            {isEditing ? (
                                <BsCheckCircleFill className={styles.icon} />
                            ) : (
                                <MdEdit className={styles.icon} />
                            )}
                        </button>
                    </div>
                </div>

                <div className={styles.buttons}>
                    <div className={styles.horizontal}>
                        <button onClick={handleCreateRoom} className={styles.create}>
                            create
                        </button>
                        <button onClick={handleJoinRoom} className={styles.join}>
                            join
                        </button>
                    </div>
                    <button className={styles.newgame} onClick={handleNewGame}>new game (vs cpu)</button>
                </div>
            </section>
            <CreateDialogBox isOpen={isCreating} setOpen={setCreating} roomID={roomID} setRoomID={setRoomID} />
            <JoinDialogBox isOpen={isJoining} setOpen={setJoining} />
        </main>
    );
};

export default Home;
