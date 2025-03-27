import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";
import { io } from "socket.io-client";

export const useChatStore = create((set, get) => ({
  messages: [],
  rooms:[],
  users: [],
  selectedRoom: null,
  isRoomsLoading: false,
  isMessagesLoading: false,

  getRooms: async () => {
    set({ isRoomsLoading: true });
    try {
      const res = await axiosInstance.get("/messages/rooms");
      set({ rooms: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isRoomsLoading: false });
    }
  },

  getMessages: async (roomId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/room/${roomId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },


  sendMessage: async (messageData) => {
    const { selectedRoom, messages } = get();
    try {
      const res = await axiosInstance.post(`/messages/room/send/${selectedRoom._id}`, messageData);
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

     subscribeToMessages: () => {
    const { selectedRoom } = get();
    if (!selectedRoom) return;

    const socket = useAuthStore.getState().socket;
    socket.emit("joinRoom", { roomId: selectedRoom._id });

    //const currentUserId = useAuthStore.getState().authUser._id;

    socket.on("newMessage", (newMessage) => {


    if (newMessage.roomId !== selectedRoom._id) return;
      
      set({
        messages: [...get().messages, newMessage],
      });
      
    });
  },


    unsubscribeFromMessages: () => {
    const { selectedRoom } = get();
    const socket = useAuthStore.getState().socket;

    if (selectedRoom) {
      socket.emit("leaveRoom", { roomId: selectedRoom._id });
    }

    socket.off("newMessage");
  },

  setSelectedRoom:(selectedRoom) => {set({ selectedRoom })
  console.log(selectedRoom)},
  



}));