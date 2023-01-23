import SocketContext from './Context'
import io from 'socket.io-client'

const socket = io(`ws://localhost:8080`)

function SocketProvider ({children}) {
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider
