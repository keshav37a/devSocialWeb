import { useCallback, useEffect, useRef } from 'react'

import { io } from 'socket.io-client'

export const useSocket = ({ fromUser, onReceiveMessage, onSaveMessage, toUser, url }) => {
    const socketRef = useRef(null)

    const handleJoinRoomAcknowledge = useCallback((data) => {
        console.log('handle join room acknowledge called: ', data)
    }, [])

    const handleReceiveMessage = useCallback((data) => onReceiveMessage?.(data), [onReceiveMessage])

    const handleSaveMessage = useCallback((data) => onSaveMessage?.(data), [onSaveMessage])

    const initialiseSocket = useCallback(() => {
        const socket = io(url, {
            reconnection: false,
        })
        return socket
    }, [url])

    const handleJoinRoom = useCallback((socket) => socket?.emit('JOIN_ROOM', { fromUser, toUser }), [fromUser, toUser])

    useEffect(() => {
        if (!socketRef.current) {
            socketRef.current = initialiseSocket()
            handleJoinRoom(socketRef.current)
        }
        const socket = socketRef.current
        socket?.connect()
        socket?.on('USER_JOINED_ROOM', handleJoinRoomAcknowledge)
        socket?.on('RECEIVE_MESSAGE', handleReceiveMessage)
        socket?.on('SAVE_MESSAGE', handleSaveMessage)
        const reconnectIntervalId = setInterval(() => {
            if (!socket.connected) {
                socket.connect()
            }
        }, 2000)
        return () => {
            socket?.off('USER_JOINED_ROOM')
            socket?.off('RECEIVE_MESSAGE')
            socket?.off('SAVE_MESSAGE')
            socket?.disconnect()
            clearInterval(reconnectIntervalId)
        }
    }, [handleReceiveMessage, handleJoinRoomAcknowledge, initialiseSocket, handleSaveMessage, handleJoinRoom])

    return { socket: socketRef.current }
}
