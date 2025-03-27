import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {envoimessage, getMessage, getRooms} from "../controllers/message.controller.js";
import { createRoom } from "../controllers/room.controller.js";
import { joinroom } from "../controllers/room.controller.js";
const router = express.Router();    


router.get("/rooms", protectRoute, getRooms);
router.get("/room/:roomId", protectRoute, getMessage);
router.post("/room/send/:id", protectRoute, envoimessage);
router.post("/join", protectRoute, joinroom);
router.post("/rooms", protectRoute, createRoom);
export default router;