import type { Request, Response } from "express";
import type { ApiResponse } from "../types";

interface HealthData {
  status: string;
  uptime: number;
  timestamp: string;
}

export function getHealth(_req: Request, res: Response<ApiResponse<HealthData>>): void {
  res.json({
    success: true,
    data: {
      status: "ok",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    },
  });
}
