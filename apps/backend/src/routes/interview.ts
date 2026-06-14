import { Router } from "express";
import { preInterview } from "../controllers/interview";

const router = Router();

router.post("/pre-interview", preInterview);

export default router;
