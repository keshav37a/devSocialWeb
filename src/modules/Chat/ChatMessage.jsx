import { getTimeFromDateInHHMM } from 'src/utils'

export const ChatMessage = ({
    fromUser,
    message,
    signedInUserPhotoUrl,
    partnerUserName,
    partnerUserPhotoUrl,
    prevMessageSenderId,
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

    console.log('sentAt: ', sentAt)
    console.log('receivedAt: ', receivedAt)

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
                        <p>{message}</p>
                        <div className="chat-message-status-container flex-end mt-0.5 flex w-full">
                            <div className="mr-2 mb-1 ml-auto text-xs opacity-50">{messageTime}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
