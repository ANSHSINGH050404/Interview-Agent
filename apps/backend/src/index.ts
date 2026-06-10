import app from "./app";
import { config } from "./config";

const server = app.listen(config.port, () => {
  console.log(`Server running on http://localhost:${config.port}`);
});

process.on("SIGTERM", () => {
  console.log("SIGTERM received – shutting down");
  server.close(() => process.exit(0));
});
