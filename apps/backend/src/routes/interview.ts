import { Router } from "express";
import healthRouter from "./health";
import { preInterview } from "../controllers/interview";

const router = Router();

router.use("/pre-interview", preInterview);

export default router;
