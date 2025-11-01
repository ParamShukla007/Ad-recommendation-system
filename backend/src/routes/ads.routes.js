import { uploadAd } from "../controllers/ads/createAd.js";
import { Router } from "express";

const router = Router();

router.route("/uploadAd").post(uploadAd);

export default router;