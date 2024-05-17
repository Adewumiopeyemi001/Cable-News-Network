import express from "express";
import {
  createNews,
  deleteNews,
  getNews,
  getAllNews,
  newsPicture,
  newsVideo,
  updateNews,
  searchNewsByTitle,
} from "../Controller/news.controller.js";
import { auth } from "../middleware/auth.js";
import upload from "../Public/Images/multer.js";

const router = express.Router();

router.post("/create", auth, createNews);
router.put("/addpictonews/:id", auth, upload.single("picture"), newsPicture);
router.put("/addvidtonews/:id", auth, upload.single("video"), newsVideo);
router.put("/updatenews/:id", auth, updateNews);
router.delete("/deletenews/:id", auth, deleteNews);
router.get("/getnews/:id", auth, getNews);
router.get("/getallnews", auth, getAllNews);
router.get("/search", auth, searchNewsByTitle);


export default router;

