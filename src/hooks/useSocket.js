import { useCallback, useEffect, useState } from 'react'

import { io } from 'socket.io-client'

export const useSocket = ({ fromUser, onReceiveMessage, toUser, url }) => {
    const [socket, setSocket] = useState(null)

    const handleJoinRoom = useCallback(() => {
        socket.emit('JOIN_ROOM', { fromUser, toUser })
    }, [fromUser, toUser, socket])

    const handleJoinRoomAcknowledge = useCallback((data) => {
        console.log('handle join room acknowledge called: ', data)
    }, [])

    useEffect(() => {
        const socket = io(url, {
            reconnection: true, // enable reconnection (default)
            reconnectionAttempts: 5, // try to reconnect up to 5 times
            reconnectionDelay: 1000, // wait 1s before retrying
            reconnectionDelayMax: 5000, // max delay between attempts
        })
        setSocket(socket)
    }, [url])

    useEffect(() => {
        socket?.on('connect', () => {
            handleJoinRoom()
        })
        socket?.on('USER_JOINED_ROOM', (data) => {
            console.log('user joined room: ', data)
            handleJoinRoomAcknowledge(data)
        })
        socket?.on('RECEIVE_MESSAGE', (data) => {
            onReceiveMessage?.(data)
        })
        const reconnectInterval = setInterval(() => {
            if (!socket.connected) {
                console.log('socket not connected. reconnecting...')
                socket.connect()
            }
        }, 2000)
        return () => {
            socket?.disconnect()
            clearInterval(reconnectInterval)
        }
    }, [socket, handleJoinRoom, handleJoinRoomAcknowledge, onReceiveMessage])

    return { socket }
}
