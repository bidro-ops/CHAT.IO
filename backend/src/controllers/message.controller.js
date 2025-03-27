import Message from "../models/chat.model.js";
import User from "../models/user.model.js";
import { getRoomMembers , io } from "../lib/socket.js";
import Room from "../models/room.model.js";



export const getRooms = async (req, res) => {
    try {
        const userId = req.user.id;
        const rooms = await Room.find({ members: userId });
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};



export const getMessage = async(req, res) => {
    try {
        const { id: roomId } =  req.params
        const myid = req.user._id;
        console.log(myid);
        const message = await Message.find({
            roomId            
        }).populate("roomId", "username");

        res.status(200).json(message);
    } catch (error) {
        res.status(500).json({error:"internal server error2"});
    }

};

export const envoimessage = async(req,res) => {
    try{
    const{text, image} = req.body;
    const{id:roomId} = req.params;
    const senderId = req.user._id;



    const newMessage = new Message({
        senderId,
        roomId,
        text,
    });


    await newMessage.save();

    //socket.io
    
    
        io.to(roomId).emit("newMessage", newMessage);
    

    res.status(200).json(newMessage);
    }catch(error){
        res.status(500).json({error:"internal server error1"});
    }
};

