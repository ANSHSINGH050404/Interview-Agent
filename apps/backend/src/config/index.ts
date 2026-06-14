import "dotenv/config";

export const config = {
  port: parseInt(process.env["PORT"] ?? "3001", 10),
  nodeEnv: process.env["NODE_ENV"] ?? "development",
  githubToken: process.env["GITHUB_TOKEN"] ?? "",
};
