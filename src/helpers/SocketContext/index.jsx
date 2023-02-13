import SocketContext from './Context'
import io from 'socket.io-client'

const socket = io(`wss://panoramic-sapphire-pigment.glitch.me/`)

function SocketProvider ({children}) {
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider
