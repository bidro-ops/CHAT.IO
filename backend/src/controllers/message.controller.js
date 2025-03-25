import Message from "../models/chat.model.js";
import User from "../models/user.model.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const affichageutilisateurs = async(req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id : {$ne: loggedInUserId}}).select("-password");
        res.status(200).json(filteredUsers);
    } catch (error) {
        res.status(500).json({error: "internal server error3"}); 
    }
};

export const getMessage = async(req, res) => {
    try {
        const {id:usertochatid} =  req.params
        const myid = req.user._id;
        console.log(myid);
        const message = await Message.find({
            $or:[
                {senderId:myid, receiverId:usertochatid},
                {senderId:usertochatid, receiverId:myid} 
            ]
        });

        res.status(200).json(message);
    } catch (error) {
        res.status(500).json({error:"internal server error2"});
    }

};

export const envoimessage = async(req,res) => {
    try{
    const{text, image} = req.body;
    const{id:receiverId} = req.params;
    const senderId = req.user._id;



    const newMessage = new Message({
        senderId,
        receiverId,
        text,
        image,
    });


    await newMessage.save();

    //socket.io
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(200).json(newMessage);
    }catch(error){
        res.status(500).json({error:"internal server error1"});
    }
};

