import { Router } from "express";
import {
  getItems,
  getItem,
  postItem,
  putItem,
  deleteItem,
} from "../controllers/items.controllers.js";
import { authenticateToken } from "../utils/auth.js"; // ✅ Agrega esto

const router = Router();

router.get("/items/", authenticateToken, getItems);
router.get("/items/:id", authenticateToken, getItem);
router.post("/items/", authenticateToken, postItem);
router.put("/items/:id", authenticateToken, putItem);
router.delete("/items/:id", authenticateToken, deleteItem);

export default router;
