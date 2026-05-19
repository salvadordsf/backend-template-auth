import express from "express";
import cors from "cors";
import helmet from "helmet";
import { prismaErrorHandler } from "./middlewares/prisma-error.middleware";
import { serverErrorHandler } from "./middlewares/server-error.middleware";

const app = express();
const PORT = process.env.PORT ?? 3000;

//Config
//CORS
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3001",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  }),
);
//HELMET
app.use(helmet());
//JSON
app.use(express.json());

//Routers
//SERVER HEALTH
app.get("/health", async (_req, res, _next) => {res.json({ status: "ok" })});
//EXAMPLE ROUTE
// app.use("/examples", exampleRouter);

//Errors
//PRISMA ERRORS
app.use(prismaErrorHandler);
//SERVER ERRORS
app.use(serverErrorHandler);

//Start server
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
