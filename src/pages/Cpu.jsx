import React, {useEffect, useState} from "react";
import styles from "../styles/Game.module.css";
import utilStyles from "../styles/utils.module.css";
import {useNavigate} from "react-router-dom";
import {VscDebugRestart} from "react-icons/vsc";

const initialState = {
    board: new Array(9).fill(""),
    player: "x",
    cpu: "o",
    status: {
        type: "",
        symbol: "",
        winningSquares: [],
    },
};
const gameStats = {
    wins: 0,
    losses: 0,
    draws: 0,
};

const getStats = () => JSON.parse(localStorage.getItem("stats")) ?? gameStats;
const checkWinner = (board) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8], // horizontal
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8], // vertical
        [0, 4, 8],
        [2, 4, 6], // diagonal
    ];

    for (const line of lines) {
        const [a, b, c] = line;
        if (board[a] && board[a] === board[b] && board[b] === board[c]) {
            return {type: "win", symbol: board[a], winningSquares: line};
        }
    }
    return board.includes("") ? null : {type: "draw", symbol: "", winningSquares: []};
};

const minmax = (board, depth, isMaximizing) => {
    const result = checkWinner(board);
    if (result) {
        if (result.type === "win") {
            return result.symbol === "o" ? 10 : -10;
        } else if (result.type === "draw") {
            return 0;
        }
    }

    let bestScore = isMaximizing ? -Infinity : Infinity;
    const nextPlayer = isMaximizing ? "o" : "x";
    for (let i = 0; i < board.length; i++) {
        if (!board[i]) {
            board[i] = nextPlayer;
            const score = minmax(board, depth + 1, !isMaximizing);
            board[i] = "";
            bestScore = isMaximizing ? Math.max(score, bestScore) : Math.min(score, bestScore);
        }
    }
    return bestScore;
};

const cpuMove = (board) => {
    let bestScore = -Infinity;
    let bestMove = null;
    for (let i = 0; i < board.length; i++) {
        if (!board[i]) {
            board[i] = "o";
            const score = minmax(board, 0, false);
            board[i] = "";
            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }
    return bestMove;
};

const Cpu = () => {
    const navigate = useNavigate();
    const [state, setState] = useState(initialState);
    const [stats, setStats] = useState(getStats());
    const [isReset, setIsReset] = useState(false);

    const handleQuit = () => {
        setState({
            board: new Array(9).fill(""),
            player: "x",
            cpu: "o",
            status: {
                type: "",
                symbol: "",
                winningSquares: [],
            },
        });
        navigate("/");
    };

    const handleReset = () => {
        setState({
            board: new Array(9).fill(""),
            player: "x",
            cpu: "o",
            status: {
                type: "",
                symbol: "",
                winningSquares: [],
            },
        });
        setIsReset(false);
    };

    const openResetPane = () => {
        setIsReset(true);
    };

    const closeResetPane = () => {
        setIsReset(false);
    };

    const run = (idx) => {
        let board = state.board;
        if (board[idx] !== "") return;
        else {
            board[idx] = state.player;
            setState({...state, board: board});
        }

        cpuTurn(board);
        const winState = checkWinner(board);
        if (winState) {
            setState({...state, status: winState});
        }
    };

    const cpuTurn = (board) => {
        let idx = cpuMove(board);
        board[idx] = state.cpu;
        setState({...state, board: board});
        const winState = checkWinner(board);
        if (winState) {
            setState({...state, status: winState});
        }
    };

    useEffect(() => {
        if (state.status.type === "win") {
            if (state.status.symbol === "x") {
                setStats({...stats, wins: stats.wins + 1});
            } else {
                setStats({...stats, losses: stats.losses + 1});
            }
        } else if (state.status.type === "draw") {
            setStats({...stats, draws: stats.draws + 1});
        }
    }, [state.status]);

    useEffect(() => {
        localStorage.setItem("stats", JSON.stringify(stats));
    }, [stats]);

    return (
        <div className={styles.container}>
            <div className={styles.gameContainer}>
                <div className={styles.header}>
                    <div className={styles.title}>
                        <span className={styles.x}></span>
                        <span className={styles.o}></span>
                    </div>
                    <div className={styles.reset} onClick={openResetPane}>
                        <VscDebugRestart />
                    </div>
                </div>
                <div className={styles.grid}>
                    {state.board.map((elem, idx) => {
                        return (
                            <div
                                key={idx}
                                className={`${styles.cell} ${elem ? (elem === "x" ? styles.x : styles.o) : null}`}
                                onClick={() => state.status.type !== "win" && run(idx)}></div>
                        );
                    })}
                </div>
                <div className={styles.footer}>
                    <div className={styles.stat}>
                        you ({state.player}) <br /> {stats.wins}
                    </div>
                    <div className={styles.stat}>
                        draw <br /> {stats.draws}
                    </div>
                    <div className={styles.stat}>
                        cpu ({state.cpu}) <br /> {stats.losses}
                    </div>
                </div>
            </div>
            {isReset && (
                <div className={`${utilStyles.overlay} ${styles.wrapper}`}>
                    <div className={styles.messageContainer}>
                        <div className={styles.message}>Are you sure you want to reset the game?</div>
                        <div className={styles.buttons}>
                            <button className={styles.proceed} onClick={handleReset}>
                                yes (reset)
                            </button>
                            <button className={styles.cancel} onClick={closeResetPane}>
                                no (cancel)
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {state.status.type === "win" && (
                <div className={`${utilStyles.overlay} ${styles.wrapper}`}>
                    <div className={styles.messageContainer}>
                        <span>{state.status.symbol === state.player ? "You win!" : "You lose!"}</span>
                        <h3
                            className={`${styles.message} ${
                                state.status.symbol === "x" ? styles.cyan : styles.yellow
                            }`}>
                            <span
                                className={`${styles.win} ${
                                    state.status.symbol === "x" ? styles.x : styles.o
                                }`}></span>{" "}
                            takes the round!
                        </h3>
                        <div className={styles.buttons}>
                            <button className={styles.proceed} onClick={handleReset}>
                                play again
                            </button>
                            <button className={styles.cancel} onClick={handleQuit}>
                                quit
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {state.status.type === "draw" && (
                <div className={`${utilStyles.overlay} ${styles.wrapper}`}>
                    <div className={styles.messageContainer}>
                        <div className={styles.message}>It's a draw!</div>
                        <div className={styles.buttons}>
                            <button className={styles.proceed} onClick={handleReset}>
                                play again
                            </button>
                            <button className={styles.cancel} onClick={handleQuit}>
                                quit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cpu;
