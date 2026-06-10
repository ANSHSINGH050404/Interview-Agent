import type { Request, Response } from "express";
import type { ApiResponse } from "../types";

export function notFound(_req: Request, res: Response<ApiResponse>): void {
  res.status(404).json({
    success: false,
    error: "Resource not found",
  });
}
