import { Database } from "@db/sqlite"

export const db = new Database(new URL("./data.db", import.meta.url))
