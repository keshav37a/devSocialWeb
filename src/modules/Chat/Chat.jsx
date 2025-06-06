import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { useDispatch } from 'react-redux'

import { ChatHeader, ChatMessage } from '@Chat'
import { Loading } from '@CoreUI'
import { Form } from '@CoreUI/Form'
import { FORM_FIELD_TYPES } from '@CoreUI/Form/constants'
import { useDebounce, useSocket } from 'hooks'
import { SendIcon } from 'icons'

import { chatMessagesApi, GET_CHAT_MESSAGES_ENDPOINT, useGetChatMessagesQuery } from '@Chat/chatApi'

import { scrollToBottom } from 'src/utils'

const getRoomId = ({ signedInUserId, partnerUserId }) => `${signedInUserId}${partnerUserId}`.split('').sort().join('')

export const Chat = ({ partnerUser, signedInUser, onCloseChat }) => {
    const { _id: signedInUserId, photoUrl: signedInUserPhotoUrl, fullName: signedInUserName } = signedInUser
    const { _id: partnerUserId, fullName: partnerUserName, photoUrl: partnerUserPhotoUrl } = partnerUser
    const dispatch = useDispatch()
    const [isChatOpen, setIsChatOpen] = useState(true)
    const [isTyping, setIsTyping] = useState(false)

    const messagesWrapperRef = useRef()
    const roomId = useMemo(() => getRoomId({ signedInUserId, partnerUserId }), [signedInUserId, partnerUserId])

    const handleReceiveMessage = useCallback(
        (data) => {
            dispatch(
                chatMessagesApi.util.updateQueryData(GET_CHAT_MESSAGES_ENDPOINT, roomId, (draft) => {
                    draft.push(data)
                })
            )
        },
        [dispatch, roomId]
    )

    const handleReadMessage = useCallback(
        (data) => {
            dispatch(
                chatMessagesApi.util.updateQueryData(GET_CHAT_MESSAGES_ENDPOINT, roomId, (draft) => {
                    const messageData = draft.find(({ _id: messageId }) => data.messageId === messageId)
                    if (messageData) {
                        messageData.isRead = true
                        messageData.readAt = data.readAt
                    }
                })
            )
        },
        [dispatch, roomId]
    )

    const handleSendMessage = ({ message }) => {
        const messageData = {
            fromUser: signedInUserId,
            message,
            toUser: partnerUserId,
            sentAt: new Date().toISOString(),
        }
        socket.emit('SEND_MESSAGE', messageData)
        dispatch(
            chatMessagesApi.util.updateQueryData(GET_CHAT_MESSAGES_ENDPOINT, roomId, (draft) => {
                draft.push({ ...messageData, roomId })
            })
        )
    }

    const handleSaveMessage = useCallback(
        (data) => {
            dispatch(
                chatMessagesApi.util.updateQueryData(GET_CHAT_MESSAGES_ENDPOINT, roomId, (draft) => {
                    const sentAtISOString = new Date(data.sentAt).toISOString()
                    const messageData = draft.find(
                        ({ fromUser, toUser, sentAt }) =>
                            data.fromUser === fromUser &&
                            data.toUser === toUser &&
                            data.sentAt &&
                            sentAtISOString === sentAt
                    )
                    if (messageData) {
                        messageData._id = data._id
                    }
                })
            )
        },
        [dispatch, roomId]
    )

    const handleUserTyping = useCallback(() => setIsTyping(true), [])

    const { socket } = useSocket({
        url: 'http://localhost:7777',
        fromUser: signedInUserId,
        toUser: partnerUserId,
        onReadMessage: handleReadMessage,
        onReceiveMessage: handleReceiveMessage,
        onSaveMessage: handleSaveMessage,
        onUserTyping: handleUserTyping,
    })
    const { data: chatMessages, isLoading } = useGetChatMessagesQuery(roomId)
    const handleToggleChat = () => setIsChatOpen((prev) => !prev)
    const handleCloseChat = () => onCloseChat?.()

    useEffect(() => {
        scrollToBottom(messagesWrapperRef)
    }, [chatMessages])

    useEffect(() => {
        const unreadMessages = document.querySelectorAll('.unread')
        const observer = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    const messageEL = entry.target
                    if (entry.isIntersecting && messageEL.dataset.messageId) {
                        messageEL.classList.remove('unread')

                        const messageId = messageEL.dataset.messageId

                        socket.emit('READ_MESSAGE', { messageId, readAt: new Date(), roomId })

                        observer.unobserve(messageEL)
                    }
                })
            },
            {
                threshold: 1.0,
            }
        )

        unreadMessages.forEach((msg) => observer.observe(msg))
    }, [chatMessages, socket, roomId])

    useEffect(() => {
        if (isTyping) {
            setTimeout(() => {
                setIsTyping(false)
            }, [1000])
        }
    }, [isTyping])

    const handleInvokeTyping = () => {
        socket.emit('USER_TYPING', { roomId })
    }

    const debouncedTyping = useDebounce({ callback: handleInvokeTyping, delay: 200 })

    return (
        <div className="fixed right-0 bottom-0 z-500 min-h-8 w-80 cursor-pointer rounded-t-lg bg-base-300 p-2">
            <ChatHeader
                isChatOpen={isChatOpen}
                onCloseChat={handleCloseChat}
                onToggleChat={handleToggleChat}
                partnerUserName={partnerUserName}
                partnerUserPhotoUrl={partnerUserPhotoUrl}
            />
            <div
                className={`chat-messages-form-wrapper m-1.5 flex flex-col transition-all duration-300 ease-in-out ${isChatOpen ? 'visible h-100' : 'h-0 translate-y-5'}`}
            >
                <div className="chat-messages-wrapper grow-1 overflow-y-auto pb-4" ref={messagesWrapperRef}>
                    {isLoading ? (
                        <Loading />
                    ) : (
                        chatMessages?.map(({ _id, fromUser, isRead, message, receivedAt, sentAt }, index) => (
                            <ChatMessage
                                fromUser={fromUser}
                                isRead={isRead}
                                key={sentAt}
                                message={message}
                                messageId={_id}
                                partnerUserName={partnerUserName}
                                partnerUserPhotoUrl={partnerUserPhotoUrl}
                                prevMessageSenderId={index > 0 ? chatMessages[index - 1]?.fromUser : null}
                                receivedAt={receivedAt}
                                sentAt={sentAt}
                                signedInUserId={signedInUserId}
                                signedInUserName={signedInUserName}
                                signedInUserPhotoUrl={signedInUserPhotoUrl}
                            />
                        ))
                    )}
                </div>
                {isTyping ? <div className="text-xs">{partnerUserName} is typing</div> : null}
                <Form
                    className="chat-sumbmit-form flex pt-0.5"
                    fields={[
                        {
                            className: 'w-full mr-1',
                            id: 'message',
                            name: 'message',
                            noError: true,
                            inputProps: { onInput: debouncedTyping },
                            placeholder: 'Enter your message',
                            required: true,
                            shouldClearOnSubmit: true,
                            type: FORM_FIELD_TYPES.TEXT,
                        },
                    ]}
                    onSubmit={handleSendMessage}
                    submitBtnProps={{ label: <SendIcon size={15} /> }}
                />
            </div>
        </div>
    )
}
