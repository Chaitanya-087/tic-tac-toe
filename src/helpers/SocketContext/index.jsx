import SocketContext from './Context'
import io from 'socket.io-client'

const socket = io(`localhost:5001`)

function SocketProvider ({children}) {
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider
