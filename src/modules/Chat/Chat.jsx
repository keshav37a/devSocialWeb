import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { useDispatch } from 'react-redux'

import { ChatHeader } from './ChatHeader'

import { ChatMessage } from '@Chat'
import { Loading } from '@CoreUI'
import { Form } from '@CoreUI/Form'
import { FORM_FIELD_TYPES } from '@CoreUI/Form/constants'
import { useSocket } from 'hooks/useSocket'
import { SendIcon } from 'icons'

import { chatMessagesApi, GET_CHAT_MESSAGES_ENDPOINT, useGetChatMessagesQuery } from '@Chat/chatApi'

import { scrollToBottom } from 'src/utils'

const getRoomId = ({ signedInUserId, partnerUserId }) => `${signedInUserId}${partnerUserId}`.split('').sort().join('')

export const Chat = ({ partnerUser, signedInUser, onCloseChat }) => {
    console.log('partnerUser: ', partnerUser)
    const { _id: signedInUserId, photoUrl: signedInUserPhotoUrl, fullName: signedInUserName } = signedInUser
    const { _id: partnerUserId, fullName: partnerUserName, photoUrl: partnerUserPhotoUrl } = partnerUser
    const dispatch = useDispatch()
    const [isChatOpen, setIsChatOpen] = useState(true)

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

    const handleSendMessage = ({ message }) => {
        socket.emit('SEND_MESSAGE', {
            fromUser: signedInUserId,
            message,
            toUser: partnerUserId,
            sentAt: new Date(),
        })
        dispatch(
            chatMessagesApi.util.updateQueryData(GET_CHAT_MESSAGES_ENDPOINT, roomId, (draft) => {
                draft.push({ fromUser: signedInUserId, message, roomId, toUser: partnerUserId })
            })
        )
    }

    const { socket } = useSocket({
        url: 'http://localhost:7777',
        fromUser: signedInUserId,
        toUser: partnerUserId,
        onReceiveMessage: handleReceiveMessage,
    })
    const { data: chatMessages, isLoading } = useGetChatMessagesQuery(roomId)
    const handleToggleChat = () => setIsChatOpen((prev) => !prev)
    const handleCloseChat = () => onCloseChat?.()

    useEffect(() => {
        scrollToBottom(messagesWrapperRef)
    }, [chatMessages])

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
                        chatMessages?.map(({ message, fromUser, _id }, index) => (
                            <ChatMessage
                                fromUser={fromUser}
                                key={_id || index}
                                message={message}
                                partnerUserName={partnerUserName}
                                partnerUserPhotoUrl={partnerUserPhotoUrl}
                                prevMessageSenderId={index > 0 ? chatMessages[index - 1]?.fromUser : null}
                                signedInUserId={signedInUserId}
                                signedInUserName={signedInUserName}
                                signedInUserPhotoUrl={signedInUserPhotoUrl}
                            />
                        ))
                    )}
                </div>
                <Form
                    className="chat-sumbmit-form flex pt-0.5"
                    fields={[
                        {
                            className: 'w-full mr-1',
                            id: 'message',
                            name: 'message',
                            noError: true,
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
