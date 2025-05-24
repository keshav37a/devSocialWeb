import { useState } from 'react'

import { Form } from '@CoreUI/Form'
import { FORM_FIELD_TYPES } from '@CoreUI/Form/constants'
import { ChevronDownIcon, CrossIcon, SendIcon } from 'icons'

export const Chat = ({ fullName, onCloseChat }) => {
    const [isChatOpen, setIsChatOpen] = useState(true)
    const handleToggleChat = () => setIsChatOpen((prev) => !prev)
    const handleCloseChat = () => onCloseChat?.()

    return (
        <div className="fixed right-0 bottom-0 z-500 min-h-10 w-80 cursor-pointer rounded-t-lg bg-base-300 p-2">
            <div
                className="chat-title mx-1.5 flex items-center border-b-1 border-gray-300 pt-1 pb-2"
                onClick={handleToggleChat}
            >
                <p className="grow-1">{fullName}</p>
                <ChevronDownIcon
                    className={`ml-2 transition-transform duration-200 ${isChatOpen ? 'rotate-180' : ''}`}
                    size={20}
                />
                <CrossIcon className={`ml-2`} onClick={handleCloseChat} size={15} />
            </div>
            <div
                className={`chat-messages-wrapper m-1.5 flex flex-col transition-all duration-300 ease-in-out ${isChatOpen ? 'visible h-100' : 'h-0 translate-y-5'}`}
            >
                <div className="grow-1">
                    <p>Here lie the messages</p>
                </div>
                <Form
                    className="flex"
                    fields={[
                        {
                            className: 'w-full mr-1',
                            id: 'message',
                            name: 'message',
                            noError: true,
                            placeholder: 'Enter your message',
                            required: true,
                            type: FORM_FIELD_TYPES.TEXT,
                        },
                    ]}
                    submitBtnProps={{ label: <SendIcon size={15} /> }}
                />
            </div>
        </div>
    )
}
