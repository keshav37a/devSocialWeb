import { useCallback, useEffect, useRef, useState } from 'react'

import { useDispatch } from 'react-redux'

import { ChatHeader, ChatMessage } from '@chat/components'
import { Loading } from '@components'
import { Form, FORM_FIELD_TYPES } from '@components/Form'

import { SendIcon } from 'icons'

import { chatMessagesApi, useGetChatMessagesQuery } from 'src/modules/chat-temp/api/chat-api'

import { useSocket } from 'src/modules/chat-temp/hooks/useSocket'
import { useDebounce } from 'hooks'

import { scrollToBottom } from 'src/utils'

import { EVENTS, GET_CHAT_MESSAGES_ENDPOINT } from 'src/modules/chat-temp/constants/chat-constants'

export const Chat = ({ participants, partnerUser, signedInUser, onCloseChat }) => {
    const { _id: signedInUserId, photoUrl: signedInUserPhotoUrl, fullName: signedInUserName } = signedInUser
    const { fullName: partnerUserName, photoUrl: partnerUserPhotoUrl } = partnerUser
    const dispatch = useDispatch()
    const [isChatOpen, setIsChatOpen] = useState(true)
    const [isTyping, setIsTyping] = useState(false)

    const messagesWrapperRef = useRef()

    const handleGetReceiveMessageEvent = useCallback(
        (data) => {
            dispatch(
                chatMessagesApi.util.updateQueryData(GET_CHAT_MESSAGES_ENDPOINT, participants, (draft) => {
                    draft.push(data)
                })
            )
        },
        [dispatch, participants]
    )

    const handleGetReadMessageEvent = useCallback(
        (data) => {
            dispatch(
                chatMessagesApi.util.updateQueryData(GET_CHAT_MESSAGES_ENDPOINT, participants, (draft) => {
                    const messageData = draft.find(({ _id: messageId }) => data.messageId === messageId)
                    if (messageData) {
                        messageData.readBy = messageData.readBy ? [...messageData.readBy, data.readBy] : [data.readBy]
                    }
                })
            )
        },
        [dispatch, participants]
    )

    const handleEmitSendMessageEvent = ({ message }) => {
        const messageData = {
            fromUser: signedInUserId,
            message,
            participants,
            sentAt: new Date().toISOString(),
        }
        socket.emit(EVENTS.SEND_MESSAGE, messageData)
        dispatch(
            chatMessagesApi.util.updateQueryData(GET_CHAT_MESSAGES_ENDPOINT, participants, (draft) => {
                draft.push({ ...messageData })
            })
        )
    }

    const handleGetSaveMessageEvent = useCallback(
        (data) => {
            dispatch(
                chatMessagesApi.util.updateQueryData(GET_CHAT_MESSAGES_ENDPOINT, participants, (draft) => {
                    const sentAtISOString = new Date(data.sentAt).toISOString()
                    const messageData = draft.find(
                        ({ fromUser, sentAt }) =>
                            data.fromUser === fromUser &&
                            data.participants.length === participants.length &&
                            participants.every((userId) => data.participants.includes(userId)) &&
                            data.sentAt &&
                            sentAtISOString === sentAt
                    )
                    if (messageData) {
                        messageData._id = data.messageId
                    }
                })
            )
        },
        [dispatch, participants]
    )

    const handleGetUserTypingEvent = useCallback(() => setIsTyping(true), [])

    const { socket } = useSocket({
        url: 'http://localhost:7777',
        fromUser: signedInUserId,
        participants,
        onReadMessage: handleGetReadMessageEvent,
        onReceiveMessage: handleGetReceiveMessageEvent,
        onSaveMessage: handleGetSaveMessageEvent,
        onUserTyping: handleGetUserTypingEvent,
    })
    const { data: chatMessages, isLoading } = useGetChatMessagesQuery(participants)
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

                        socket.emit(EVENTS.READ_MESSAGE, {
                            messageId,
                            readBy: { user: signedInUserId, readAt: new Date() },
                            participants,
                        })

                        observer.unobserve(messageEL)
                    }
                })
            },
            {
                threshold: 1.0,
            }
        )
        unreadMessages.forEach((msg) => observer.observe(msg))
    }, [chatMessages, socket, signedInUserId, participants])

    useEffect(() => {
        if (isTyping) {
            setTimeout(() => {
                setIsTyping(false)
            }, [1000])
        }
    }, [isTyping])

    const handleEmitTypingEvent = () => {
        socket.emit(EVENTS.USER_TYPING, {
            fromUser: signedInUserId,
            participants,
        })
    }

    const debouncedTyping = useDebounce({ callback: handleEmitTypingEvent, delay: 200 })

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
                        chatMessages?.map(({ _id, fromUser, message, readBy, receivedAt, sentAt }, index) => (
                            <ChatMessage
                                fromUser={fromUser}
                                key={sentAt}
                                message={message}
                                messageId={_id}
                                participants={participants}
                                partnerUserName={partnerUserName}
                                partnerUserPhotoUrl={partnerUserPhotoUrl}
                                prevMessageSenderId={index > 0 ? chatMessages[index - 1]?.fromUser : null}
                                readBy={readBy}
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
                    onSubmit={handleEmitSendMessageEvent}
                    submitBtnProps={{ label: <SendIcon size={15} /> }}
                />
            </div>
        </div>
    )
}

export default Chat
