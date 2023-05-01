import {useState, useEffect, useContext, useCallback} from "react";
import {useParams, useNavigate} from "react-router-dom";
import SocketContext from "../helpers/SocketContext/Context";
import ScaleLoader from "react-spinners/ScaleLoader";
import styles from "../styles/Game.module.css";
import utilStyles from "../styles/utils.module.css";

const initialState = {
    board: new Array(9).fill(""),
    turn: "",
    currentPlayer: "x",
    winner: {
        status: "",
        id: "",
        symbol: "",
        winningSquares: [],
    },
};

const Game = () => {
    const navigate = useNavigate();
    const {roomID} = useParams();
    const socket = useContext(SocketContext);
    const [userID, setUserID] = useState("");
    const [state, setState] = useState(initialState);
    const [isMyTurn, setIsMyTurn] = useState(false);
    const [invalidRoom, setInvalidRoom] = useState(false);
    const [roomFull, setRoomFull] = useState(false);
    const [users, setUsers] = useState([]);

    const updateUserList = useCallback((userList) => {
        setUsers(userList);
    }, []);

    useEffect(() => {
        // add socket event listeners here
        socket.on("users", updateUserList);

        // return a cleanup function to remove the socket event listeners
        return () => {
            socket.off("users", updateUserList);
        };
    }, [updateUserList]);

    const handleInvalidRoom = useCallback(() => {
        setInvalidRoom(true);
    }, []);

    const handleUserID = useCallback((id) => {
        setUserID(id);
    }, []);

    const handleUpdate = useCallback((state) => {
        setState(state);
    }, []);

    const handleError = useCallback((error) => {
        setInvalidRoom(true);
    }, []);

    const handleRoomFull = useCallback(() => {
        setRoomFull(true);
    }, []);

    useEffect(() => {
        const joinRoom = () => {
            socket.emit("join room", roomID);
        };
        joinRoom();
        socket.on("invalid room", handleInvalidRoom);
        socket.on("userID", handleUserID);
        socket.on("update", handleUpdate);
        socket.on("error", handleError);
        socket.on("room full", handleRoomFull);

        return () => {
            socket.off("invalid room", handleInvalidRoom);
            socket.off("userID", handleUserID);
            socket.off("update", handleUpdate);
            socket.off("error", handleError);
            socket.off("room full", handleRoomFull);
            setState(initialState);
            setIsMyTurn(false);
        };
    }, [roomID, handleInvalidRoom, handleUserID, handleUpdate, handleError, initialState]);

    useEffect(() => {
        setIsMyTurn(userID === state.turn);
    }, [userID, state.turn]);

    if (invalidRoom) {
        return <div>Invalid room. Go back to home.</div>;
    }

    if (roomFull) {
        return <div>Room is full. Go back to home.</div>;
    }

    const handleClick = (index) => {
        if (isMyTurn) {
            socket.emit("move", {index, roomID});
            socket.emit("change player", roomID);
        }
    };

    const handleQuit = () => {
        socket.emit("leave room", roomID);
        navigate("/");
    };

    const handleRestart = () => {
        socket.emit("restart", roomID);
    };

    return (
        <>
            {!isMyTurn && !state.winner.status && (
                <div className={`${utilStyles.overlay} ${styles.status}`}>
                    <ScaleLoader color='#00FFFF' />
                    {users.length <= 1 ? <p>Waiting for player to join</p> : <p>Wait for your turn...</p>}
                </div>
            )}
            <div className={styles.container}>
                <div className={styles.gameContainer}>
                    <div className={styles.header}>
                        <div className={styles.title}>
                            <span className={styles.x}></span>
                            <span className={styles.o}></span>
                        </div>
                        <div className={styles.turn}>{state.currentPlayer} turn</div>
                    </div>
                    <div className={styles.grid}>
                        {state.board?.map((e, i) => (
                            <div
                                key={i}
                                className={`${styles.cell} ${e ? (e === "x" ? styles.x : styles.o) : null} ${
                                    state.winner.status === "win" && state.winner.winningSquares.includes(i)
                                        ? styles.winSquare
                                        : null
                                }`}
                                onClick={() => state.winner.status !== "win" && handleClick(i)}></div>
                        ))}
                    </div>
                </div>
                {state.winner.status === "win" && (
                    <div className={`${utilStyles.overlay} ${styles.wrapper}`}>
                        <div className={styles.messageContainer}>
                            <span>{state.winner.id === userID ? "you win!" : "you lose!"}</span>
                            <h3
                                className={`${styles.message} ${
                                    state.winner.symbol === "x" ? styles.cyan : styles.yellow
                                }`}>
                                <span
                                    className={`${styles.win} ${
                                        state.winner.symbol === "x" ? styles.x : styles.o
                                    }`}></span>{" "}
                                takes the round
                            </h3>
                            <div className={styles.buttons}>
                                <button className={styles.quit} onClick={handleQuit}>
                                    QUIT
                                </button>
                                <button className={styles.rematch} onClick={handleRestart}>
                                    REMATCH
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {state.winner.status === "draw" && (
                    <div className={`${utilStyles.overlay} ${styles.wrapper}`}>
                        <div className={styles.messageContainer}>
                            <span>Draw!</span>
                            <div className={styles.buttons}>
                                <button className={styles.quit} onClick={handleQuit}>
                                    QUIT
                                </button>
                                <button className={styles.rematch} onClick={handleRestart}>
                                    REMATCH
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Game;
