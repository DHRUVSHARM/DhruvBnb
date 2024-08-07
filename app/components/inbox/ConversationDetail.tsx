'use client';
import CustomButton from "../forms/CustomButton";

import { ConversationType, UserType } from "@/app/inbox/page";
import { tr } from "date-fns/locale";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useEffect } from "react";
import { useState, useRef } from "react";
import { MessageType } from "@/app/inbox/[id]/page";


interface ConversationDetailProps {
    userId: string,
    token: string,
    conversation: ConversationType,
    messages: MessageType[]
}

const ConversationDetail: React.FC<ConversationDetailProps> = ({
    userId,
    token,
    conversation,
    messages
}) => {

    const messagesDiv = useRef<HTMLDivElement | null>(null);
    const [newMessage, setNewMessage] = useState('')

    const myUser = conversation.users?.find((user) => user.id == userId)
    const otherUser = conversation.users?.find((user) => user.id != userId)

    const [realTimeMessages, setRealTimeMessages] = useState<MessageType[]>([])

    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
        `ws://127.0.0.1:9000/ws/${conversation.id}/?token=${token}`, {
        share: false,
        shouldReconnect: () => true
    }
    )

    useEffect(() => {
        console.log("connection state changed : ", readyState)
        console.log("users on this page : my user : ", myUser, "other user : ", otherUser)

    }, [readyState])

    useEffect(() => {

        if (lastJsonMessage && typeof lastJsonMessage === 'object' && 'name' in lastJsonMessage && 'body' in lastJsonMessage) {
            // ensuring that the message received is not empty
            const message: MessageType = {
                id: '',
                name: lastJsonMessage.name as string,
                body: lastJsonMessage.body as string,
                sent_to: otherUser as UserType,
                created_by: myUser as UserType,
                conversationId: conversation.id
            }

            setRealTimeMessages((realTimeMessages) => [...realTimeMessages, message])
        }

        scrollToBottom()
    }, [lastJsonMessage])

    const sendMessage = async () => {

        console.log("we are sending the message ... ")

        sendJsonMessage({
            event: 'chat_message',
            data: {
                body: newMessage,
                // it is possible in our app for now that the user has no name , login primary is email
                name: myUser?.name,
                sent_to_id: otherUser?.id,
                conversation_id: conversation.id
            }
        })

        setNewMessage('');

        setTimeout(() => {
            scrollToBottom()
        }, 50);
    }

    const scrollToBottom = () => {
        if (messagesDiv.current) {
            console.log("here : ", messagesDiv.current.scrollHeight)
            messagesDiv.current.scrollTop = messagesDiv.current.scrollHeight;
        }
    }

    return (
        <>

            <div
                ref={messagesDiv}
                className="h-[1000px] overflow-auto flex flex-col space-y-4"
            >


                {
                    /* we will loop over the db returned messages to show the older messages in the convo ... */
                    messages.map((message, index) => {
                        return (
                            <div
                                key={index}
                                className={`w-[80%] py-4 px-6 rounded-xl ${message.created_by.name === myUser?.name ? 'ml-[20%] bg-blue-200' : 'bg-gray-200'}`}
                            >
                                <p className="font-bold text-gray-500">{message.created_by.name ? message.created_by.name : 'You'}</p>
                                <p>{message.body}</p>

                            </div>
                        )

                    })

                }


                {
                    /* messages shown in realtime , ... */
                    realTimeMessages.map((message, index) => {
                        return (
                            <div
                                key={index}
                                className={`w-[80%] py-4 px-6 rounded-xl ${message.created_by.name === myUser?.name ? 'ml-[20%] bg-blue-200' : 'bg-gray-200'}`}
                            >
                                <p className="font-bold text-gray-500">{message.created_by.name ? message.created_by.name : 'You'}</p>
                                <p>{message.body}</p>

                            </div>
                        )

                    })
                }

            </div>


            <div className="mt-4 py-4 px-6 flex border border-gray-300 space-x-4 rounded-xl">
                <input
                    type="text"
                    placeholder="Type your message ..."
                    className="w-full p-2 bg-gray-200 rounded-xl"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                >
                </input>

                <CustomButton
                    label='Send'
                    onClick={sendMessage}
                    className="w-[100px]"
                ></CustomButton>
            </div>

        </>
    );
};

export default ConversationDetail;