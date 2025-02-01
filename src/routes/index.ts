import express from "express"
import UrlRoutes from "./url.routes";

const router = express.Router()

router.use("/", UrlRoutes)

export default router
