import React, {useEffect} from "react";
import tictac from "../assets/icons8-tic-tac-toe-96.png";
import {BiCopy} from "react-icons/bi";
import {AiFillCloseCircle} from "react-icons/ai";
import {ToastContainer, toast} from "react-toastify";
import {MdShare} from "react-icons/md";
import "react-toastify/dist/ReactToastify.css";
import {useNavigate} from "react-router-dom";
import utilStyles from "../styles/utils.module.css";
import styles from "./CreateDialogBox.module.css";

const CreateDialogBox = ({isOpen,setOpen ,roomID, setRoomID}) => {
    const navigate = useNavigate();

    const close = () => {
        setOpen(false);
        setRoomID("");
    };

    const copyCode = (code) => {
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
    };

    return (
        <>
            <section className={`${utilStyles.overlay} ${styles.wrapper} ${isOpen ? styles.show: null}`}>
                <div className={styles.body}>
                    <button title='close' className={styles.close} onClick={close}>
                        <AiFillCloseCircle className={styles.icon} />
                    </button>
                    <div className={styles.content}>
                        <img src={tictac} />
                        <div className={styles.description}>
                            <span>🚀Players: 2 / room</span>
                            <span className={styles.connect}>
                                🚀Connect: {roomID && <span className={utilStyles.underline}>{roomID}</span>}
                                <BiCopy title='copy' onClick={() => copyCode(roomID)} />
                            </span>
                            <div className={styles.buttons}>
                                <button
                                    onClick={() => {
                                        navigate(`/${roomID}`);
                                        setOpen(false);
                                    }}
                                    className={styles.play}>
                                    play
                                </button>

                                <a
                                    href={`whatsapp://send?text=https://tic-tac-toe-alpha-blue.vercel.app/${roomID}`}
                                    target='_blank'
                                    className={styles.shareLink}>
                                    <button className={styles.share}>
                                        share <MdShare />
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
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
