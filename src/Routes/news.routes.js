import express from "express";
import {
  createNews,
  deleteNews,
  getNews,
  getAllNews,
  newsPicture,
  newsVideo,
  updateNews,
} from "../Controller/news.controller.js";
import { auth } from "../middleware/auth.js";
import upload from "../Public/Images/multer.js";

const router = express.Router();

router.post("/create", auth, createNews);
router.put("/uploadpic/:id", auth, upload.single("picture"), newsPicture);
router.put("/uploadvideo/:id", auth, upload.single("video"), newsVideo);
router.post("/update/:id", auth, updateNews);
router.delete("/delete/:id", auth, deleteNews);
router.get("/getnews/:id", auth, getNews);
router.get("/getallnews", auth, getAllNews);


export default router;

