import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import { env } from "./src/common/config/env";
import { errorMiddleware } from "./src/common/middleware/error.middleware";
import { registerRoutes } from "./src/routes";

export function createApp() {
    const app = express();

    app.use(helmet());
    app.use(
        cors({
            origin: env.CORS_ORIGIN,
            credentials: true,
        }),
    );
    app.use(express.json({ limit: "1mb" }));
    app.use(cookieParser());

    registerRoutes(app);

    app.use(errorMiddleware);

    return app;
}