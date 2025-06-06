import { useCallback, useEffect, useRef } from 'react'

import { io } from 'socket.io-client'

export const useSocket = ({ fromUser, onReadMessage, onReceiveMessage, onSaveMessage, onUserTyping, toUser, url }) => {
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

    const handleReadMessage = useCallback((data) => onReadMessage?.(data), [onReadMessage])

    const handleUserTyping = useCallback(() => onUserTyping?.(), [onUserTyping])

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
        socket?.on('READ_MESSAGE', handleReadMessage)
        socket?.on('USER_TYPING', handleUserTyping)
        const reconnectIntervalId = setInterval(() => {
            if (!socket.connected) {
                socket.connect()
            }
        }, 2000)
        return () => {
            socket?.off('USER_JOINED_ROOM')
            socket?.off('RECEIVE_MESSAGE')
            socket?.off('SAVE_MESSAGE')
            socket?.off('READ_MESSAGE')
            socket?.on('USER_TYPING')
            socket?.disconnect()
            clearInterval(reconnectIntervalId)
        }
    }, [
        handleReceiveMessage,
        handleJoinRoomAcknowledge,
        initialiseSocket,
        handleSaveMessage,
        handleJoinRoom,
        handleReadMessage,
        handleUserTyping,
    ])

    return { socket: socketRef.current }
}
