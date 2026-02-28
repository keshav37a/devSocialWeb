import { useMemo } from 'react'

import { DoubleTickIcon, SingleTickIcon } from 'icons'

import { getTimeFromDateInHHMM } from 'src/utils'

export const ChatMessage = ({
    fromUser,
    message,
    messageId,
    signedInUserPhotoUrl,
    participants,
    partnerUserName,
    partnerUserPhotoUrl,
    prevMessageSenderId,
    readBy,
    receivedAt,
    sentAt,
    signedInUserName,
    signedInUserId,
}) => {
    const isMessageFromSignedInUser = fromUser === signedInUserId
    const photoUrl = isMessageFromSignedInUser ? signedInUserPhotoUrl : partnerUserPhotoUrl
    const userName = isMessageFromSignedInUser ? signedInUserName : partnerUserName
    const isPrevMessageFromCurrentSender = prevMessageSenderId === fromUser
    const { formattedTime: messageTime } = getTimeFromDateInHHMM(isMessageFromSignedInUser ? sentAt : receivedAt)

    const participantsOtherThanSignedInUser = useMemo(
        () => participants.filter((userId) => userId !== signedInUserId).sort(),
        [participants, signedInUserId]
    )
    const participantsReadMessage = useMemo(() => readBy?.map(({ user }) => user).sort(), [readBy])
    const isRead = participantsReadMessage
        ? participantsOtherThanSignedInUser.every((userId, index) => userId === participantsReadMessage[index])
        : false

    const renderIcon = () => (isRead ? <DoubleTickIcon stroke="#EBF9FF" /> : <SingleTickIcon stroke="#EBF9FF" />)

    return (
        <div className={`chat-message-container mb-4`}>
            <div className={`flex items-center ${isMessageFromSignedInUser ? 'flex-row-reverse' : 'flex-row'}`}>
                <div
                    className={`avatar chat-image my-auto ${isMessageFromSignedInUser ? 'ml-2' : 'mr-2'} ${isPrevMessageFromCurrentSender ? 'invisible' : ''}`}
                >
                    <div className="w-10 rounded-full">
                        <img alt="sender-display-pic" src={photoUrl} />
                    </div>
                </div>
                <div className="user-info">
                    <div
                        className={`chat-sender mb-1 text-[0.75rem] ${isPrevMessageFromCurrentSender ? 'hidden' : ''}`}
                    >
                        {userName}
                    </div>
                    <div className="chat-bubble-container rounded-xl bg-[#5664e7] px-2 pt-2">
                        <p
                            className={`chat-message-content ${isRead || isMessageFromSignedInUser ? '' : 'unread'}`}
                            data-message-from-signed-in-user={isMessageFromSignedInUser}
                            data-message-id={messageId}
                        >
                            {message}
                        </p>
                        <div className="chat-message-status-container flex-end mt-0.5 flex w-full">
                            <div className="mr-2 mb-1 ml-auto text-xs opacity-50">{messageTime}</div>
                            {isMessageFromSignedInUser ? renderIcon() : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatMessage
