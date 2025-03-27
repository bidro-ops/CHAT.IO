import { useChatStore } from "../store/useChatStore";
import { useRef, useEffect } from "react";
import  ChatHeader  from "./ChatHeader";
import  MessageInput  from "./MessageInput"; 
import { useAuthStore } from "../store/useAuthStore";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { formatMessageTime } from "../lib/utils";
import { CircleUserRound } from "lucide-react";

const ChatContainer = () => {

    const {messages, getMessages, isMessagesLoading, selectedRoom, subscribeToMessages, unsubscribeFromMessages} = useChatStore();
    
    const { authUser } = useAuthStore();
    const messageEndRef = useRef(null);
    



    useEffect(() => {
       if (!selectedRoom){ 
        return;
      }
      getMessages(selectedRoom._id);  
      subscribeToMessages();     
    

    return () => unsubscribeFromMessages();  
  }, [selectedRoom, getMessages, subscribeToMessages, unsubscribeFromMessages]);



    useEffect(() => {
        if (messageEndRef.current && messages) {
        messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);


    if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        {messages.map((message) => {
  const isCurrentUser = message.senderId === authUser._id;
  
  return (
    <div 
      key={message._id}
      className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}
      ref={messageEndRef}
    >
      {!isCurrentUser && (
        <div className="mr-3 flex-shrink-0">
            <CircleUserRound />
        </div>
      )}
      
      <div className={`max-w-[70%] ${isCurrentUser ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'} rounded-2xl px-4 py-2 shadow-sm`}>
        <div className="flex items-center mb-1">
          <span className="text-xs font-medium">
            {isCurrentUser ? 'You' : message.senderId}
          </span>
          <span className="mx-2 text-xs opacity-60">•</span>
          <time className="text-xs opacity-60">
            {formatMessageTime(message.createdAt)}
          </time>
        </div>
        
        <div className="space-y-2">          
          {message.text && (
            <p className={`text-sm ${isCurrentUser ? 'text-white' : 'text-gray-800'}`}>
              {message.text}
            </p>
          )}
        </div>
      </div>
      
      {isCurrentUser && (
        <div className="ml-3 flex-shrink-0">
            <CircleUserRound />
        </div>
      )}
    </div>
  );
})}
        <MessageInput />
    </div>
  )
};

export default ChatContainer;