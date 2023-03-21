import SocketContext from './Context'
import io from 'socket.io-client'

const socket = io(`https://socket-tic-tac-toe.onrender.com`)

function SocketProvider ({children}) {
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider
