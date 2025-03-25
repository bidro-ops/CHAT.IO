import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {envoimessage, getMessage, affichageutilisateurs} from "../controllers/message.controller.js";
const router = express.Router();    


router.get("/users", protectRoute, affichageutilisateurs);
router.get("/:id", protectRoute, getMessage);
router.post("/send/:id", protectRoute, envoimessage);
export default router;