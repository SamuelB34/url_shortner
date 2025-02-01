import express from "express";
import UrlController from "../controllers/url/url.controller";

const router = express.Router()

router.get("/:id", UrlController.getUrl)
router.post("/", UrlController.create)

export default router