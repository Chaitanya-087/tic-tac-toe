import SocketContext from './Context'
import io from 'socket.io-client'

const socket = io(`https://zs149f.deta.dev`)

function SocketProvider ({children}) {
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider
