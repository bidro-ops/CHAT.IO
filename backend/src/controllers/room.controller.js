import express from "express";
import Room from "../models/room.model.js";
import User from "../models/user.model.js";

const router = express.Router();

export const joinroom = async (req, res) => {
    try {
        const { userId, roomName } = req.body;

        let room = await Room.findOne({ name: roomName });

        if (!room) {
            room = new Room({ name: roomName, members: [userId] });
        } else {
            if (!room.members.includes(userId)) {
                room.members.push(userId);
            }
        }

        await room.save();
        res.status(200).json(room);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

export const createRoom = async (req, res) => {
  try {
    const { roomName, members } = req.body;  
    if (!roomName || members.length === 0) {
      return res.status(400).json({ error: "Room name and members are required" });
    }

    
    const room = new Room({
      name: roomName,
      members: [...members, req.user._id], 
    });

    await room.save();
    res.status(201).json(room); 
  } catch (error) {
    res.status(500).json({ message: "Error creating room", error: error.message });
  }
};
