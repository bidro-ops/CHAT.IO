import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore"
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users, CircleUserRound } from "lucide-react";
function SideBar() {
    const {getRooms, rooms, selectedRoom, setSelectedRoom, isRoomsLoading} = useChatStore();

    const onlineUsers = [];
    
    useEffect(() =>{
        getRooms()
    }, [getRooms]);

    if(isRoomsLoading) return <SidebarSkeleton />
    
    return (
  <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
    <div className="border-b border-base-300 w-full p-5">
      <div className="flex items-center gap-2">
        <Users className="size-6" />
        <span className="font-medium hidden lg:block">Contacts</span>
      </div>
      
      <div className="mt-3 hidden lg:flex items-center gap-2">
        <label className="cursor-pointer flex items-center gap-2">

        </label>
        

      </div>
    </div>

               <div className="overflow-y-auto w-full py-3">
        {rooms.map((room) => (
          
          <button
            key={room._id}
            
            onClick={() => setSelectedRoom(room)}
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-300 transition-colors
              ${selectedRoom?._id === room._id ? "bg-base-300 ring-1 ring-base-300" : ""}
            `}
          >

            
            <div className="size-10 rounded-full relative">
              <CircleUserRound size={40}  /> 
            </div>
            
            
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{room.name}</div>
                 <div className="text-sm text-zinc-400">{room.members.length} members</div>
            </div>
          </button>
        ))}


      </div>

  </aside>
);
}

export default SideBar