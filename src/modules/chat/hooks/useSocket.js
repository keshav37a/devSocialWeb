/* eslint-disable no-console */
import { useCallback, useEffect, useRef } from 'react'

import { io } from 'socket.io-client'

import { EVENTS } from '@chat/constants/chat-constants'
import { BASE_URL } from 'src/constants'

export const useSocket = ({
    fromUser,
    onReadMessage,
    onReceiveMessage,
    onSaveMessage,
    onUserTyping,
    participants,
    url = BASE_URL,
}) => {
    const socketRef = useRef(null)

    const handleJoinRoomAcknowledge = useCallback((data) => {
        console.log('handle join room acknowledge called: ', data)
    }, [])

    const handleReceiveMessage = useCallback((data) => onReceiveMessage?.(data), [onReceiveMessage])

    const handleSaveMessage = useCallback((data) => onSaveMessage?.(data), [onSaveMessage])

    const initialiseSocket = useCallback(() => {
        const socket = io(url, {
            reconnection: false,
            withCredentials: true,
        })
        return socket
    }, [url])

    const handleJoinRoom = useCallback(
        (socket) => socket?.emit('JOIN_ROOM', { fromUser, participants }),
        [fromUser, participants]
    )

    const handleReadMessage = useCallback((data) => onReadMessage?.(data), [onReadMessage])

    const handleUserTyping = useCallback(() => onUserTyping?.(), [onUserTyping])

    useEffect(() => {
        if (!socketRef.current) {
            socketRef.current = initialiseSocket()
            handleJoinRoom(socketRef.current)
        }
        const socket = socketRef.current
        socket?.connect()
        socket?.on(EVENTS.USER_JOINED_ROOM, handleJoinRoomAcknowledge)
        socket?.on(EVENTS.RECEIVE_MESSAGE, handleReceiveMessage)
        socket?.on(EVENTS.SAVE_MESSAGE, handleSaveMessage)
        socket?.on(EVENTS.READ_MESSAGE, handleReadMessage)
        socket?.on(EVENTS.USER_TYPING, handleUserTyping)
        const reconnectIntervalId = setInterval(() => {
            if (!socket.connected) {
                socket.connect()
            }
        }, 2000)
        return () => {
            socket?.off(EVENTS.USER_JOINED_ROOM)
            socket?.off(EVENTS.RECEIVE_MESSAGE)
            socket?.off(EVENTS.SAVE_MESSAGE)
            socket?.off(EVENTS.READ_MESSAGE)
            socket?.on(EVENTS.USER_TYPING)
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
