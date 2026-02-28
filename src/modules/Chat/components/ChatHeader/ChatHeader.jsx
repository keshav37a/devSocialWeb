import { ChevronDownIcon, CrossIcon } from 'icons'

export const ChatHeader = ({
    isChatOpen,
    onToggleChat: handleToggleChat,
    onCloseChat: handleCloseChat,
    partnerUserName,
    partnerUserPhotoUrl,
}) => {
    return (
        <div
            className="chat-title mx-1.5 flex items-center border-b-1 border-gray-300 pt-1 pb-2"
            onClick={handleToggleChat}
        >
            <div className="chat-header-container flex w-full items-center">
                <div className="avatar chat-image my-auto mr-2">
                    <div className="w-10 rounded-full">
                        <img alt="user-dp" src={partnerUserPhotoUrl} />
                    </div>
                </div>
                <p className="grow-1 px-1">{partnerUserName}</p>
            </div>

            <ChevronDownIcon
                className={`ml-2 transition-transform duration-200 ${isChatOpen ? 'rotate-180' : ''}`}
                size={28}
            />
            <CrossIcon className={`ml-2`} onClick={handleCloseChat} size={20} />
        </div>
    )
}

export default ChatHeader
