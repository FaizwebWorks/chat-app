import { useChatStore } from '../store/useChatStore'
import { useEffect } from 'react'
import MessageInput from './MessageInput'
import ChatHeader from './ChatHeader'
import MessageSkeleton from './skeletons/MessageSkeleton'

const ChatContainer = () => {
    const { messages, getMessages, isMessagesLoading, selectedUser } = useChatStore()

    useEffect(() => {
        getMessages(selectedUser._id)
    }, [selectedUser._id, getMessages])

    if (isMessagesLoading) {
        return (
            <div className='flex-1 flex flex-col overflow-auto'>
                <ChatHeader />
                <MessageSkeleton />
                <MessageInput />
            </div>
        )
    }

    return (
        <div className='flex-1 flex flex-col overflow-auto'>
            <ChatHeader />
            <p>messages...</p>
            <MessageInput />

        </div>
    )
}

export default ChatContainer