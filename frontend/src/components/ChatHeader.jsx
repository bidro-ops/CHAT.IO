import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { CircleUserRound } from "lucide-react";

const ChatHeader = () => {
  const { selectedRoom, setSelectedRoom } = useChatStore();
    
  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
         
          <div className="avatar">
            <div className="size-10 rounded-full relative">
                <CircleUserRound size={40}  /> alt={selectedRoom.name} 
            </div>
          </div>

        
          <div>
            <h3 className="font-medium">{selectedRoom.name}</h3>
          </div>
        </div>

        <button onClick={() => setSelectedRoom(null)}>
          <X />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;