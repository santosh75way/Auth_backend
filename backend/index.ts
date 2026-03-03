import "dotenv/config";
import { createApp } from "./app";
import { env } from "./src/common/config/env";

const app = createApp();

app.listen(env.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running on http://localhost:${env.PORT}`);
});