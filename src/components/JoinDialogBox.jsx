import React, {useState} from "react";
import {AiFillCloseCircle} from "react-icons/ai";
import {useNavigate} from "react-router-dom";
import utilStyles from "../styles/utils.module.css";
import styles from "./JoinDialogBox.module.css";

const JoinDialogBox = ({isOpen, setOpen}) => {
    const [roomID, setRoomID] = useState("");
    const navigate = useNavigate();
    const close = () => {
        setOpen(false);
        setRoomID("");
    };

    return (
        <div className={`${utilStyles.overlay} ${styles.wrapper} ${isOpen ? styles.show : null}`}>
            <div className={styles.body}>
                <h3 className={styles.title}>Join Game</h3>
                <p className={styles.sub}>Enter room name below</p>
                <button title='close' className={styles.close} onClick={close}>
                    <AiFillCloseCircle className={styles.icon} />
                </button>
                <input
                    type='text'
                    placeholder='room id...'
                    title='room id'
                    className={styles.roomInput}
                    onChange={(e) => setRoomID(e.target.value)}
                />
                <button
                    onClick={() => {
                        navigate(`/${roomID}`);
                        close();
                    }}
                    className={styles.play}>
                    play
                </button>
            </div>
        </div>
    );
};

export default JoinDialogBox;
