import express from "express";
import cors from "cors";
import router from "./routes";
import Interviewrouter from "./routes/interview";

import { errorHandler } from "./middleware/errorHandler";
import { notFound } from "./middleware/notFound";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);
app.use("/api/v1", Interviewrouter);

app.use(notFound);
app.use(errorHandler);

export default app;
``