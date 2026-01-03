import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema";

// let client: ReturnType<typeof createClient>;

// if (process.env.NODE_ENV === "production") {
//   console.log("Production environment detected. Using remote database.");
//   client = createClient({
//     url: process.env.TURSO_DATABASE_URL!,
//     authToken: process.env.TURSO_AUTH_TOKEN,
//   });
// } else {
//   client = createClient({ url: COAL_DB_URL });
//   console.log("Development environment detected. Using local database.");
// }

// export const db = drizzle(client, { schema });

const client = createClient({ url: "file:./db.sqlite" });
console.log("Development environment detected. Using local database.");

export const db = drizzle(client, { schema });