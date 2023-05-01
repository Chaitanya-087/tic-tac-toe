import {useEffect, useState} from "react";
import SocketContext from "./Context";
import io from "socket.io-client";

// https://socket-tic-tac-toe.onrender.com

function SocketProvider({children}) {
    const [socket, setSocket] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const newSocket = io(`https://socket-tic-tac-toe.onrender.com`,{
            transports: ["websocket","polling"],
            withCredentials: true,
        });
        setSocket(newSocket);
        setLoading(false);
        return () => {
            newSocket.disconnect();
        };
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
}

export default SocketProvider;
