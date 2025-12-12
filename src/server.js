import express from "express";
import { connectMongo } from "./db/mongo.js";
import { orgRoutes } from "./routes/org.routes.js";
import { authRoutes } from "./routes/auth.routes.js";
import { env } from "./config/env.js";
import { HttpError } from "./utils/errors.js";

async function bootstrap() {
  const { master } = await connectMongo();
  const app = express();

  app.use(express.json());

  app.use("/org", orgRoutes(master));
  app.use("/admin", authRoutes(master));

  app.use((err, req, res, next) => {
    if (err instanceof HttpError) {
      return res.status(err.status).json({ message: err.message });
    }
    const status = err.status || 500;
    res.status(status).json({ message: err.message || "Internal error" });
  });

  app.listen(env.port, () => {
    console.log(`Server running on port ${env.port}`);
  });
}

bootstrap().catch((e) => {
  console.error(e);
  process.exit(1);
});

